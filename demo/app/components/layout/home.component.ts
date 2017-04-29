import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.html',
    styles: [require('./home.scss').toString()]
})
export class HomeComponent implements OnInit {
    constructor() { }

    ngOnInit(): void {

    }
}
