import { Pipe, PipeTransform } from '@angular/core'
import * as dayjs from 'dayjs'

@Pipe({
    name: 'epochToDate',
})
export class EpochToDatePipe implements PipeTransform {
    transform(value?: number): string {
        return dayjs(value).format('MMMM D, YYYY')
    }
}
