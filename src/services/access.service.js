import chalk from 'chalk'
import {
  AuthFailError,
  BadRequestError,
  ConfigRequestError,
  ForbiddenError,
  InternalServerError,
} from '../core/error.res.js'
import userModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import KeyService from './key.service.js'
import crypto from 'crypto'
import { createTokenPair, verifyJWT } from '../auth/authUtils.js'
import { ROLES, USER_ROLES } from '../constant/user.constant.js'
import UserService from './user.service.js'

class AccessService {
  static signup = async ({
    username,
    password,
    role,
    email,
    name,
    dateOfBirth,
    phone,
    gender,
  }) => {
    if (!username || !password)
      throw new BadRequestError('Not find username or password')

    //check user exist
    const holderUserWithUsername = await userModel
      .findOne({
        username: {
          $regex: new RegExp(username, 'i'),
        },
      })
      .lean()
    if (holderUserWithUsername) {
      throw new BadRequestError('User already exist')
    }

    // hash password
    const passwordString =
      typeof password === 'string' ? password : password.toString()
    const passwordHash = await bcrypt.hash(passwordString, 5)

    //create new user
    const newUser = await userModel.create({
      username,
      password: passwordHash,
      role,
      email,
      name,
      dateOfBirth,
      phone,
      gender,
    })

    if (!newUser) throw new BadRequestError('Create user fail.')

    //return tokens when create sucessfull
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    })
    if (!privateKey || !publicKey) throw BadRequestError('Create key fail')

    //create access token and refresh token
    const payload = { userId: newUser._id }
    const tokens = createTokenPair(payload, privateKey)
    if (!tokens) throw new BadRequestError('Create tokens fail')

    //save token
    await KeyService.createKeyToken({
      userId: newUser._id,
      publicKey: publicKey,
      refeshToken: tokens.refreshToken,
    })

    delete newUser.password
    return {
      ...newUser,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }

  static signin = async ({ username, password }) => {
    if (!username || !password)
      throw new BadRequestError('Not find username or password')
    const user =
      (await userModel
        .findOne({
          username: {
            $regex: new RegExp(username, 'i'),
          },
        })
        .lean()) ||
      (await userModel
        .findOne({
          email: {
            $regex: new RegExp(username, 'i'),
          },
        })
        .lean())

    //check user exist
    if (!user) throw new BadRequestError('User not found')
    const {
      _id: userId,
      username: savedUsername,
      password: savedPassword,
      roles: roles,
    } = user

    const isCorrectPassword = bcrypt.compareSync(
      password.toString(),
      savedPassword,
    )

    //check password
    if (!isCorrectPassword) throw new BadRequestError('Password was wrong')

    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    })

    const payload = {
      userId: userId,
    }

    const { accessToken, refreshToken } = createTokenPair(payload, privateKey)
    if (!accessToken || !refreshToken)
      throw InternalServerError('Create tokens fail')

    //save tokens
    await KeyService.createKeyToken({
      userId: userId,
      publicKey,
      refeshToken: refreshToken,
    })

    delete user.password
    return {
      ...user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    }
  }

  static signout = async (keys) => {
    const deletedKey = await KeyService.removeById(keys._id)
    return deletedKey
  }

  static handleRefreshToken = async (refreshToken) => {
    //check refreshtoken is refreshtokenUsed
    const foundToken = await KeyService.findByRefreshTokenUsed(refreshToken)

    if (foundToken) {
      const { userId } = verifyJWT(refreshToken, foundKey.publicKey)
      await KeyService.removeById(foundToken._id)
      throw new AuthFailError('Some thing wrong')
    }

    //get tokens in db
    const holderToken = await KeyService.findByRefreshToken(refreshToken)
    if (!holderToken) throw new AuthFailError('Token not exist')

    //verify refresh token
    const verifiedToken = verifyJWT(refreshToken, holderToken.publicKey)

    //compare userId which is verified form refresh token with userId in db

    if (verifiedToken.userId != holderToken.userId)
      throw new AuthFailError('Can verify token')

    //check userId exist in db
    const holderUser = await UserService.findById(verifiedToken.userId)
    if (!holderUser) throw new AuthFailError('Not found user')

    //create tokens
    const payload = { userId: verifiedToken.userId }
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa', {
      modulusLength: 2048,
      publicKeyEncoding: {
        type: 'spki',
        format: 'pem',
      },
      privateKeyEncoding: {
        type: 'pkcs8',
        format: 'pem',
      },
    })
    const tokens = createTokenPair(payload, privateKey)

    //update refreshtokenUsed
    const refreshTokensUsed = structuredClone(holderToken.refreshTokensUsed)
    refreshTokensUsed.push(refreshToken)
    // await KeyService.updatePublickey(holderToken._id, publicKey);
    // await KeyService.updateRefreshTokenUsed(holderToken._id, refreshTokensUsed);
    // await KeyService.updateRefreshToken(holderToken._id, tokens.refreshToken);
    await KeyService.updateTokens(
      holderToken._id,
      holderToken.userId,
      publicKey,
      refreshTokensUsed,
      tokens.refreshToken,
    )

    // await holderToken.updateOne({
    //   $set: {
    //     refreshToken: tokens.refreshToken,
    //   },
    //   $addToSet: {
    //     refreshTokenUsed: refreshToken,
    //   },
    // });

    delete holderUser.password
    return {
      ...holderUser,
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    }
  }
}

export default AccessService
