import * as React from "react";
import * as classNames from "classnames";

const styles: any = require("./toggle-switch.css");

interface OwnProps {
    disabled?: boolean;
    onChange?: (value: boolean) => void;
}

interface OwnState {
    on: boolean;
}

export class ToggleSwitch extends React.Component<OwnProps, OwnState> {

    constructor(props) {
        super(props);

        this.state = {
            on: false
        }

        this._handleClick = this._handleClick.bind(this);
    }

    public render(): JSX.Element {

        const containerClasses = classNames({
            [styles.container]: true,
            [styles.containerOn]: this.state.on,
            [styles.containerDisabled]: !!this.props.disabled
        })

        const onBaseStyles = [styles.base, styles.baseOn].join(" ");
        const offBaseStyles = [styles.base, styles.baseOff].join(" ");

        return (
            <div className={containerClasses} onClick={this._handleClick}>
                <div className={onBaseStyles}>On</div>
                <div className={styles.handle} />
                <div className={offBaseStyles}>Off</div>
            </div>
        )
    }

    private _handleClick() {
        if (this.props.disabled) {
            return;
        }

        const value = !this.state.on;
        this.setState({ on: value });

        if (this.props.onChange) {
            this.props.onChange(value)
        }
    }

}