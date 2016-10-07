export enum ExecuteMessageType {
	Error = 1,
	Warning = 2,
	Exception = 3,
	Normal = 4
}

export class ExecuteMessageInternal {

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
	public Type: ExecuteMessageType;
	public Message: string;
	public MessageInternal: ExecuteMessageInternal;
}

export class Execute {
	public HasErro: boolean = false;
	public HasException: boolean = false;
	public HasWarning: boolean = false
	public Messages: ExecuteMessage[] = [];

	public AddMessage(execute: Execute): void;
	public AddMessage(type: ExecuteMessageType, message: string): void;
	public AddMessage(erro: Error, message: string): void;
	public AddMessage(type: ExecuteMessageType | Error | Execute, message?: string): void {
	}

	private CheckMessage(): void {
		if (!this.HasWarning)
			this.HasWarning = this.Messages.any((c: ExecuteMessage) => c.Type == ExecuteMessageType.Warning);

		if (!this.HasErro)
			this.HasErro = this.Messages.any((c: ExecuteMessage) => c.Type == ExecuteMessageType.Error || c.Type == ExecuteMessageType.Exception);

		if (!this.HasException)
			this.HasException = this.Messages.any((c: ExecuteMessage) => c.Type == ExecuteMessageType.Exception);
	}
}