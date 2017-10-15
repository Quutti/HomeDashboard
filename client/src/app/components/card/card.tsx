import * as React from "react";

const styles: any = require("./card.css");

interface OwnProps {
    heading: string;
    description?: string;
}

export class Card extends React.Component<OwnProps, {}> {

    public render(): JSX.Element {
        return (
            <div className={styles.root}>
                <div className={styles.head}>
                    <h2 className={styles.heading}>{this.props.heading}</h2>
                    {this.props.description && <p className={styles.description}>{this.props.description}</p>}
                </div>
                <div className={styles.body}>{this.props.children}</div>
            </div>
        );
    }

}