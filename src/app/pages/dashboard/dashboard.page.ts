import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../shared/services/company/company.service';
import { Subscription } from 'rxjs/Subscription';
import { CompanyOrdersCount } from '../../shared/models/company-orders-count.';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss']
})
export class DashboardComponent implements OnInit {
	
	companyOrders: Array<CompanyOrdersCount> = [];
	sub: Subscription;

	constructor(
		private companyService: CompanyService,
		private router: Router
	) {

	}
	
	ngOnInit() {
		this.getCompaniesOrders();
	}
	
	getCompaniesOrders() {
		this.companyService
			.getCompanyOrdersCount()
			.subscribe(response => {
				if (response) {
					this.companyOrders = response;
				}
			});
	}
}
