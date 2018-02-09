import { Injectable, TypeProvider, ClassProvider, FactoryProvider, ExistingProvider, ValueProvider } from '@angular/core';
import { HttpClient, HttpInterceptor, HttpRequest, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { User } from '../../models/user.model';

import { Observable } from 'rxjs/Observable'
import { tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';
import { api_url, auth_ignore_urls } from '../Config';

@Injectable()
export class InjectToken implements HttpInterceptor {
	
	constructor(private http: HttpClient) { }

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        const isIgnoreUrl = auth_ignore_urls.find((url: String) => {
            console.log(url, request.url.toString());
            return !!url.match(request.url.toString())
        });

        if (isIgnoreUrl) {
            return next.handle(request);
        }

        return next.handle(request.clone({
            setHeaders: {
                Authorization: `JWT ${localStorage.getItem('token')}`
            }
        }));
    }
}

export const InjectTokenProvider: ClassProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: InjectToken,
    multi: true
}
