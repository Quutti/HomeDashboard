import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";

import './styles/globals/main.global.css';

import { WebSocketClient } from "./common/websocket-client";

import { AppRoutes } from "./routes";
import { NavigationBar } from "./components/navigation-bar"

const webSocketClient = new WebSocketClient('ws://' + document.location.host);
webSocketClient.subscribeAction('system-monitor', (data) => console.log("Got data", data));

const handleMenuButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {

}

ReactDOM.render(
    (
        <BrowserRouter>
            <div>
                <NavigationBar brand="HomeDashboard" onMenuButtonClick={handleMenuButtonClick} />
                <div className="page-wrapper">
                    <AppRoutes />
                </div>
            </div>
        </BrowserRouter>
    ),
    document.getElementById('app')
);