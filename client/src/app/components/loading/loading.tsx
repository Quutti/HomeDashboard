import * as React from "react";

const styles: any = require("./loading.css");

interface OwnProps {
    size?: number;
}

export class Loading extends React.Component<OwnProps, {}> {

    static defaultProps: Partial<OwnProps> = {
        size: 100
    }

    public render(): JSX.Element {
        const style = { width: this.props.size };
        return (
            <div className={styles.root}>
                <img style={style} src="assets/img/loading.svg" />
            </div>
        )
    }

}