import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { CompanyService } from '../../../shared/services/company/company.service';
import { CompanyOrders } from '../../../shared/models/company-orders';

@Component({
	selector: 'list-orders',
	templateUrl: './list.page.html',
	styleUrls: ['./list.page.scss']
})
export class ListOrdersComponent implements OnInit, OnDestroy {

	sub: Subscription;
	companyOrder: CompanyOrders;

	constructor(
		private route: ActivatedRoute, 
		private router: Router,
		private companyService: CompanyService
	) { }

	ngOnInit() {
		this.sub = this.route.queryParams.subscribe(params => {
			let CompanyId;
			if (params.CompanyId) {
				CompanyId = params.CompanyId;
			}
			this.getOrders(CompanyId);
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}

	getOrders(CompanyId: String) {
		this.companyService.getCompanyOrders(CompanyId)
			.subscribe((order: CompanyOrders) => {
				this.companyOrder = order;
			});
	}
}
