import * as React from "react";

const styles: any = require("./grid-col.css");

interface OwnProps {
    xs?: number;
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
}

export class GridCol extends React.Component<OwnProps, {}> {

    static defaultProps: Partial<OwnProps> = {
        xs: 12,
        sm: 12,
        md: 12,
        lg: 12,
        xl: 12
    }

    public render(): JSX.Element {
        const { xs, sm, md, lg, xl } = this.props;

        const classes = [
            styles.col,
            "col",
            `col-${xs}`,
            `col-sm-${sm}`,
            `col-md-${md}`,
            `col-lg-${lg}`,
            `col-xl-${xl}`,
        ].join(" ");

        return <div className={classes}>{this.props.children}</div>
    }

}