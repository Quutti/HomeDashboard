import * as React from "react";
import { Link } from "react-router-dom";
import * as classNames from "classnames";

const styles: any = require("./navigation-bar.css");

interface OwnProps {
    brand: string;
    onMenuButtonClick: React.EventHandler<React.MouseEvent<HTMLButtonElement>>;
}

export class NavigationBar extends React.Component<OwnProps, {}> {

    public render(): JSX.Element {

        const buttonClasses = classNames({
            [styles.menuButton]: true,
            "fa": true,
            "fa-bars": true
        });

        return (
            <nav className={styles.root}>
                <button className={buttonClasses} onClick={this.props.onMenuButtonClick}></button>
                <Link to="/" className={styles.brand}>{this.props.brand}</Link>
            </nav>
        )
    }

}