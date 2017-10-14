import * as React from "react";
import * as ReactDOM from "react-dom";

import { WebSocketClient } from "./common/websocket-client";

const webSocketClient = new WebSocketClient('ws://' + document.location.host);
webSocketClient.subscribeAction('system-monitor', (data) => console.log("Got data", data));

ReactDOM.render(
    (
        <div>Initialized</div>
    ),
    document.getElementById('app')
);