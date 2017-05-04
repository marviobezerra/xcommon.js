import { Component, OnInit } from '@angular/core';
import { Align, Justify, Layout } from '../../../../src/core/layout';
import { IFlexEntity } from './entity';

@Component({
    selector: 'sample-flex',
    templateUrl: './sample-flex.html',
    styles: [require('./sample-flex.scss').toString()]
})
export class SampleFlexComponent implements OnInit {

    public LayoutValue: any = Layout.Column;
    public AlingValue: any = Align.Center;
    public JustifyValue: any = Justify.Center;
    public Items: Array<IFlexEntity> = [];
    public Item: IFlexEntity;
    public DemoHeight: number;
    public DemoWidth: number;

    constructor() {
    }

    public GetContent(): String {
        return `${this.AlingValue} ${this.JustifyValue}`;
    }

    public LoadItem(item: IFlexEntity): void {
        this.Item = item;
    }

    public NewItem(): void {
        this.Items.push({
            Align: Align.Center,
            Color: 'red',
            Flex: false,
            FlexSize: 0,
            Justify: Justify.Center,
            Text: 'Item ' + (this.Items.length + 1).toString()
        });
    }

    public SetScreenSize(): void {
        let x = document.getElementsByClassName('demo')[0];
        this.DemoHeight = x.clientHeight;
        this.DemoWidth = x.clientWidth;
    }

    ngOnInit(): void {
        this.SetScreenSize();

        this.Items.push({
            Align: Align.Center,
            Color: 'red',
            Flex: true,
            FlexSize: 0,
            Justify: Justify.Center,
            Text: 'Item 1'
        });

        this.Items.push({
            Align: Align.Center,
            Color: 'green',
            Flex: false,
            FlexSize: 0,
            Justify: Justify.Center,
            Text: 'Item 2'
        });

        this.Items.push({
            Align: Align.Center,
            Color: 'blue',
            Flex: false,
            FlexSize: 0,
            Justify: Justify.Center,
            Text: 'Item 3'
        });
    }
}
