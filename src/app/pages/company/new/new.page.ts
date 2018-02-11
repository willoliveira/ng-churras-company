import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { CompanyService } from '../../../shared/services/company/company.service';
import { Company } from '../../../shared/models/company.model';
import { NavbarService } from '../../../shared/components/navbar/navbar.service';
import { conformToMask } from 'angular2-text-mask';
import { validateCNPJ } from '../../../shared/services/cnpj.validator';
import { ElMessageService } from 'element-angular';

@Component({
	selector: 'app-new',
	templateUrl: './new.page.html',
	styleUrls: ['./new.page.scss']
})
export class NewCompanyComponent implements OnInit {
	public mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]
	
	constructor(
		private companyService: CompanyService,
		private router: Router,
		private fb: FormBuilder,
		private navbarService: NavbarService,
		private messageService: ElMessageService
	) {
	} 
	
	companyForm: FormGroup;
	maskCNPJ = [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/', /\d/,/\d/,/\d/,/\d/,'-', /\d/,/\d/];
	
	ngOnInit() {
		this.navbarService.show();
		this.companyForm = this.fb.group({
			nameFantasy: ['', Validators.compose([Validators.required, this.RequiredValidator])],
			socialName: ['', Validators.compose([Validators.required, this.RequiredValidator])],
			about: ['', Validators.compose([Validators.required, this.RequiredValidator])],
			CNPJ: ['', Validators.compose([Validators.required, this.RequiredValidator, this.CNPJValidator])]
		});
	}
	
	statusCtrl(item: string): string {
		if (!this.companyForm.controls[item]) return
		const control: AbstractControl = this.companyForm.controls[item]
		return control.dirty && control.hasError('status') ? control.errors.status : ''
	}
	
	messageCtrl(item: string): string {
		if (!this.companyForm.controls[item]) return
		const control: AbstractControl = this.companyForm.controls[item]
		return control.dirty && control.hasError('message') ? control.errors.message : ''
	}
	
	RequiredValidator(control: FormControl) {
		if (control.dirty && (typeof control.value === 'undefined' || control.value === "")) {
			return { status: 'error', message: 'Valor é requirido' };
		}
		return {  };
	}
	
	CNPJValidator(control: FormControl) {
		if (control.dirty && !validateCNPJ(control.value)) {
			return { status: 'error', message: 'CNPJ Inválido' };
		}
		return {  };
	}

	changeMask(value, mask) {
		let valWithoutMask = value.replace(/[^a-zA-Z0-9]/g, '').trim();
		let maskValue = conformToMask(valWithoutMask, mask, {someCharsRejected: true}).conformedValue;
		let maskFormated = maskValue.indexOf("_") === -1 ? maskValue : maskValue.substring(0, maskValue.indexOf("_"));
		
		this.companyForm.patchValue({
			'CNPJ': maskFormated
		})
	}
	
	onCreate(company: Company) {
		if (this.companyForm.valid) {
			this.companyService.createCompany(company).subscribe(respose => {
				this.messageService.success("Empresa cadastrada com successo!");
				setTimeout(() => {
					this.router.navigate(["/dashboard"]);
				}, 500);
			});
		} else {
			Object.keys(this.companyForm.controls).forEach(field => {
				const control = this.companyForm.get(field);
				control.markAsTouched({ onlySelf: true });
				control.markAsDirty({ onlySelf: true });
			});
		}
	}
}
