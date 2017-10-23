import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
	name: "orderBy"
})
export class OrderByPipe implements PipeTransform {
	public transform(array: any[], field: string): any {
		if (!array || array.length <= 0) {
			return array;
		}

		return array.sort((a: any, b: any) => a[field].localeCompare(b[field]));
	}
}