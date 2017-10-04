import { ValidatorFn, FormBuilder } from "@angular/forms";
import { AutoForm } from "./auto-form";
export declare class AutoFormService {
    private formBuilder;
    constructor(formBuilder: FormBuilder);
    createNew<TEntity>(): AutoForm<TEntity>;
    matchValidator(mainControlName: string): ValidatorFn;
}
