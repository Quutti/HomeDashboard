import * as React from "react";
import * as classNames from "classnames";

interface OwnProps {
    fixedWidth?: boolean;
}

export class GridContainer extends React.Component<OwnProps, {}> {

    public render(): JSX.Element {
        const classes = classNames({
            "container": this.props.fixedWidth,
            "container-fluid": !this.props.fixedWidth
        });

        return <div className={classes}>{this.props.children}</div>
    }

}