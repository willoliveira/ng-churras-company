import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyService } from '../../shared/services/company/company.service';
import { CompanyOrders } from '../../shared/models/company-orders';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.page.html',
	styleUrls: ['./dashboard.page.scss']
})
export class DashboardComponent implements OnInit {
	
	companyOrders: Array<CompanyOrders> = [];
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
			.getCompanyOrders()
			.subscribe(response => {
				if (response) {
					this.companyOrders = response;
				}
			});
	}

	// navToOrders() {
	// 	this.router.navigate(["/orders/list"],)
	// }
}
