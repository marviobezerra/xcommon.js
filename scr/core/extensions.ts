export class ArrayUtil {
	public static ArrayAny<T>(array: Array<T>, arg: { (arg: any): boolean }): boolean {
		for (let item in array) {
			if (arg(item)) {
				return true;
			}
		}

		return false;
	}
}

declare global {
    interface Array<T> {
        any(arg: { (arg: T): boolean }): boolean;
    }
}

Array.prototype.any = function <T>(arg: { (arg: any): boolean }): boolean {
	return ArrayUtil.ArrayAny<T>(this, arg);
}