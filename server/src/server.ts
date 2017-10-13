import * as express from "express";
import * as path from "path";
import * as http from "http";
import * as sss from "send-status-json";

import * as logger from "./logger";
import { Response, Request } from "./types";

export interface ServerOptions {
    port: number;
}

export const launch = (options: ServerOptions) => {

    const STATIC_FILES_PATH_PARTS = (process.env.DEVELOPMENT)
        ? [__dirname, "..", "..", "client", "dist"]
        : [__dirname, "..", "public"];

    const app = express();
    const server = http.createServer(app);

    logger.initLogger(console);

    app.use(sss.sendStatusJsonMiddleware());

    // Register path for serving index.html file
    app.get("/", (req: Request, res: Response) => {
        //res.sendFile(path.join(...STATIC_FILES_PATH_PARTS, "index.html"));
        res.sendStatusJson(200);
    });

    // Register static files path
    app.use("/assets", express.static(path.join(...STATIC_FILES_PATH_PARTS)));

    app.use((req: Request, res: Response) => {
        res.sendStatusJson(404);
    });

    app.use((err: any, req: Request, res: Response, next: express.NextFunction) => {
        res.sendStatusJson(500);
    })

    server.listen(options.port, () => {
        logger.log(`HomeDashboard server listening on port ${options.port}`);
    });
}