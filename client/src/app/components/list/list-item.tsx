import * as React from "react";

const styles: any = require("./list-item.css");

export class ListItem extends React.Component<{}, {}> {

    public render(): JSX.Element {
        return <li className={styles.item}>{this.props.children}</li>
    }

}