import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';


import { CompanyService } from '../../../shared/services/company/company.service';
import { Company } from '../../../shared/models/company.model';

@Component({
	selector: 'app-new',
	templateUrl: './new.page.html',
	styleUrls: ['./new.page.scss']
})
export class NewCompanyComponent implements OnInit {
	
	constructor(
		private companyService: CompanyService,
		private router: Router,
		private fb: FormBuilder,
	) {
	} 

	companyForm: FormGroup;
	
	ngOnInit() {
		this.companyForm = this.fb.group({
			nameFantasy: ['', Validators.required],
			cnpj: ['', Validators.required]
		});
	}

	onCreate(company: Company) {
		if (this.companyForm.valid) {
			this.companyService.createCompany(company).subscribe(respose => {
				this.router.navigate(["/dashboard"]);
			});
		} else {
			Object.keys(this.companyForm.controls).forEach(field => {
				const control = this.companyForm.get(field);
				control.markAsTouched({ onlySelf: true });
			});
		}
	}
}
