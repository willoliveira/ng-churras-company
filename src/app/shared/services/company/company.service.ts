import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '../../models/company.model';
import { CompanyOrders } from '../../models/company-orders';

import { map } from 'rxjs/operators';

@Injectable()
export class CompanyService {
	
	constructor(private http: HttpClient) { }
	
	getCompanyOrdersCount(): Observable<Array<CompanyOrders>> {
		return this.http
			.get<Array<CompanyOrders>>("./assets/mocks/company-orders-count.mock.json")
			.pipe(
				map(response => response["content"])
			);
	}

	getCompanyOrders(CompanyId): Observable<Array<CompanyOrders>|CompanyOrders> {
		return this.http
			.get<Array<CompanyOrders>>("./assets/mocks/company-orders.mock.json")
			.pipe(
				map(response => response["content"])
			);
	}

	cancelCompanyOrder(OrderId): Observable<String> {
		return Observable.of(OrderId);
	}

	getCompanies(): Observable<Array<Company>> {
		return this.http
			.get<Array<Company>>("./assets/mocks/company.mock.json")
			.pipe(
				map(response => response["content"])
			);
	}

	createCompany() {

	}

	editCompany() {

	}

	deleteCompany() {

	}
}
