import { CommonModule } from '@angular/common'
import { NgModule } from '@angular/core'
import { SpreadIntoArrayPipe } from '@core/pipes/spread-into-array.pipe'
import { BytesPipe } from './bytes.pipe'
import { CeilingPipe } from './ceiling.pipe'
import { Nl2brPipe } from './nl2br.pipe'
import { SafeUrlPipe } from './safe-url.pipe'
import { UniquePipe } from './unique.pipe'
import { ValueInPipe } from './value-in.pipe';
import { EpochToDatePipe } from './epoch-to-date.pipe';
import { ProfilePhotoPipe } from './profile-photo.pipe'

@NgModule({
    declarations: [SafeUrlPipe, SpreadIntoArrayPipe, CeilingPipe, Nl2brPipe, UniquePipe, ValueInPipe, BytesPipe, EpochToDatePipe, ProfilePhotoPipe],
    exports: [SafeUrlPipe, SpreadIntoArrayPipe, CeilingPipe, Nl2brPipe, UniquePipe, ValueInPipe, BytesPipe, EpochToDatePipe, ProfilePhotoPipe],
    imports: [CommonModule],
})
export class PipesModule {}
