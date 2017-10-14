import * as React from "react";
import * as classNames from "classnames";

const styles: any = require("./sidemenu.css");

interface OwnProps {
    visible: boolean;
}

interface OwnState {
    visible: boolean;
    closing: boolean;
}

export class Sidemenu extends React.Component<OwnProps, OwnState> {

    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            closing: false
        }

        this._close = this._close.bind(this);
        this._handleShroudTransitionEnd = this._handleShroudTransitionEnd.bind(this);
    }

    public render(): JSX.Element {

        const rootClasses = classNames({
            [styles.root]: true,
            [styles.rootVisible]: this.state.visible || this.state.closing
        });

        const shroudClasses = classNames({
            [styles.shroud]: true,
            [styles.shroudVisible]: this.state.visible && !this.state.closing
        });

        const menuClasses = classNames({
            [styles.menu]: true,
            [styles.menuVisible]: this.state.visible && !this.state.closing
        });

        return (
            <div className={rootClasses}>
                <div
                    className={shroudClasses}
                    onClick={this._close}
                    onTransitionEnd={this._handleShroudTransitionEnd} />
                <div className={menuClasses}>
                    <div className={`text-right ${styles.menuHeader}`}>
                        <span>&nbsp;</span>
                        <button
                            className={`fa fa-close ${styles.closeButton}`}
                            onClick={this._close} />
                    </div >
                    <div className={styles.menuBody}>
                        {this.props.children}
                    </div>
                </div>
            </div>

        )
    }

    public componentWillReceiveProps(newProps: OwnProps) {
        if (newProps.visible !== this.state.visible) {
            this.setState({ visible: newProps.visible })
        }
    }

    private _close() {
        this.setState({
            visible: false,
            closing: true
        });
    }

    private _handleShroudTransitionEnd() {
        this.setState({ closing: false });
    }

}