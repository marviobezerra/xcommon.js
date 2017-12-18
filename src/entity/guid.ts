export class Guid {
	public static NewGuid(): string {
		let result: string;
		let i: string;
		let j: number;

		result = "";
		for (j = 0; j < 32; j++) {
			if (j === 8 || j === 12 || j === 16 || j === 20) {
				result = result + "-";
			}

			i = Math.floor(Math.random() * 16).toString(16).toUpperCase();
			result = result + i;
		}
		return result;
	}

	public static Empty(): string {
		return "00000000-0000-0000-0000-000000000000";
	}
}