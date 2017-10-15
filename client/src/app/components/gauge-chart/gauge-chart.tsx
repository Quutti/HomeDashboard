import * as React from "react";
import * as d3 from "d3";
import * as classNames from "classnames";

import * as range from "../../common/range";

const styles: any = require("./gauge-chart.css");

interface OwnProps {
    min: number;
    max: number;
    value: number;
    valueTextBuilder?: (value: number) => string;
    warningLevel?: number;
    errorLevel?: number;
}

interface ElementRefs {
    bgPath: SVGPathElement;
    valuePath: SVGPathElement;
    svg: SVGSVGElement;
}

interface XY {
    x: number;
    y: number;
}

const ARC_LENGTH = 0.7;
const CIRCULATION = Math.PI * ARC_LENGTH;

const GAUGE_WIDTH = 20;
const INNER_RADIUS = 60;
const OUTER_RADIUS = INNER_RADIUS + GAUGE_WIDTH;

export class GaugeChart extends React.Component<OwnProps, {}> {

    static defaultProps: Partial<OwnProps> = {
        valueTextBuilder: (value: number) => "" + value
    }

    private _elms: ElementRefs = { bgPath: null, valuePath: null, svg: null };
    private _arc: d3.Arc<any, d3.DefaultArcObject> = null;

    public render(): JSX.Element {

        const { value, errorLevel, warningLevel, min, max, valueTextBuilder } = this.props;

        if (this._elms.bgPath) {
            this._update()
        }

        const centerPoint = this._getCenter();

        const gaugeClasses = classNames({
            [styles.valuePath]: true,
            [styles.valuePathWarning]: warningLevel && warningLevel < value,
            [styles.valuePathError]: errorLevel && errorLevel < value
        });

        const textValue = valueTextBuilder(value);

        const halfRadius = OUTER_RADIUS / 2;

        const xLeft = centerPoint.x - halfRadius;
        const xRight = centerPoint.x + halfRadius;
        const levelTextY = centerPoint.y + halfRadius + 10;

        return (
            <div className={styles.root}>
                <svg className={styles.svg} ref={(ref) => this._elms.svg = ref}>
                    <g transform="translate(0,0)">
                        <path fill="#efefef" ref={(ref) => this._elms.bgPath = ref} />
                        <path className={gaugeClasses} ref={(ref) => this._elms.valuePath = ref} />
                    </g>
                    <g transform="translate(0,0)">
                        <text x={centerPoint.x} y={centerPoint.y} textAnchor="middle" className={styles.valueText}>{textValue}</text>
                        <text x={xLeft} y={levelTextY} textAnchor="middle" className={styles.levelText}>{min}</text>
                        <text x={xRight} y={levelTextY} textAnchor="middle" className={styles.levelText}>{max}</text>
                    </g>
                    <g transform="translate(0,0">
                        {warningLevel && this._createLevelMarker(warningLevel)}
                        {errorLevel && this._createLevelMarker(errorLevel)}
                    </g>
                </svg>
            </div>
        );
    }

    public componentDidMount() {
        this._create();
        this.forceUpdate();
    }

    private _create() {

        this._arc = d3.arc()
            .innerRadius(INNER_RADIUS)
            .outerRadius(OUTER_RADIUS)
            .startAngle(-CIRCULATION);

        const centerPoint = this._getCenter();

        const bgPath = d3.select(this._elms.bgPath)
            .attr('transform', `translate(${centerPoint.x}, ${centerPoint.y})`)
            .datum({ endAngle: CIRCULATION })
            .attr('d', this._arc)

        const valuePath = d3.select(this._elms.valuePath)
            .datum({ endAngle: -CIRCULATION })
            .attr('transform', `translate(${centerPoint.x}, ${centerPoint.y})`)
            .attr('d', this._arc);

    }

    private _update() {
        const { value, min, max } = this.props;
        const fixedValue = fixValue(value, { min, max });
        const v = range.getMatchingValueFromRange(fixedValue, { min, max }, { min: -CIRCULATION, max: CIRCULATION });

        d3.select(this._elms.valuePath)
            .transition()
            .duration(1000)
            .attrTween('d', arcTween(v, this._arc))
            .ease(d3.easeExp);
    }

    private _getCenter(): XY {
        if (!this._elms.svg) {
            return { x: 0, y: 0 }
        }

        return {
            y: this._elms.svg.clientHeight / 2 + GAUGE_WIDTH / 2,
            x: this._elms.svg.clientWidth / 2
        }
    }

    private _createLevelMarker(level: number): JSX.Element {
        const { min, max } = this.props;
        const radius = INNER_RADIUS + GAUGE_WIDTH / 2;
        const centerPoint = this._getCenter();
        const startEndPosition = 360 * ARC_LENGTH / 2;
        const arcValue = range.getMatchingValueFromRange(level, { min, max }, { min: -startEndPosition, max: startEndPosition });
        const arc = describeArc(centerPoint.x, centerPoint.y, radius, arcValue, arcValue + 1);

        return <path className={styles.levelMarker} strokeWidth={OUTER_RADIUS - INNER_RADIUS + 5} d={arc} />
    }
}

const describeArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number): string => {

    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number): XY => {
        let angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;
        return {
            x: centerX + (radius * Math.cos(angleInRadians)),
            y: centerY + (radius * Math.sin(angleInRadians))
        };
    }

    let start = polarToCartesian(x, y, radius, endAngle);
    let end = polarToCartesian(x, y, radius, startAngle);

    let largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
        "M", start.x, start.y,
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(" ");
}

const arcTween = (newAngle, arc) => {
    return function (d) {
        const interpolate = d3.interpolate(d.endAngle, newAngle);
        return function (t) {
            d.endAngle = interpolate(t);
            return arc(d);
        };
    };
}


const fixValue = (value: number, range: range.Range): number => {
    const { min, max } = range;
    let fixedValue = value;
    fixedValue = Math.max(min, fixedValue);
    fixedValue = Math.min(max, fixedValue);
    return fixedValue;
}