import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as sss from "send-status-json";
import * as ws from "websocket";
import * as bodyParser from "body-parser";

import * as logger from "./logger";
import { Response, Request } from "./types";
import { WebsocketConnectionManager } from "./websocket-connection-manager";
import { ActionData } from "./actions/base";
import { registerActions } from "./actions/register-actions";
import { registerActionEndpoint } from "./actions/register-endpoint";
import { ActionRegistry } from "./actions/registry";

export interface ServerOptions {
    port: number;
}

export const launch = (options: ServerOptions) => {

    const handleAfterActionProcess = (actionData: ActionData) => {
        const { action, data } = actionData;
        logger.log(`Sending of action "${action}" data to all clients: ${JSON.stringify(data)}`);
        wsConnManager.sendAll(action, data);
    }

    const STATIC_FILES_PATH_PARTS = (process.env.DEVELOPMENT)
        ? [__dirname, "..", "..", "client", "dist"]
        : [__dirname, "..", "public"];

    logger.initLogger(console);

    const app = express();
    const server = http.createServer(app);
    const wsServer = new ws.server({ httpServer: server });
    const wsConnManager = new WebsocketConnectionManager(wsServer, logger.getLogger());
    const actionRegistry = new ActionRegistry();

    registerActions(actionRegistry, handleAfterActionProcess);

    app.use(sss.sendStatusJsonMiddleware());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

    // Register path for serving index.html file
    app.get("/", (req: Request, res: Response) => {
        res.sendFile(path.join(...STATIC_FILES_PATH_PARTS, "index.html"));
    });

    // Register actions from the action registry
    app.post("/actions", registerActionEndpoint(actionRegistry));

    // Register static files path
    app.use("/assets", express.static(path.join(...STATIC_FILES_PATH_PARTS, "assets")));

    app.use((req: Request, res: Response) => {
        logger.log(`404 - (${req.method} ${req.originalUrl}`);
        res.sendStatusJson(404);
    });

    app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
        logger.error(`500 - Error with request to ${req.originalUrl}`);
        logger.error(JSON.stringify(err))
        res.sendStatusJson(500);
    })

    server.listen(options.port, () => {
        logger.log(`HomeDashboard server listening on port ${options.port}`);
    });
}