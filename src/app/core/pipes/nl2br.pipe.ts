import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nl2br',
})
export class Nl2brPipe implements PipeTransform {
    transform(value: string | null | undefined): string {
        return value?.replace(/\n/g, '<br/>') ?? '';
    }
}
