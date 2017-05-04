import { Align, Justify } from '../../../../src/core/layout';

export interface IFlexEntity {
	Text: string;
	Color: string;
	Align: Align;
	Justify: Justify;
	Flex: boolean;
	FlexSize: number;
}