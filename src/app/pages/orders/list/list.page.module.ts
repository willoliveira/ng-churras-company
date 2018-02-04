import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListOrdersComponent } from './list.page';
import { FilterPipe } from '../../../shared/pipes/filter.pipe';

@NgModule({
  declarations: [
    ListOrdersComponent,
    FilterPipe
  ],
  exports: [
    ListOrdersComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [
    
  ]
})
export class ListOrdersPageModule { }
