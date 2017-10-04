import { AsyncValidatorFn, ValidatorFn, FormBuilder, FormGroup } from "@angular/forms";
import { EntityAction } from "../entity/entity";
export declare class AutoForm<TEntity> {
    private formBuilder;
    private ActionKey;
    private DisabledLits;
    private IgnoreLits;
    private Validators;
    private PropertyRegEx;
    constructor(formBuilder: FormBuilder);
    Ignore<TProperty>(property: (x: TEntity) => TProperty): AutoForm<TEntity>;
    Disable<TProperty>(property: (x: TEntity) => TProperty, disable?: boolean): AutoForm<TEntity>;
    AddAsyncValidator<TProperty>(property: (x: TEntity) => TProperty, validator: AsyncValidatorFn): AutoForm<TEntity>;
    AddValidator<TProperty>(property: (x: TEntity) => TProperty, validator: ValidatorFn): AutoForm<TEntity>;
    AddItemArray<TProperty>(property: (x: TEntity) => TProperty, formGroup: FormGroup, entity: any): FormGroup;
    SetAction(form: FormGroup, action: EntityAction): void;
    SetUpdate(form: FormGroup): void;
    SetDisable<TProperty>(property: (x: TEntity) => TProperty, formGroup: FormGroup, disable: boolean): void;
    Build(entity: TEntity): FormGroup;
    private BuildInternal(entity);
    private OnEntityChange<TModel>(formGroup);
}
