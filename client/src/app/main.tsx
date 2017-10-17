import * as React from "react";
import * as redux from "redux";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import thunkMiddleware from "redux-thunk";
import './styles/globals/main.global.css';

import combinedReducers from "./store/reducers/_combined";
import { receivedSystems } from "./store/actions/systems";
import { WebSocketClient } from "./common/websocket-client";
import { System } from "@shared/types";
import { App } from "./app";

const store = redux.createStore(combinedReducers, redux.applyMiddleware(thunkMiddleware));

const webSocketClient = new WebSocketClient('ws://' + document.location.host);
webSocketClient.subscribeAction('system-monitor', (data: System[]) => {
    store.dispatch(receivedSystems(data))
});

ReactDOM.render((
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
), document.getElementById('app'));