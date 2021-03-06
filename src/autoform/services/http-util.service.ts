import { Injectable } from '@angular/core';
import { URLSearchParams } from '@angular/http';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class HttpUtilService {

	public apiBaseAddress: string = '/api/';

	constructor(private http: HttpClient) {
	}

	public buidlUrl(...url: string[]): string {
		const result: string = [this.apiBaseAddress, ...url]
			.join('/')
			.replace(new RegExp('//', 'gm'), '/');

		return result;
	}

	public buildGetParams(entity: any): HttpParams {

		let result = new HttpParams();

		if (!entity) {
			return result;
		}

		for (const property in entity) {
			if (entity.hasOwnProperty(property)) {
				const value = entity[property];
				if (!value) {
					continue;
				}

				if (value === Object(value)) {
					result = result.set(property, JSON.stringify(value));
				} else {
					result = result.set(property, value);
				}
			}
		}

		return result;
	}
}
