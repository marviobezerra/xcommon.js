export declare class SpecificationValidation<T> {
    constructor();
    private Expressions;
    And(expression: {
        (arg: T): boolean;
    }, condition?: boolean, stopIfInvalid?: boolean): SpecificationValidation<T>;
    Or(expression1: {
        (arg: T): boolean;
    }, expression2: {
        (arg: T): boolean;
    }, condition?: boolean, stopIfInvalid?: boolean): SpecificationValidation<T>;
    Validate(entity: T): boolean;
}
