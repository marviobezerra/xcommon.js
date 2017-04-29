import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'layout',
    templateUrl: './layout.html',
    styles: [require('./layout.scss').toString()]
})
export class LayoutComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }
}
