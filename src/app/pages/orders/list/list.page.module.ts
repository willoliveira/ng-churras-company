import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOrdersComponent } from './list.page';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';

import { ElModule } from 'element-angular';

@NgModule({
  declarations: [
    ListOrdersComponent,
    FilterPipe
  ],
  exports: [
    ListOrdersComponent
  ],
  imports: [
    CommonModule, ElModule
  ],
  providers: [
    
  ]
})
export class ListOrdersPageModule { }
