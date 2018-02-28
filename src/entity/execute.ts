import { ExecuteMessage } from './execute-message';
import { ExecuteMessageType } from './execute-message-type';

/** Class to consolidate messages when it's executing a flow */
export class Execute<TEntity> {

	/** Flow messages */
	public readonly messages: ExecuteMessage[] = [];
	/** Indicate if there is at least one error message */
	public hasError = false;
	/** Indicate if there is at least one warning message */
	public hasWarning = false;
	/** Indicate if there is at least one exception message */
	public hasException = false;
	/** The flow entity */
	public entity: TEntity;

	/** Create an execute class */
	constructor()
	/** Create an execute class with a base entity */
	constructor(base: TEntity)
	/** Create an execute class base on other Execute */
	constructor(base: Execute<TEntity>)
	constructor(base?: TEntity | Execute<TEntity>) {

		if (base && base instanceof Execute) {
			this.addMessage(base);
			this.entity = base.entity;
		} else {
			this.entity = base as TEntity;
		}
	}

	/** Build all message into a single string using comma as separator */
	public buildMessage(): string;
	/** Build all message into a single string using the specified separator
	 * @param separator separator to be used to build the string
	 */
	public buildMessage(separator: string): string;
	/** Build all message of a specified type into a single string, using the specified separator
	 * @param separator separator to be used to build the string
	 * @param type type to filter the messages
	 */
	public buildMessage(separator: string, type: ExecuteMessageType): string;
	public buildMessage(separator?: string, type?: ExecuteMessageType, ): string {

		const result = this.messages
			.filter(msg => !type || msg.type === type)
			.map(msg => msg.message);

		separator = separator || ',';
		return result.join(separator);
	}

	/** Get all messages in a string array */
	public getMessages(): string[];
	/** Get the messages which match with the type parameter
	 * @param type Type of the message to be filtered
	 */
	public getMessages(type: ExecuteMessageType): string[];
	public getMessages(type?: ExecuteMessageType, ): string[] {

		return this.messages
			.filter(msg => !type || msg.type === type)
			.map(msg => msg.message);
	}

	/** Add a message
	 * @param type Type of the message
	 * @param messafe Message itself
	 */
	public addMessage(type: ExecuteMessageType, message: string): Execute<TEntity>;
	/** Add an exception (Usualy combined with a try catch)
	 * @param type The excpetion
	 */
	public addMessage(type: Error, message: string): Execute<TEntity>;
	/** Merge messages from other execute (It does NOT copy the entity property)
	 * @param type Execute source
	 */
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