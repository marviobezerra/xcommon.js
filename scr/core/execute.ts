export enum ExecuteMessageType {
	Error = 1,
	Warning = 2,
	Exception = 3,
	Normal = 4
}

export class ExecuteMessageInternal {

	constructor(error?: Error) {
		this.AddException(error);
	}

	public MessageException: string[] = [];
	public StackTracers: string[] = [];

	public AddException(e: Error): void {
		if (e == null)
			return;

		this.MessageException.push(e.message);
		this.StackTracers.push(e.stack);
	}
}

export class ExecuteMessage {
	constructor(type: ExecuteMessageType, message: string, messageInternal?: ExecuteMessageInternal) {
		this.Type = type;
		this.Message = message;
		this.MessageInternal = messageInternal || new ExecuteMessageInternal();
	}

	public Type: ExecuteMessageType;
	public Message: string;
	public MessageInternal: ExecuteMessageInternal;
}

export class Execute {
	constructor(execute?: Execute) {
		this.Merge(execute);
	}

	public HasErro: boolean = false;
	public HasException: boolean = false;
	public HasWarning: boolean = false
	public Messages: ExecuteMessage[] = [];

	public AddMessage(execute: Execute): void;
	public AddMessage(messageType: ExecuteMessageType, message: string): void;
	public AddMessage(erro: Error, message: string): void;
	public AddMessage(info: ExecuteMessageType | Error | Execute, message?: string): void {
		if (typeof info === "number") {
			this.Messages.push(new ExecuteMessage(info, message));
			return;
		}

		if (info instanceof Error) {
			let internal: ExecuteMessageInternal = new ExecuteMessageInternal(info);
			this.Messages.push(new ExecuteMessage(ExecuteMessageType.Error, message, internal));
			return;
		}

		if (info instanceof Execute) {
			this.Merge(info);
			return;
		}	
	}

	private Merge(execute: Execute): void {
		if (!execute)
			return;

		this.Messages = [...this.Messages, ...execute.Messages];
		this.CheckMessages();
	}

	private CheckMessages(): void {
		if (!this.HasWarning)
			this.HasWarning = this.Messages.any((c: ExecuteMessage) => c.Type == ExecuteMessageType.Warning);

		if (!this.HasErro)
			this.HasErro = this.Messages.any((c: ExecuteMessage) => c.Type == ExecuteMessageType.Error || c.Type == ExecuteMessageType.Exception);

		if (!this.HasException)
			this.HasException = this.Messages.any((c: ExecuteMessage) => c.Type == ExecuteMessageType.Exception);
	}
}

export class ExecuteT<T> extends Execute {
	constructor()
	constructor(execute?: Execute, entity?: T);
	constructor(execute?: Execute);
	constructor(entity?: T) {
		super();
		this.Entity = entity;
	}
	public Entity: T;
} 