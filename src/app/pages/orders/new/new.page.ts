import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from '../../../shared/services/company/company.service';
import { ItemService } from '../../../shared/services/item/item.service';
import { Company } from '../../../shared/models/company.model';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ElMessageService, ElChildModules } from 'element-angular'
import { NavbarService } from '../../../shared/components/navbar/navbar.service';

@Component({
	selector: 'new-order',
	templateUrl: './new.page.html',
	styleUrls: ['./new.page.scss']
})
export class NewOrderComponent implements OnInit {

	@ViewChild('selectProduct') selectProduct;

	newOrderForm: FormGroup;

	sub: Subscription;
	
	waitRequest = true;
	
	listCompanies: Array<Company> = [];
	listProducts = [];
	
	listItems = [];
	
	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private companyService: CompanyService,
		private itemService: ItemService,
		private fb: FormBuilder,
		private messageService: ElMessageService,
		private navbarService: NavbarService
	) { }
	
	ngOnInit() {
		this.navbarService.show();
		this.sub = this.route.queryParams.subscribe(params => {
			let CompanyId;
			if (params.CompanyId) {
				CompanyId = params.CompanyId;
			}
			
			this.createForm();
			
			this.getCompanies(CompanyId);
			this.getProducts();
		});
	}
	
	ngOnDestroy() {
		this.sub.unsubscribe();
	}
	
	createForm(): any {
		this.newOrderForm = this.fb.group({
			selectedProduct: ['', Validators.required],
			selectedCompany: ['', Validators.required],
			amount: [1, Validators.required]
		});
	}

	getCompanies(CompanyId) {
		this.companyService.getCompanies().subscribe((companies) => {
			this.listCompanies = companies;
			if (CompanyId) {
				this.newOrderForm.patchValue({
					selectedCompany: companies.find(company => company._id === CompanyId)
				});
			}
		});
	};
	
	getProducts() {
		this.itemService.getItems().subscribe((products) => {
			this.listProducts = products
		});
	}

	addItem(formValue) {
		if (this.newOrderForm.valid) {
			this.listItems.push({
				"_itemId": formValue.selectedProduct._id,
				'amount': formValue.amount
			});
			
			this.newOrderForm.patchValue({
				selectedProduct: null,
				amount: 1
			})
			this.selectProduct.selectedLabel = "";
			this.selectProduct.model = null;
		}
	}

	removeItem(index) {
		this.listItems.splice(index, 1);
	}
	
	getPropProduct(model, prop) {
		return this.listProducts.find(product => product._id === model._itemId)[prop];
	}
	
	
	onSubmit(formValue) {
		const items = this.listItems.map(item => ({
			_itemId: item._itemId,
			amount: item.amount
		}));
		const { _id: CompanyId } = this.newOrderForm.value.selectedCompany;

		this.companyService.postCompanyOrder(this.newOrderForm.value.selectedCompany._id, items)
			.subscribe((order) => {
				this.listItems = [];
				this.messageService.success("Pedido feito com successo!");
				
				this.router.navigate(['/order/list'], {
					queryParams: { CompanyId }
				});
			}, () => {
				this.messageService.error("Erro ao realizar pedido");
			});
	}
}
