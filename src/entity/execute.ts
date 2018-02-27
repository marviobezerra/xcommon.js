import { ExecuteMessage } from './execute-message';
import { ExecuteMessageType } from './execute-message-type';

export class Execute<TEntity> {

	public readonly messages: ExecuteMessage[] = [];
	public hasError = false;
	public hasWarning = false;
	public hasException = false;
	public entity: TEntity;

	constructor()
	constructor(base: TEntity)
	constructor(base: Execute<any>)
	constructor(base?: TEntity | Execute<any>) {

		if (base && base instanceof Execute) {
			this.addMessage(base);
		} else {
			this.entity = base as TEntity;
		}
	}

	public buildMessage(): string;
	public buildMessage(separator: string): string;
	public buildMessage(separator: string, type: ExecuteMessageType): string;
	public buildMessage(separator?: string, type?: ExecuteMessageType, ): string {

		const result = this.messages
			.filter(msg => !type || msg.type === type)
			.map(msg => msg.message);

		separator = separator || ',';
		return result.join(separator);
	}

	public getMessages(): string[];
	public getMessages(type: ExecuteMessageType): string[];
	public getMessages(type?: ExecuteMessageType, ): string[] {

		return this.messages
			.filter(msg => !type || msg.type === type)
			.map(msg => msg.message);
	}

	public addMessage(type: ExecuteMessageType, message: string): Execute<TEntity>;
	public addMessage(type: Error, message: string): Execute<TEntity>;
	public addMessage(type: Execute<any>): Execute<TEntity>;
	public addMessage(type: ExecuteMessageType | Error | Execute<any>, message: string = null): Execute<TEntity> {
		if (type instanceof Error) {
			this.hasException = true;
			this.messages.push({ type: ExecuteMessageType.Exception, message: type.message });
		}

		if (type instanceof Execute) {
			type.messages.forEach(msg => this.addMessage(msg.type, msg.message));
		}

		if (typeof type === 'number') {

			switch (type) {
				case ExecuteMessageType.Error:
					this.hasError = true;
					break;
				case ExecuteMessageType.Warning:
					this.hasWarning = true;
					break;
				case ExecuteMessageType.Exception:
					this.hasException = true;
					break;
				default:
					break;
			}

			this.messages.push({ type, message });
		}

		return this;
	}
}