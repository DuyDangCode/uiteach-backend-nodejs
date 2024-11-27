import { format, createLogger, transports } from 'winston'
import 'winston-daily-rotate-file'
class Logger {
  constructor() {
    const customFormat = format.printf(
      ({ level, message, context, requestId, timestamp, data }) =>
        `${level}::${message}::${requestId}::${timestamp}::${context}::${JSON.stringify(data)}`,
    )

    this.winstonLogger = createLogger({
      level: process.env.LEVEL_LOGGER || 'info',
      format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD hh:mm:ss' }),
        customFormat,
      ),
      transports: [
        new transports.Console({
          level: 'info',
        }),
        // new transports.DailyRotateFile({
        //   dirname: 'src/logs/info',
        //   filename: 'logs/info-%DATE%.log',
        //   level: 'info',
        //   datePattern: 'YYYY-MM-DD-hh',
        //   maxSize: '2m',
        //   maxFiles: '15d',
        //   zippedArchive: true,
        // }),
        // new transports.DailyRotateFile({
        //   dirname: 'src/logs/error',
        //   filename: 'logs/error-%DATE%.log',
        //   level: 'error',
        //   datePattern: 'YYYY-MM-DD-hh',
        //   maxSize: '2m',
        //   maxFiles: '15d',
        //   zippedArchive: true,
        // }),
      ],
    })
  }
  static getInstance() {
    if (!this.instance) this.instance = new Logger()
    return this.instance
  }
  logInfo(message, params) {
    const paramsCobine = { message, ...params }
    this.winstonLogger.info(paramsCobine)
  }
  logErr(message, params) {
    const paramsCombine = { message, ...params }
    this.winstonLogger.error(paramsCombine)
  }
}

export default Logger.getInstance()
