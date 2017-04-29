import { Execute, ExecuteMessageType } from './execute';

export class SpecificationValidation<T> {
	constructor() {
	}

	private Expressions: ISpecificationExpression<T>[] = [];

	public And(expression: { (arg: T): boolean }, message: string, stopIfInvalid: boolean = false): SpecificationValidation<T> {
		this.Expressions.push({ Expression: expression, Message: message, StopIfInvalid: stopIfInvalid });
		return this;
	}

	public Or(expression1: { (arg: T): boolean }, expression2: { (arg: T): boolean }, message: string, stopIfInvalid: boolean = false): SpecificationValidation<T> {
		this.Expressions.push({ Expression: (arg: T) => expression1(arg) || expression2(arg), Message: message, StopIfInvalid: stopIfInvalid });
		return this;
	}

	public IsSatisfiedBy(entity: T): boolean;
	public IsSatisfiedBy(entity: T, execute: Execute = null): boolean {

		execute = execute || new Execute();

		if (!entity) {
			execute.AddMessage(ExecuteMessageType.Error, 'Entity can\'t be null');
			return execute.HasErro;
		}

		for (let expression of this.Expressions) {

			if (!expression.Expression(entity)) {
				execute.AddMessage(ExecuteMessageType.Error, expression.Message);

				if (expression.StopIfInvalid) {
					break;
				}
			}
		}

		return execute.HasErro;
	}
}

export interface ISpecificationExpression<T> {
	Expression(arg: T): boolean;
	Message: string;
	StopIfInvalid: boolean;
}
