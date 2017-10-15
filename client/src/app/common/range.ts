
export interface Range {
    min: number;
    max: number;
}

export function getValueOfPercentageInRange(percentage: number, range: Range): number {
    return (percentage * (range.max - range.min) / 100) + range.min;
}

export function getPercentageOfValueInRange(value: number, range: Range): number {
    if (range.max < range.min) {
        throw "Range max value must be larger than min value";
    }

    const r = range.max - range.min;
    const newStartValue = value - range.min;
    return (newStartValue * 100) / r;
}

export function getMatchingValueFromRange(value: number, origRange: Range, fromRange: Range): number {
    const p = getPercentageOfValueInRange(value, origRange);
    return getValueOfPercentageInRange(p, fromRange);
} 