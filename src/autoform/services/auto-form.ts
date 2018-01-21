import { AsyncValidatorFn, Validators, ValidatorFn, FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { EntityAction } from "../../entity/entity";
import { AbstractControl } from "@angular/forms/src/model";

interface IPropertyValidador {
	asyncValidator: AsyncValidatorFn[];
	validator?: ValidatorFn[];
	property: string;
	group?: string;
	async: boolean;
	isGroup: boolean;
}

export class AutoForm<TEntity> {
	private ActionKey = "Action";
	private DisabledLits: string[] = [];
	private IgnoreLits: string[] = [];
	private Validators: IPropertyValidador[] = [];
	//private PropertyRegEx = /\.([^\.;]+);?\s*\}$/;

	constructor(private formBuilder: FormBuilder) {
	}

	private GetPropertyName(property: string): string {
		let value = property.replace(/(?:\/\*(?:[\s\S]*?)\*\/)|(?:([\s;])+\/\/(?:.*)$)/gm, "$1");
		value = value.substring(value.indexOf("{") + 1, value.lastIndexOf("}"));
		value = value.replace("return", "");
		value = value.replace(";", "");
		value = value.trim();

		let result = value.split(".");
		result.shift();

		return result.join(".");
	}

	public Ignore<TProperty>(property: (x: TEntity) => TProperty): AutoForm<TEntity> {
		this.IgnoreLits.push(this.GetPropertyName(property.toString()));
		return this;
	}

	public Disable<TProperty>(property: (x: TEntity) => TProperty, disable: boolean = true): AutoForm<TEntity> {

		if (disable) {
			this.DisabledLits.push(this.GetPropertyName(property.toString()));
		}

		return this;
	}

	// tslint:disable-next-line:max-line-length
	public AddAsyncValidator<TProperty>(property: (x: TEntity) => TProperty, validator: AsyncValidatorFn): AutoForm<TEntity> {

		const propertyName = this.GetPropertyName(property.toString());
		const existsValidator = this.Validators.find(c => c.property === propertyName);

		if (existsValidator) {
			existsValidator.asyncValidator.push(validator);
			return this;
		}

		this.Validators.push({
			property: propertyName,
			async: true,
			isGroup: false,
			asyncValidator: [validator],
			validator: null
		});

		return this;
	}

	public AddValidator<TProperty>(property: (x: TEntity) => TProperty, validator: ValidatorFn): AutoForm<TEntity> {

		const propertyName = this.GetPropertyName(property.toString());
		const existsValidator = this.Validators.find(c => c.property === propertyName);

		if (existsValidator) {
			existsValidator.validator.push(validator);
			return this;
		}

		this.Validators.push({
			property: propertyName,
			async: false,
			isGroup: false,
			validator: [validator],
			asyncValidator: null
		});

		return this;
	}

	public AddItemArray<TProperty>(property: (x: TEntity) => TProperty, formGroup: FormGroup, entity: any): FormGroup {
		const propertyName = this.GetPropertyName(property.toString());
		const result: FormGroup = this.BuildInternal(entity, true);
		const control = this.GetControl(formGroup, propertyName);

		(control as FormArray).push(result);
		return result;
	}

	public SetAction(form: FormGroup, action: EntityAction): void {
		form.controls[this.ActionKey].setValue(action);
	}

	public SetUpdate(form: FormGroup): void {
		if (form.controls[this.ActionKey].value === EntityAction.None) {
			form.controls[this.ActionKey].setValue(EntityAction.Update);
		}
	}

	public SetDisable<TProperty>(property: (x: TEntity) => TProperty, formGroup: FormGroup, disable: boolean): void {
		const propertyName = this.GetPropertyName(property.toString());
		const control = formGroup.controls[propertyName] as FormArray;

		if (disable) {
			control.disable({ onlySelf: true, emitEvent: true });
			return;
		}

		control.enable({ onlySelf: true, emitEvent: true });

	}

	public Build(entity: TEntity): FormGroup {
		return this.BuildInternal(entity, true);
	}

	private BuildInternal(entity: TEntity | any, addValidators: boolean): FormGroup {

		const result = this.formBuilder.group({});

		for (const property in entity) {

			if (this.IgnoreLits.find(c => c === property)) {
				continue;
			}

			const propertyValue: any = entity[property];

			if (propertyValue instanceof Array) {

				const arrayGroup = this.formBuilder.array([]);

				for (const arrayItem of propertyValue) {
					const item = this.BuildInternal(arrayItem, false);

					this.OnEntityChange(item);
					arrayGroup.push(item);
				}

				result.addControl(property, arrayGroup);
				continue;
			}

			if (propertyValue === Object(propertyValue) && !(propertyValue instanceof Date)) {
				const propertyGroup = this.BuildInternal(propertyValue, false);
				this.OnEntityChange(propertyGroup);

				result.addControl(property, propertyGroup);
				continue;
			}

			result.addControl(property, this.formBuilder.control(entity[property]));
		}

		if (!addValidators) {
			this.OnEntityChange(result);
			return result;
		}

		for (const validator of this.Validators) {
			const control = this.GetControl(result, validator.property);

			if (validator.async) {
				control.setAsyncValidators(Validators.composeAsync(validator.asyncValidator));
			} else {
				control.setValidators(Validators.compose(validator.validator));
			}
		}

		for (const property of this.DisabledLits) {
			const control = this.GetControl(result, property);
			control.disable({ onlySelf: true, emitEvent: true });
		}

		this.OnEntityChange(result);
		return result;
	}

	private GetControl(form: FormGroup, property: string): AbstractControl {
		const list = property.split(".");
		const item = list.shift();
		const result = form.controls[item];

		if (list.length === 0) {
			return result;
		}

		return this.GetControl(result as FormGroup, list.join("."));
	}

	private OnEntityChange<TModel extends { Action: EntityAction }>(formGroup: FormGroup): void {
		formGroup
			.valueChanges
			.subscribe((value: TModel) => {
				if (value.Action === EntityAction.None) {
					value.Action = EntityAction.Update;
				}
			});
	}
}