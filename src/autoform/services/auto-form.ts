import { AsyncValidatorFn, Validators, ValidatorFn, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

interface IPropertyValidador {
	asyncValidator: AsyncValidatorFn[];
	validator?: ValidatorFn[];
	property: string;
	group?: string;
	async: boolean;
	isGroup: boolean;
	disable: boolean;
}

export class AutoForm<TEntity> {

	public formGroup: FormGroup;

	private disabledLits: string[] = [];
	private ignoreLits: string[] = [];
	private validators: IPropertyValidador[] = [];

	constructor(private formBuilder: FormBuilder) {
	}

	public addValidator<TProperty>(property: (x: TEntity) => TProperty, validator?: ValidatorFn): AutoForm<TEntity> {
		validator = validator || Validators.required;

		const propertyName = this.getPropertyName(property.toString());
		const existsValidator = this.validators.find(c => c.property === propertyName);

		if (existsValidator) {
			existsValidator.validator.push(validator);
			return this;
		}

		this.validators.push({
			property: propertyName,
			async: false,
			isGroup: false,
			validator: [validator],
			asyncValidator: null,
			disable: false
		});

		return this;
	}

	// tslint:disable-next-line:max-line-length
	public addAsyncValidator<TProperty>(property: (x: TEntity) => TProperty, validator: AsyncValidatorFn): AutoForm<TEntity> {

		const propertyName = this.getPropertyName(property.toString());
		const existsValidator = this.validators.find(c => c.property === propertyName);

		if (existsValidator) {
			existsValidator.asyncValidator.push(validator);
			return this;
		}

		this.validators.push({
			property: propertyName,
			async: true,
			isGroup: false,
			asyncValidator: [validator],
			validator: null,
			disable: false
		});

		return this;
	}

	public ignore<TProperty>(property: (x: TEntity) => TProperty): AutoForm<TEntity> {
		this.ignoreLits.push(this.getPropertyName(property.toString()));
		return this;
	}

	// tslint:disable-next-line:max-line-length
	public disablePropertyValidator<TProperty>(property: (x: TEntity) => TProperty, disable: boolean = true): AutoForm<TEntity> {
		const propertyName = this.getPropertyName(property.toString());
		const control = this.getControl(this.formGroup, propertyName);

		if (!disable) {

			this.validators
				.filter(c => c.property === propertyName)
				.forEach(validator => {
					validator.disable = false;
					control.setValidators(Validators.compose(validator.validator));
				});
		}

		if (disable) {
			this.validators
				.filter(c => c.property === propertyName)
				.forEach(validator => {
					validator.disable = true;
				});

			control.setValidators(null);
		}

		control.updateValueAndValidity({ onlySelf: false, emitEvent: true });
		return this;
	}

	public isControlDisabled<TProperty>(property: (x: TEntity) => TProperty): boolean {
		const propertyName = this.getPropertyName(property.toString());
		return !!this.disabledLits.find(c => c === propertyName);
	}

	public disableControl<TProperty>(property: (x: TEntity) => TProperty, disable: boolean = true): AutoForm<TEntity> {

		const propertyName = this.getPropertyName(property.toString());

		if (disable && !this.disabledLits.find(c => c === propertyName)) {
			this.disabledLits.push(propertyName);
		}

		if (!disable) {
			this.disabledLits = this.disabledLits.filter(c => c !== propertyName);
		}

		if (this.formGroup) {
			const control = this.getControl(this.formGroup, propertyName);

			if (disable) {
				control.disable({ onlySelf: true, emitEvent: true });
				return;
			}

			control.enable({ onlySelf: true, emitEvent: true });
		}

		return this;
	}

	public setValue<TProperty>(property: (x: TEntity) => TProperty, value: any): AutoForm<TEntity> {
		const propertyName = this.getPropertyName(property.toString());
		const control = this.getControl(this.formGroup, propertyName);
		control.setValue(value);

		return this;
	}

	public build(entity: TEntity): FormGroup {
		this.formGroup = this.buildInternal(entity, true);
		return this.formGroup;
	}

	private getPropertyName(property: string): string {
		const body = property.split('=>').pop().trim().split('.');
		body.shift();
		const result = body.join('.').split(';');
		result.pop();
		return result.join('.').trim();
	}

	private getControl(form: FormGroup, property: string): AbstractControl {
		const list = property.split('.');
		const item = list.shift();
		const result = form.controls[item];

		if (list.length === 0) {
			return result;
		}

		return this.getControl(result as FormGroup, list.join('.'));
	}

	private buildInternal(entity: TEntity | any, addValidators: boolean): FormGroup {

		const result = this.formBuilder.group({});

		for (const property in entity) {

			// Check Ignore List
			if (this.ignoreLits.find(c => c === property)) {
				continue;
			}

			const propertyValue: any = entity[property];

			// Array Property
			if (propertyValue instanceof Array) {

				const arrayGroup = this.formBuilder.array([]);

				for (const arrayItem of propertyValue) {
					const item = this.buildInternal(arrayItem, false);
					arrayGroup.push(item);
				}

				result.addControl(property, arrayGroup);
				continue;
			}

			// Object Property
			if (propertyValue === Object(propertyValue) && !(propertyValue instanceof Date)) {
				const propertyGroup = this.buildInternal(propertyValue, false);

				result.addControl(property, propertyGroup);
				continue;
			}

			// Simple Property
			result.addControl(property, this.formBuilder.control(entity[property]));
		}

		// Check if it needs to add validators
		if (!addValidators) {
			return result;
		}

		// Add Validators
		for (const validator of this.validators) {
			const control = this.getControl(result, validator.property);

			if (validator.async) {
				control.setAsyncValidators(Validators.composeAsync(validator.asyncValidator));
			} else {
				control.setValidators(Validators.compose(validator.validator));
			}
		}

		// Disable Controls
		for (const property of this.disabledLits) {
			const control = this.getControl(result, property);
			control.disable({ onlySelf: true, emitEvent: true });
		}

		return result;
	}
}
