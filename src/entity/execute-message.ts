import { ExecuteMessageType } from './execute-message-type';

export class ExecuteMessage {
	constructor(public readonly message: string, public readonly type: ExecuteMessageType) {
	}
}