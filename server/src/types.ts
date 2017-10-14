import * as express from 'express';
import { SendStatusJsonFunction } from 'send-status-json';

export interface Request extends express.Request {

}

export interface Response extends express.Response {
    sendStatusJson: SendStatusJsonFunction;
}

export interface IRegistry<T> {
    add(action: T): void;
    get(name: string): T;
    getAll(): T[];
}