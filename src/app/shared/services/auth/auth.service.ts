import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {
	
	constructor() { }
	
	
	login(user: User): Observable<any> {
		return Observable.of(user);
	}
}
