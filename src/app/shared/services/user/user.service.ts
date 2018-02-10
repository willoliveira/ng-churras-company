import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { api_url } from '../Config';
import { User } from '../../models/user.model';
import { map } from 'rxjs/operators';

@Injectable()
export class UserService {
	
	constructor(private http: HttpClient) { }
	
	updateUser(user: User) {
		return this.http.put(`${api_url}/v1/user`, user)
			.pipe(
				map(responde => responde["content"])
			);
	}
}
