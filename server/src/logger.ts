import * as moment from "moment";

export interface ILogger {
    log(message: string): void;
    warn(message: string): void;
    error(message: string): void;
}

let logger: ILogger = null;

export const initLogger = (l: ILogger) => {
    logger = l;
}

export const getLogger = (): ILogger => {
    return logger;
}

export const log = (message: string): void => {
    if (logger) {
        logger.log(formatMessage(message));
    }
}

export const warn = (message: string): void => {
    if (logger) {
        logger.warn(formatMessage(message));
    }
}

export const error = (message: string): void => {
    if (logger) {
        logger.error(formatMessage(message));
    }
}

const formatMessage = (message: string): string => {
    const timestamp = moment().format("YYYY-MM-DD kk:mm:ss.SSS");
    return `[${timestamp}]: ${message}`;
}