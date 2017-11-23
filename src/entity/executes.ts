import { IExecute } from "./executes";
import { ExecuteMessageType } from "./entity";

export interface IExecute<TEntity> {
	Entity: TEntity;
	HasErro: boolean;
	HasException: boolean;
	HasWarning: boolean;
	Messages: IExecuteMessage[];
}

export interface IExecuteMessage {
	Type: ExecuteMessageType;
	Message: string;
}