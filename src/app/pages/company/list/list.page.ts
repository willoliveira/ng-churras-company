import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../../../shared/services/company/company.service';

@Component({
	selector: 'list-companies',
	templateUrl: './list.page.html',
	styleUrls: ['./list.page.scss']
})
export class ListCompaniesComponent implements OnInit {
	
	listCompanies = [];

	constructor(private companyService: CompanyService) { }
	
	ngOnInit() {
		this.getCompanies();
	}
	
	getCompanies() {
		this.companyService.getCompanies()
			.subscribe(companies => {
				this.listCompanies = companies;
			})
	}
}
