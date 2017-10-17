import * as React from "react";
import { Route } from "react-router";
import { connect } from "react-redux";

import { AppRoutes } from "./routes";
import { NavigationBar } from "./components/navigation-bar";
import { Sidemenu } from "./components/sidemenu";

interface OwnState {
    sidemenuVisible: boolean;
}

class AppImpl extends React.Component<{}, OwnState> {

    constructor(props) {
        super(props);

        this.state = {
            sidemenuVisible: false
        }

        this._handleMenuButtonClick = this._handleMenuButtonClick.bind(this);
    }

    public render(): JSX.Element {
        return (
            <div>
                <NavigationBar brand="HomeDashboard" onMenuButtonClick={this._handleMenuButtonClick} />
                <Sidemenu visible={this.state.sidemenuVisible} />
                <div className="page-wrapper">
                    <AppRoutes />
                </div>
            </div>
        )
    }

    private _handleMenuButtonClick = (evt: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({ sidemenuVisible: true })
    }

}

export const App = connect()(AppImpl);