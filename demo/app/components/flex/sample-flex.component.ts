import { Component, OnInit, OnDestroy } from '@angular/core';
import { Align, Justify, Layout, Wrap } from '../../../../src/core/layout';
import { IFlexEntity } from './entity';

@Component({
    selector: 'sample-flex',
    templateUrl: './sample-flex.html',
    styles: [require('./sample-flex.scss').toString()]
})
export class SampleFlexComponent implements OnInit, OnDestroy {

    public LayoutOptions: Array<any> = [];
    public AlingOptions: Array<any> = [];
    public JustifyOptions: Array<any> = [];
    public WrapOptions: Array<any> = [];

    public LayoutValue = Layout.Column;
    public AlingValue = Align.Center;
    public JustifyValue = Justify.Center;
    public WrapValue = Wrap.Wrap;

    public Items: Array<IFlexEntity> = [];
    public SelectedItem: IFlexEntity;
    public ContainerHeight: number;
    public ContainerWidth: number;

    constructor() {
    }

    public GetContent(): String {
        return `${this.AlingValue} ${this.JustifyValue}`;
    }

    public LoadItem(item: IFlexEntity): void {
        this.SelectedItem = item;
    }

    public NewItem(): void {
        this.Items.push({
            Align: Align.Center,
            Color: this.RandonColor(),
            Flex: false,
            FlexSize: 0,
            Justify: Justify.Center,
            Text: 'Item ' + (this.Items.length + 1).toString()
        });
    }

    public CleanItems(): void {
        this.Items = [];
        this.SelectedItem = null;
    }

    private LoadInitialScreenSize(): void {
        let x = document.getElementsByClassName('container')[0];
        this.ContainerWidth = x.clientWidth;
        this.ContainerHeight = x.clientHeight;

        console.log("ContainerWidth", this.ContainerWidth);
    }

    private RandonColor(): string {
        return '#' + '0123456789abcdef'.split('').map(function (v, i, a) {
            return i > 5 ? null : a[Math.floor(Math.random() * 16)]
        }).join('');
    }

    private LoadInitialItems(): void {
        this.NewItem();
        this.NewItem();
        this.NewItem();
    }

    private LoadProperties(): void {

        let align: any = Align;
        for (let property in align) {
            this.AlingOptions.push({ text: property, value: align[property] });
        }

        let justify: any = Justify;
        for (let property in justify) {
            this.JustifyOptions.push({ text: property, value: justify[property] });
        }

        let layout: any = Layout;
        for (let property in layout) {
            this.LayoutOptions.push({ text: property, value: layout[property] });
        }

        let wrap: any = Wrap;
        for (let property in wrap) {
            this.WrapOptions.push({ text: property, value: wrap[property] });
        }
    }

    ngOnInit(): void {
        document.body.style.overflow = 'hidden';
        this.LoadProperties();
        this.LoadInitialScreenSize();
        this.LoadInitialItems();
    }

    ngOnDestroy(): void {
        document.body.style.overflow = 'initia';
    }
}
