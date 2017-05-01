import { Component, OnInit } from '@angular/core';
import * as Layout from '../../../../src/core/layout';
import { AutoFormService } from '../../../../src/angular/services';

@Component({
    selector: 'simple-flex',
    templateUrl: './simple-flex.html',
    styles: [require('./simple-flex.scss').toString()]
})
export class SimpleFlexComponent implements OnInit {
    constructor(private autoFormService: AutoFormService) {
        console.log(autoFormService);
     }

    public Layout: Layout.Layout = Layout.Layout.Column;
    public Aling: Layout.Align = Layout.Align.Center;
    public Justify: Layout.Justify = Layout.Justify.Center;

    public GetContent(): String {
        return `${this.Aling} ${this.Justify}`;
    }

    ngOnInit(): void {
    }
}
