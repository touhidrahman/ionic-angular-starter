import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HideDirective } from './hide.directive';
import { LetDirective } from './let.directive';
import { OnClickGoBackDirective } from './on-click-go-back.directive';
import { RepeatDirective } from './repeat.directive';

@NgModule({
  imports: [CommonModule],
  declarations: [HideDirective, LetDirective, RepeatDirective, OnClickGoBackDirective],
  exports: [HideDirective, LetDirective, RepeatDirective, OnClickGoBackDirective],
})
export class CoreDirectivesModule {}
