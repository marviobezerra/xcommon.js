import { Component, OnInit } from '@angular/core';
import { AutoFormService, AutoForm } from '../../../../src/autoform';
import { SignInEntity, PersonEntity, Level01 } from '../entity';
import { Validators, FormGroup } from '@angular/forms';

@Component({
	selector: 'app-sample-form',
	templateUrl: './sample-form.component.html',
	styleUrls: ['./sample-form.component.css']
})
export class SampleFormComponent implements OnInit {

	public ready = false;
	public signInForm: AutoForm<SignInEntity>;
	public personForm: AutoForm<PersonEntity>;
	public leveForm: AutoForm<Level01>;

	constructor(private autoForm: AutoFormService) { }

	public enableFormValidator(enable: boolean): void {
		this.signInForm
			.disablePropertyValidator(c => c.email, enable)
			.disablePropertyValidator(c => c.password, enable);
	}

	public enableEmail(enable: boolean): void {
		this.personForm
			.disableControl(c => c.user.email, enable);

		if (!enable) {
			this.personForm
				.setValue(c => c.user.email, 'Jonas');
		}
	}

	ngOnInit() {
		this.signInForm = this.autoForm.CreateNew<SignInEntity>();

		this.signInForm
			.addValidator(c => c.email, Validators.required)
			.addValidator(c => c.email, Validators.required)
			.addValidator(c => c.password, Validators.required)
			.build({
				email: '',
				password: ''
			});

		this.personForm = this.autoForm.CreateNew<PersonEntity>();

		this.personForm
			.addValidator(c => c.name, Validators.required)
			.addValidator(c => c.email, Validators.required)
			.addValidator(c => c.email, Validators.email)
			.addValidator(c => c.age, Validators.required)
			.addValidator(c => c.user.email, Validators.required)
			.disableControl(c => c.user.email)
			.addValidator(c => c.user.password, Validators.required)
			.build({
				name: '',
				email: '',
				age: 35,
				user: {
					email: '',
					password: ''
				}
			});

		this.leveForm = this.autoForm.CreateNew<Level01>();

		this.leveForm
			.addValidator(c => c.level02.level03.level03Value)
			.addValidator(c => c.level01Value, Validators.required)
			.addValidator(c => c.level02.level02Value, Validators.required)
			.addValidator(c => c.level02.level03.level03Value, Validators.required)
			.build({
				level01Value: 'level 01',
				level02: {
					level02Value: '',
					level03: {
						level03Value: 'level 03'
					}
				}
			});

		this.ready = true;
	}

}
