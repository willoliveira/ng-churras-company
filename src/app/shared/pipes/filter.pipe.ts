import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter'
})
export class FilterPipe implements PipeTransform {
	
	transform(value: any, args?: any): any {
		console.log(value, args)
		return value;
	}
	
}
