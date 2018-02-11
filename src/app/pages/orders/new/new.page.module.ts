import { NgModule } from '@angular/core';
import { NewOrderComponent } from './new.page';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemService } from '../../../shared/services/item/item.service';

import { ElModule } from 'element-angular';

@NgModule({
	declarations: [
		NewOrderComponent
	],
	exports: [
		NewOrderComponent
	],
	imports: [
		CommonModule, FormsModule, ElModule
	],
	providers: [ItemService]
})
export class NewOrderPageModule { }
