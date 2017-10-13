import * as express from 'express';
import { SendStatusJsonFunction } from 'send-status-json';

export interface Request extends express.Request {

}

export interface Response extends express.Response {
    sendStatusJson: SendStatusJsonFunction;
}