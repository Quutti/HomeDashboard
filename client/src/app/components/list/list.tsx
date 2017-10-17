import * as React from "react";

const styles: any = require("./list.css");

export class List extends React.Component<{}, {}> {

    public render(): JSX.Element {
        return <ul className={styles.list}>{this.props.children}</ul>
    }

}