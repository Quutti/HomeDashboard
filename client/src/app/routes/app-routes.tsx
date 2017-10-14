import * as React from "react";
import { Route, Switch } from "react-router";

import { DashboardView } from "../views/dashboard";

export class AppRoutes extends React.Component<{}, {}> {

    public render(): JSX.Element {
        return (
            <Switch>
                <Route exact path="/" component={DashboardView} />
            </Switch>
        )
    }
}