import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'indexOf',
})
export class IndexOfPipe implements PipeTransform {
  transform(items: any[], item: any): any {
    return items.indexOf(item);
  }
}
