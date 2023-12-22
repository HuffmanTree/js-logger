import { LoggerLevel } from "./levels.js";
import { ConsoleTransport, LoggerTransport } from "./transports.js";

interface LoggerParams {
  maxLevel: LoggerLevel,
  metadata: Record<string, unknown>,
  includeTimestamp: boolean,
  transports: Array<LoggerTransport>,
}

export class Logger {
  private _maxLevel: LoggerLevel;
  private _metadata: Record<string, unknown>;
  private _includeTimestamp: boolean;
  private _transports: Array<LoggerTransport>;

  constructor(params: Partial<LoggerParams> = {}) {
    this._maxLevel = params.maxLevel ?? LoggerLevel.INFO;
    this._metadata = params.metadata ?? {};
    this._includeTimestamp = params.includeTimestamp ?? true;
    this._transports = params.transports ?? [new ConsoleTransport()];
  }

  private _log(
    message: string,
    variables: Record<string, unknown>,
    level: LoggerLevel,
  ) {
    if (level > this._maxLevel) return;

    const fns = this._transports.map(transport => transport.mapping[level]);

    const payload = {
      level: LoggerLevel[level],
      message,
      variables,
      metadata: this._metadata,
      ...this._includeTimestamp ? { timestamp: (new Date()).toISOString() } : {},
    };

    for (const fn of fns) fn(JSON.stringify(payload));
  }

  fatal(message: string, variables: Record<string, unknown> = {}) {
    this._log(message, variables, LoggerLevel.FATAL);
  }

  error(message: string, variables: Record<string, unknown> = {}) {
    this._log(message, variables, LoggerLevel.ERROR);
  }

  warn(message: string, variables: Record<string, unknown> = {}) {
    this._log(message, variables, LoggerLevel.WARN);
  }

  info(message: string, variables: Record<string, unknown> = {}) {
    this._log(message, variables, LoggerLevel.INFO);
  }

  debug(message: string, variables: Record<string, unknown> = {}) {
    this._log(message, variables, LoggerLevel.DEBUG);
  }

  trace(message: string, variables: Record<string, unknown> = {}) {
    this._log(message, variables, LoggerLevel.TRACE);
  }
}
