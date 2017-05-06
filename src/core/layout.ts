export type Align = 'start' | 'end' | 'center' | 'stretch' | 'baseline';

export const Align = {
    Start: 'start' as Align,
    End: 'end' as Justify,
    Center: 'center' as Align,
    Stretch: 'stretch' as Align,
    Baseline: 'baseline' as Align
};

export type Layout = 'row' | 'column';

export const  Layout = {
    Row: 'row' as Layout,
    Column: 'column' as Layout
};

export type Justify = 'start' | 'end' | 'center' | 'around' | 'between';

export const Justify = {
    Start: 'start' as Justify,
    End: 'end' as Justify,
    Center: 'center' as Justify,
    Around: 'around' as Justify,
    Between: 'between' as Justify,
}; 

export type Wrap = 'wrap' | 'nowrap' | 'reverse';

export const Wrap = {
    Wrap: 'wrap' as Wrap,
    NoWrap: 'nowrap' as Wrap,
    Reverse: 'reverse' as Wrap
}