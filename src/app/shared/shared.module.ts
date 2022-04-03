import { NgModule } from '@angular/core';
import { CoreModule } from '@core/core.module';
import { FormErrorComponent } from './components/form-error/form-error.component';

@NgModule({
  declarations: [FormErrorComponent],
  imports: [CoreModule],
  exports: [FormErrorComponent],
})
export class SharedModule {}
