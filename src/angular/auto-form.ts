import { OnInit } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, AbstractControl, ValidatorFn } from "@angular/forms";

import { EntityAction } from "../core";

export abstract class BaseEditForm implements OnInit {
	constructor(public formBuilder: FormBuilder) {

	}

	public abstract ngOnInit(): void;
	public Active: boolean = false;

	protected AddValidator(formGroup: FormGroup, property: string, validator: ValidatorFn | ValidatorFn[]): void {
		formGroup.controls[property].setValidators(validator);
	}

	protected AddValidatorArray(formGroup: FormGroup, arrayName: string, property: string, validator: ValidatorFn | ValidatorFn[]): void {
		(<FormArray>formGroup.controls[arrayName]).controls.forEach((control: AbstractControl, index: number) => {
			(<FormGroup>control).controls[property].setValidators(validator);
		});
	}

	protected AddItemArray(formGroup: FormGroup, arrayName: string, entity: any): FormGroup {
		let result: FormGroup = this.AutoMapForm(entity);
		(<FormArray>formGroup.controls[arrayName]).push(result);
		return result;
	}

	protected AutoMapForm(entity: any): FormGroup {

		var result: FormGroup = this.formBuilder.group({});

		for (var property in entity) {

			let object: any = entity[property];

			if (object instanceof Array) {

				let arrayGroup: FormArray = this.formBuilder.array([]);

				for (var i: number = 0; i < object.length; i++) {
					let item: FormGroup = this.AutoMapForm(object[i]);

					this.OnEntityChange(item);
					arrayGroup.push(item);
				}

				result.addControl(property, arrayGroup);
				continue;
			}

			if (object === Object(object)) {
				let item: FormGroup = this.formBuilder.group([property], this.AutoMapForm(object));
				this.OnEntityChange(item);

				result.addControl(property, item);
				continue;
			}

			result.addControl(property, this.formBuilder.control(entity[property]));
		}

		this.OnEntityChange(result);
		return result;
	}

	protected OnEntityChange<TModel extends { Action: EntityAction }>(formGroup: FormGroup): void {
		formGroup
			.valueChanges
			.subscribe((value: TModel) => {
				if (value.Action === EntityAction.None) {
					value.Action = EntityAction.Update;
				}
			});
	}
}
