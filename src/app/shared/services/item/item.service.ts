import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api_url } from '../Config';
import { map } from 'rxjs/operators';

@Injectable()
export class ItemService {
	
	constructor(private http: HttpClient) { }
	
	getItems() {
		return this.http.get(`${api_url}/v1/item`)
			.pipe(
				map(respose => respose['content'])
			);
	}
}
