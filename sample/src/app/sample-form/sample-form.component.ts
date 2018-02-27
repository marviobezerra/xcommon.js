import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';

import { AutoFormService, AutoForm } from '../../../../src/autoform';
import { SignInEntity, PersonEntity, Level01 } from '../entity';
import { Execute, ExecuteMessageType, ExecuteMessage } from '../../../../src/entity';

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

		this.testExecute();
	}

	private testExecute(): void {
		const test01 = new Execute<any>();
		test01
			.addMessage(ExecuteMessageType.Error, 'Invalid name')
			.addMessage(ExecuteMessageType.Error, 'Invalid email')
			.addMessage(ExecuteMessageType.Warning, 'You may want to create a new thing?');

		console.log(`01 HasError: ${test01.hasError}`);
		console.log(`01 HasWarning: ${test01.hasWarning}`);
		console.log(`01 Messages Count: ${test01.messages.length}`);
		console.log(`01 Messages: ${test01.buildMessage('<br/>')}`);

		const test02 = new Execute<any>();
		test02.addMessage(test01);
		console.log(`02 HasError: ${test02.hasError}`);
		console.log(`02 HasWarning: ${test02.hasWarning}`);
		console.log(`02 Messages Count: ${test02.messages.length}`);
		console.log(`02 Messages: ${test02.buildMessage(' | ')}`);

		const test03 = new Execute<any>(test02);
		console.log(`03 HasError: ${test03.hasError}`);
		console.log(`03 HasWarning: ${test03.hasWarning}`);
		console.log(`03 Messages Count: ${test03.messages.length}`);
		console.log(test03.buildMessage());
		console.log(test03.getMessages());
		console.log(test03.getMessages(ExecuteMessageType.Warning));
	}
}
