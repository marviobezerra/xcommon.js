import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IFlexEntity } from './entity';

@Component({
    selector: 'flex-element',
    templateUrl: './flex-element.html',
    styles: [require('./flex-element.scss').toString()],
    host: {
        '(click)': 'HostClick($event)',
        '[attr.flex]': 'Entity.Flex ? "" : null',
        '[style.background]': 'Entity.Color'
    }
})
export class FlexElementComponent implements OnInit {

    @Input() Entity: IFlexEntity;
    @Output() ItemSelected: EventEmitter<IFlexEntity> = new EventEmitter();

    constructor() {
    }

    public HostClick(): void {
        this.ItemSelected.emit(this.Entity);
    }

    ngOnInit(): void {
    }
}
