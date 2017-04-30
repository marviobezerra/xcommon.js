import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
	selector: 'auto-form',
	template: '<div>Hey</div>'
})
export class AutoFormComponent {
	constructor(public formBuilder: FormBuilder) { }
}