export class Guid {
	public static NewGuid(): string {
		return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
			// tslint:disable:one-variable-per-declaration
			// tslint:disable:no-bitwise
			const r = Math.random() * 16 | 0, v = c === "x" ? r : (r & 0x3 | 0x8);
			// tslint:enable:one-variable-per-declaration
			// tslint:enable:no-bitwise
			return v.toString(16);
		});
	}

	public static Empty(): string {
		return "00000000-0000-0000-0000-000000000000";
	}
}