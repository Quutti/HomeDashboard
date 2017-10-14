import * as React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Route } from "react-router";

import './styles/globals/main.global.css';

import { WebSocketClient } from "./common/websocket-client";

import { AppRoutes } from "./routes";
import { NavigationBar } from "./components/navigation-bar";
import { Sidemenu } from "./components/sidemenu";

const webSocketClient = new WebSocketClient('ws://' + document.location.host);
webSocketClient.subscribeAction('system-monitor', (data) => console.log("Got data", data));

interface OwnState {
    sidemenuVisible: boolean;
}

class App extends React.Component<{}, OwnState> {

    constructor(props) {
        super(props);

        this.state = {
            sidemenuVisible: false
        }

        this._handleMenuButtonClick = this._handleMenuButtonClick.bind(this);
    }

    public render(): JSX.Element {
        return (
            <BrowserRouter>
                <div>
                    <NavigationBar brand="HomeDashboard" onMenuButtonClick={this._handleMenuButtonClick} />
                    <Sidemenu visible={this.state.sidemenuVisible} />
                    <div className="page-wrapper">
                        <AppRoutes />
                    </div>
                </div>
            </BrowserRouter>
        )
    }

    private _handleMenuButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ sidemenuVisible: true })
    }

}

ReactDOM.render(<App />, document.getElementById('app'));