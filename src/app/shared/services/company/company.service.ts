import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Company } from '../../models/company.model';
import { CompanyOrders } from '../../models/company-orders';

import { map, tap } from 'rxjs/operators';
import { CompanyOrdersCount } from '../../models/company-orders-count.';
import { api_url } from '../Config';

@Injectable()
export class CompanyService {
	
	constructor(private http: HttpClient) { }
	
	/** 
	 * assets/mocks/company-orders-count.mock.json
	*/
	getCompanyOrdersCount(): Observable<Array<CompanyOrdersCount>> {
		return this.http
			.get<Array<CompanyOrdersCount>>(`${api_url}/v1/order/companies`)
			.pipe(
				map(response => {
					return response["content"].map((companyOrder) => ({
						Company: companyOrder.Company,
						OrdersLength: companyOrder.Orders.length
					}))
				})
			);
	}

	getCompanyOrders(CompanyId): Observable<Array<CompanyOrders>|CompanyOrders> {
		const url = CompanyId ? `company/${CompanyId}/order` : 'order/companies';
		return this.http
			.get<Array<CompanyOrders>>(`${api_url}/v1/${url}`)
			.pipe(
				map(response => response["content"])
			);
	}

	postCompanyOrder(CompanyId, data) {
		return this.http
			.post(`${api_url}/v1/company/${CompanyId}/order`, data)
			.pipe(
				map(response => response["content"])
			);
	}

	cancelCompanyOrder(OrderId): Observable<String> {
		return Observable.of(OrderId);
	}

	getCompanies(): Observable<Array<Company>> {
		return this.http
			.get<Array<Company>>(`${api_url}/v1/company`)
			.pipe(
				map(response => response["content"])
			);
	}

	createCompany(company: Company): Observable<Company>  {
		return this.http
			.post<Company>(`${api_url}/v1/company`, company)
			.pipe(
				map(response => response["content"])
			);
	}

	editCompany(company: Company): Observable<Company>  {
		return this.http
			.put<Company>(`${api_url}/v1/company/${company._id}`, company)
			.pipe(
				map(response => response["content"])
			);
	}

	deleteCompany(companyId) {
		return this.http
			.delete<Company>(`${api_url}/v1/company/${companyId}`,)
			.pipe(
				map(response => companyId)
			);
	}
}
