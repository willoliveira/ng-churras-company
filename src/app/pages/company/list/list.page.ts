import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../shared/services/company/company.service';
import { NavbarService } from '../../../shared/components/navbar/navbar.service';
import { Router, NavigationExtras } from '@angular/router';

@Component({
	selector: 'list-companies',
	templateUrl: './list.page.html',
	styleUrls: ['./list.page.scss']
})
export class ListCompaniesComponent implements OnInit {
	
	listCompanies = [];

	constructor(
		private companyService: CompanyService,
		private navbarService: NavbarService,
		private route: Router
	) { }
	
	ngOnInit() {
		this.navbarService.show();
		this.getCompanies();
	}

	getCompanies() {
		this.companyService.getCompanies()
			.subscribe(companies => {
				this.listCompanies = companies;
			})
	}
}
