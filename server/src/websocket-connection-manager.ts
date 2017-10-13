import * as ws from "websocket";

import { ILogger } from "./logger";
import * as customEvent from "./custom-event";

export class WebsocketConnectionManager {

    private _logger: ILogger;
    private _wsServer: ws.server;
    private _clients: ws.connection[] = [];

    private _onFirstClientConnect = new customEvent.CustomEvent();
    private _onLastClientDisconnect = new customEvent.CustomEvent();

    constructor(wsServer: ws.server, logger: ILogger) {
        this._wsServer = wsServer;
        this._logger = logger;

        this._wsServer.on("request", (request: ws.request) => {
            this._logger.log("Client connection enstablished");

            if (this._clients.length === 0) {
                this._onFirstClientConnect.fire();
            }

            const client = request.accept(null, request.origin);
            this._clients.push(client);
        });

        this._wsServer.on("close", (connection: ws.connection) => {
            const index = this._clients.indexOf(connection);

            if (index > -1) {
                this._clients.splice(index, 1);
            }

            this._logger.log("Client connection closed");

            if (this._clients.length === 0) {
                this._onLastClientDisconnect.fire();
            }
        });
    }

    public onFirstClientConnect(listener: customEvent.CustomEventListener) {
        this._onFirstClientConnect.add(listener);
    }

    public onLastClientDisconnect(listener: customEvent.CustomEventListener) {
        this._onLastClientDisconnect.add(listener);
    }

    public closeClientConnections() {
        this._clients.forEach((client) => client.close());
        this._clients = [];
    }

    public sendAll(action: string, data: any): void {
        const payload = JSON.stringify({ action, data });
        this._clients.forEach((client) => client.sendUTF(payload));
    }

}