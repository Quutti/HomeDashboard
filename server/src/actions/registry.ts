import * as express from "express";

import { Request, Response } from "../types";
import { ILogger } from "../logger";
import * as base from "./base";

export interface IRegistry {
    add(action: base.IRegisterableAction): void;
    get(name: string): base.IRegisterableAction;
}

export class ActionRegistry implements IRegistry {

    private _actions: base.IRegisterableAction[] = [];
    private _logger: ILogger;

    constructor(logger: ILogger) {
        this._logger = logger;
    }

    public add(action: base.IRegisterableAction): void {
        this._actions.push(action);
    }

    public get(name: string): base.IRegisterableAction {
        for (let action of this._actions) {
            if (action.getName() === name) {
                return action;
            }
        }

        return null;
    }

    public register(): express.RequestHandler {

        const respond400 = (res: Response, message: string) => {
            this._logger.log(`400 - ${message}`);
            return res.sendStatusJson(400, { message });
        }

        this._actions.forEach((action) => {
            this._logger.log(`Registering action ${action.getName()}`);
        });

        return (req: Request, res: Response) => {
            const { action, data } = req.body;
            if (!action || !data) {
                return respond400(res, `Message body should contain properties action and data`);
            }

            const actionObj = this.get(action);
            if (!actionObj) {
                return respond400(res, `Invalid action name ${action}`);
            }

            actionObj.processData(data)
                .then(() => {
                    this._logger.log(`200 - Action "${action}" processed`);
                    res.sendStatusJson(200);
                })
                .catch((err) => {
                    this._logger.error(`500 - Action "${action}" failed`);
                    if (err) {
                        this._logger.error(JSON.stringify(err));
                    }
                    res.sendStatusJson(500);
                });
        }
    }
}