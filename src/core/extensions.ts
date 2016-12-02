export class ArrayUtil {
	public static Any<T>(array: Array<T>, arg: { (arg: any): boolean }): boolean {
		for (let item in array) {
			if (arg(item)) {
				return true;
			}
		}

		return false;
	}
}