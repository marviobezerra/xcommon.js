import { Injectable } from "@angular/core";
import { ValidatorFn, AbstractControl, ValidationErrors, FormBuilder } from "@angular/forms";
import { EntityAction } from "../entity/entity";

import { AutoForm } from "./auto-form";

@Injectable()
export class AutoFormService {

	constructor(private formBuilder: FormBuilder) {
	}

	public CreateNew<TEntity>(): AutoForm<TEntity> {
		return new AutoForm<TEntity>(this.formBuilder);
	}

	public MatchValidator(mainControlName: string): ValidatorFn {

		let mainControl: AbstractControl;

		const result: ValidatorFn = (control: AbstractControl): ValidationErrors => {

			if (!mainControl) {

				mainControl = control.parent.get(mainControlName) as AbstractControl;

				if (!mainControl) {
					throw new Error("matchValidator(): main control is not found in parent group");
				}

				mainControl.valueChanges.subscribe(() => {
					control.updateValueAndValidity();
				});
			}

			if (mainControl.value !== control.value) {
				return {
					matchValidator: true
				};
			}
		};

		return result;
	}
}