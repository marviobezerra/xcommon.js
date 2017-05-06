import { Injectable } from '@angular/core';
import { Map } from '../../core';

@Injectable()
export class IconService {
	constructor() {
	}

	public Shapes: Map<string> = {};
}