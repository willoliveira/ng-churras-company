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
	companyOrders: CompanyOrders;
	waitRequest: boolean = true;

	filter = {
		CNPJ: "",
		order: ""
	}

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

	private getOrders(CompanyId: String) {
		console.log(CompanyId);
		this.companyService.getCompanyOrders(CompanyId)
			.subscribe((order: any) => {
				this.companyOrders = order;
				this.waitRequest = false;
			});
	}

	private cancelOrder(OrderId: String) {
		this.companyService.cancelCompanyOrder(OrderId)
			.subscribe((orderId) => {
				let orderIndex = this.companyOrders.Orders.map(order => order.id).indexOf(OrderId);
				this.companyOrders.Orders.splice(orderIndex, 1);
			})
	}

	private emptyOrders(): boolean {
		return this.companyOrders ? this.companyOrders.Orders.length === 0 : true;
	}
}
