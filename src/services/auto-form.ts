import { AsyncValidatorFn, Validators, ValidatorFn, FormBuilder, FormGroup, FormArray } from "@angular/forms";
import { EntityAction } from "../entity/entity";

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
	private PropertyRegEx = /\.([^\.;]+);?\s*\}$/;

	constructor(private formBuilder: FormBuilder) {
	}

	public Ignore<TProperty>(property: (x: TEntity) => TProperty): AutoForm<TEntity> {
		this.IgnoreLits.push(this.PropertyRegEx.exec(property.toString())[1]);
		return this;
	}

	public Disable<TProperty>(property: (x: TEntity) => TProperty, disable: boolean = true): AutoForm<TEntity> {

		if (disable) {
			this.DisabledLits.push(this.PropertyRegEx.exec(property.toString())[1]);
		}

		return this;
	}

	// tslint:disable-next-line:max-line-length
	public AddAsyncValidator<TProperty>(property: (x: TEntity) => TProperty, validator: AsyncValidatorFn): AutoForm<TEntity> {

		const propertyName = this.PropertyRegEx.exec(property.toString())[1];
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

		const propertyName = this.PropertyRegEx.exec(property.toString())[1];
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
		const result: FormGroup = this.BuildInternal(entity);
		(formGroup.controls[this.PropertyRegEx.exec(property.toString())[1]] as FormArray).push(result);
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
		const propertyName = this.PropertyRegEx.exec(property.toString())[1];
		const control = formGroup.controls[propertyName] as FormArray;

		if (disable) {
			control.disable({ onlySelf: true, emitEvent: true });
			return;
		}

		control.enable({ onlySelf: true, emitEvent: true });

	}

	public Build(entity: TEntity): FormGroup {
		return this.BuildInternal(entity);
	}

	private BuildInternal(entity: TEntity | any): FormGroup {

		const result: FormGroup = this.formBuilder.group({});

		for (const property in entity) {

			if (this.IgnoreLits.find(c => c === property)) {
				continue;
			}

			const object: any = entity[property];

			if (object instanceof Array) {

				const arrayGroup: FormArray = this.formBuilder.array([]);

				for (const value of object) {
					const item: FormGroup = this.BuildInternal(value);

					this.OnEntityChange(item);
					arrayGroup.push(item);
				}

				result.addControl(property, arrayGroup);
				continue;
			}

			if (object === Object(object) && !(object instanceof Date)) {
				const item: FormGroup = this.formBuilder.group([property], this.BuildInternal(object));
				this.OnEntityChange(item);

				result.addControl(property, item);
				continue;
			}

			result.addControl(property, this.formBuilder.control(entity[property]));
		}

		for (const validator of this.Validators) {
			if (validator.async) {
				result.controls[validator.property].setAsyncValidators(Validators.composeAsync(validator.asyncValidator));
			} else {
				result.controls[validator.property].setValidators(Validators.compose(validator.validator));
			}
		}

		for (const property of this.DisabledLits) {
			result.controls[property].disable({ onlySelf: true, emitEvent: true });
		}

		this.OnEntityChange(result);
		return result;
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