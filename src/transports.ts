/* eslint no-console: off */
import { LoggerLevel } from "./levels";

export class LoggerTransport {
  constructor(public mapping: Record<LoggerLevel, (json: string) => void>) {}
}

export class ConsoleTransport extends LoggerTransport {
  constructor() {
    super({
      [LoggerLevel.FATAL]: console.error,
      [LoggerLevel.ERROR]: console.error,
      [LoggerLevel.WARN]: console.warn,
      [LoggerLevel.INFO]: console.info,
      [LoggerLevel.DEBUG]: console.debug,
      [LoggerLevel.TRACE]: console.trace,
    });
  }
}
