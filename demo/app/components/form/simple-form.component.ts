import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'simple-form',
    templateUrl: './simple-form.html',
    styles: [require('./simple-form.scss').toString()]
})
export class SimpleFormComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {

    }
}
