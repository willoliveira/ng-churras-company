import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../shared/services/company/company.service';
import { ItemService } from '../../../shared/services/item/item.service';
import { Company } from '../../../shared/models/company.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'new-order',
	templateUrl: './new.page.html',
	styleUrls: ['./new.page.scss']
})
export class NewOrderComponent implements OnInit {

	sub: Subscription;
	
	waitRequest = true;
	
	listCompanies: Array<Company> = [];
	listProducts = [];

	listItems = [];

	selectedCompany: Company;
	selectedItem;
	amount;

	constructor(
		private route: ActivatedRoute,
		private companyService: CompanyService,
		private itemService: ItemService
	) { }

	ngOnInit() {
		this.sub = this.route.queryParams.subscribe(params => {
			let CompanyId;
			if (params.CompanyId) {
				CompanyId = params.CompanyId;
			}
			this.getCompanies(CompanyId);
			this.getProducts()
		});
	}

	ngOnDestroy() {
		this.sub.unsubscribe();
	}
	
	getCompanies(CompanyId) {
		this.companyService.getCompanies().subscribe((companies) => {
			this.listCompanies = companies;
			if (CompanyId) {
				this.selectedCompany = companies.find(company => company._id === CompanyId);
			}
		});
	};
	
	getProducts() {
		this.itemService.getItems().subscribe((products) => {
			this.listProducts = products
		});
	}

	addItem() {	
		this.listItems.push({
			"_itemId": this.selectedItem._id,
			"name": this.selectedItem.name,
			'amount': this.amount
		});;
	}
	
	onSubmit() {
		this.companyService.postCompanyOrder(this.selectedCompany._id, this.listItems)
			.subscribe((order) => {
				console.log(order);
			});
	}
}
