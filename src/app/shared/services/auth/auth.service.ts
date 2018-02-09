import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../models/user.model';

import { Observable } from 'rxjs/Observable'
import { tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { api_url } from '../Config';


@Injectable()
export class AuthService {
	
	constructor(private http: HttpClient) { }
	
	
	signin(user: User): Observable<any> {
		return this.http
			.post(`${api_url}/v1/auth/signin`, user)
			.pipe(
				tap(({ content }) => { localStorage.setItem('token', content.token); })
			)
	}

	signup(user: User): Observable<any> {
		return this.http.post(`${api_url}/v1/auth/signup`, user);
	}
}
