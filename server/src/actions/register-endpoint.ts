import { RequestHandler } from "express";

import * as logger from "../logger";
import { IRegisterableAction, ActionError } from "./base";
import { Request, Response, IRegistry } from "../types";

export const registerActionEndpoint = (actionRegistry: IRegistry<IRegisterableAction>): RequestHandler => {

    const actions = actionRegistry.getAll();

    actions.forEach((action) => {
        logger.log(`Registering action ${action.getName()}`);
    });

    return (req: Request, res: Response) => {
        const { action, data } = req.body;
        if (!action || !data) {
            return respond400(res, `Message body should contain properties action and data`);
        }

        const actionObj = actionRegistry.get(action);
        if (!actionObj) {
            return respond400(res, `Invalid action name ${action}`);
        }

        actionObj.processData(data)
            .then(() => {
                logger.log(`200 - Action "${action}" processed`);
                res.sendStatusJson(200);
            })
            .catch((err: Error | ActionError) => {
                if (err instanceof Error) {
                    logger.error(`500 - Action "${action}" failed`);
                    if (err) {
                        logger.error(JSON.stringify(err));
                    }
                    res.sendStatusJson(500);
                } else {
                    // Custom error handling
                    res.sendStatusJson(err.statusCode, err.payload);
                }
            });
    }
}

const respond400 = (res: Response, message: string) => {
    logger.log(`400 - ${message}`);
    return res.sendStatusJson(400, { message });
}