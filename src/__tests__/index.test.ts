import { expect } from "chai";
import { spy } from "sinon";
import { Logger } from "../index.js";
import { LoggerLevel } from "../levels.js";
import { LoggerTransport } from "../transports.js";

describe("Logger", () => {
  const fatal = spy();
  const error = spy();
  const warn = spy();
  const info = spy();
  const debug = spy();
  const trace = spy();
  const logger = new Logger({
    maxLevel: LoggerLevel.INFO,
    transports: [new LoggerTransport({
      [LoggerLevel.FATAL]: fatal,
      [LoggerLevel.ERROR]: error,
      [LoggerLevel.WARN]: warn,
      [LoggerLevel.INFO]: info,
      [LoggerLevel.DEBUG]: debug,
      [LoggerLevel.TRACE]: trace,
    })],
  });

  afterEach(() => {
    fatal.resetHistory();
    error.resetHistory();
    warn.resetHistory();
    info.resetHistory();
    debug.resetHistory();
    trace.resetHistory();
  });

  describe("Levels", () => {
    it("logs FATAL, as the logger maximum level is INFO", () => {
      logger.fatal("hello");

      expect(fatal.calledOnce).to.be.true;
    });

    it("logs ERROR, as the logger maximum level is INFO", () => {
      logger.error("hello");

      expect(error.calledOnce).to.be.true;
    });

    it("logs WARN, as the logger maximum level is INFO", () => {
      logger.warn("hello");

      expect(warn.calledOnce).to.be.true;
    });

    it("logs INFO, as the logger maximum level is INFO", () => {
      logger.info("hello");

      expect(info.calledOnce).to.be.true;
    });

    it("does not log DEBUG, as the logger maximum level is INFO", () => {
      logger.debug("hello");

      expect(info.called).to.be.false;
      expect(debug.called).to.be.false;
    });

    it("does not log TRACE, as the logger maximum level is INFO", () => {
      logger.trace("hello");

      expect(trace.called).to.be.false;
    });
  });
});
