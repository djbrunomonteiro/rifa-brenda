import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'secret',
  standalone: true
})
export class SecretPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) {
      return '';
    }
    return '**' + value.substring(value.length - 2);
  }
}
