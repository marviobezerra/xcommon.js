export class SpecificationValidation<T> {
	constructor() {
	}

	private Expressions: ISpecificationExpression<T>[] = [];

	public And(expression: { (arg: T): boolean }, condition: boolean = true, stopIfInvalid: boolean = false): SpecificationValidation<T> {
		this.Expressions.push({ Expression: expression, Condition: condition, StopIfInvalid: stopIfInvalid });
		return this;
	}

	public Or(expression1: { (arg: T): boolean }, expression2: { (arg: T): boolean }, condition: boolean = true, stopIfInvalid: boolean = false): SpecificationValidation<T> {
		this.Expressions.push({ Expression: (arg: T) => expression1(arg) || expression2(arg), Condition: condition, StopIfInvalid: stopIfInvalid });
		return this;
	}

	public Validate(entity: T): boolean {

		let result: boolean = true;

		if (!entity) {
			result = false;
			return result;
		}

		for (let expression of this.Expressions) {

			if (expression.Condition && !expression.Expression(entity)) {
				result = false;

				if (expression.StopIfInvalid) {
					break;
				}
			}
		}

		return result;
	}
}

export interface ISpecificationExpression<T> {
	Expression(arg: T): boolean;
	Condition: boolean;
	StopIfInvalid: boolean;
}
