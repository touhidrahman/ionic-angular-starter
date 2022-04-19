import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core'

@Component({
    selector: 'app-header-one',
    templateUrl: './header-one.component.html',
    styleUrls: ['./header-one.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderOneComponent implements OnInit {
    @Input() showBackButton = false

    ngOnInit(): void {}
}
