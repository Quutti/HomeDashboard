import * as React from "react";
import * as classNames from "classnames";

const styles: any = require("./grid-row.css");

interface OwnProps {
    verticalMiddle?: boolean;
}

export class GridRow extends React.Component<OwnProps, {}> {

    public render(): JSX.Element {
        const classes = classNames({
            "row": true,
            [styles.verticalMiddle]: this.props.verticalMiddle
        });

        return <div className={classes}>{this.props.children}</div>
    }

}