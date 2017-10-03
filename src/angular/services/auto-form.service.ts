import { Injectable } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, ValidatorFn } from "@angular/forms";
import { EntityAction } from "../../core/entity-action";

interface IPropertyValidador {
	validator: ValidatorFn | ValidatorFn[];
	property: string;
	group?: string;
	isGroup: boolean;
}

export class AutoForm<TEntity> {

	private Validators: Array<IPropertyValidador> = [];
	private PropertyRegEx = /\.([^\.;]+);?\s*\}$/;

	constructor(private formBuilder: FormBuilder) {
	}

	public AddValidator<TProperty>(property: (x: TEntity) => TProperty, validator: ValidatorFn | ValidatorFn[]): AutoForm<TEntity> {

		this.Validators.push({
			property: this.PropertyRegEx.exec(property.toString())[1],
			isGroup: false,
			validator: validator
		});

		return this;
	}

	public AddItemArray<TProperty>(property: (x: TEntity) => TProperty, formGroup: FormGroup, entity: any): FormGroup {
		const result: FormGroup = this.BuildInternal(entity);
		(<FormArray>formGroup.controls[this.PropertyRegEx.exec(property.toString())[1]]).push(result);
		return result;
	}

	public Build(entity: TEntity): FormGroup {
		return this.BuildInternal(entity);
	}

	private BuildInternal(entity: TEntity | any): FormGroup {

		let result: FormGroup = this.formBuilder.group({});

		for (let property in entity) {

			let object: any = entity[property];

			if (object instanceof Array) {

				let arrayGroup: FormArray = this.formBuilder.array([]);

				for (var i: number = 0; i < object.length; i++) {
					let item: FormGroup = this.BuildInternal(object[i]);

					this.OnEntityChange(item);
					arrayGroup.push(item);
				}

				result.addControl(property, arrayGroup);
				continue;
			}

			if (object === Object(object)) {
				let item: FormGroup = this.formBuilder.group([property], this.BuildInternal(object));
				this.OnEntityChange(item);

				result.addControl(property, item);
				continue;
			}

			result.addControl(property, this.formBuilder.control(entity[property]));
		}

		for (let validator of this.Validators) {
			result.controls[validator.property].setValidators(validator.validator);
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

@Injectable()
export class AutoFormService {

	constructor(private formBuilder: FormBuilder) {
	}

	public createNew<TEntity>(): AutoForm<TEntity> {
		return new AutoForm<TEntity>(this.formBuilder);
	}
}
