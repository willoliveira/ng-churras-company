import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { CompanyService } from '../../../shared/services/company/company.service';
import { Company } from '../../../shared/models/company.model';
import { NavbarService } from '../../../shared/components/navbar/navbar.service';
import { conformToMask } from 'angular2-text-mask';
import { validateCNPJ } from '../../../shared/services/cnpj.validator';
import { ElMessageService } from 'element-angular';
import { Subscription } from 'rxjs/Subscription';

@Component({
	selector: 'app-new',
	templateUrl: './new.page.html',
	styleUrls: ['./new.page.scss']
})
export class NewCompanyComponent implements OnInit {

	sub: Subscription;
	waitRequest = true;
	CompanyId;
	inEdit = false;
	companyForm: FormGroup;
	maskCNPJ = [/\d/,/\d/,'.',/\d/,/\d/,/\d/,'.',/\d/,/\d/,/\d/,'/', /\d/,/\d/,/\d/,/\d/,'-', /\d/,/\d/];

	constructor(
		private companyService: CompanyService,
		private route: ActivatedRoute,
		private router: Router,
		private fb: FormBuilder,
		private navbarService: NavbarService,
		private messageService: ElMessageService
	) {
	} 
	
	
	ngOnInit() {
		this.navbarService.show();
		this.sub = this.route.queryParams.subscribe(params => {
			const { CompanyId } = params;
			if (CompanyId) {
				this.companyService.getCompany(CompanyId)
				.subscribe(data => {
						this.inEdit = true;
						this.CompanyId = CompanyId
						this.createForm(data);
						this.waitRequest = false;
					})
			} else {
				this.waitRequest = false;
				this.createForm({});
			}
		});
	}

	createForm(data?) {
		this.companyForm = this.fb.group({
			nameFantasy: [data.nameFantasy || '', Validators.compose([Validators.required, this.RequiredValidator])],
			socialName: [data.socialName || '', Validators.compose([Validators.required, this.RequiredValidator])],
			about: [data.about || '', Validators.compose([Validators.required, this.RequiredValidator])],
			CNPJ: [data.CNPJ || '', Validators.compose([Validators.required, this.RequiredValidator, this.CNPJValidator])]
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

	onSuccess(respose) {
		let msg = this.inEdit ? "Empresa atualizada com successo!" : "Empresa cadastrada com successo!";
		this.messageService.success(msg);
		setTimeout(() => {
			this.router.navigate(["/dashboard"]);
		}, 500);
	}
	
	onCreate(company: Company) {
		if (this.companyForm.valid) {
			
			if (this.inEdit) {
				this.companyService.updateCompany(this.CompanyId, company).subscribe(this.onSuccess.bind(this));
			} else {
				this.companyService.createCompany(company).subscribe(this.onSuccess.bind(this));
			}
		} else {
			Object.keys(this.companyForm.controls).forEach(field => {
				const control = this.companyForm.get(field);
				control.markAsTouched({ onlySelf: true });
				control.markAsDirty({ onlySelf: true });
			});
		}
	}
}
