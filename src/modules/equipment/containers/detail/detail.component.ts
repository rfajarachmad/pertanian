import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-detail',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './detail.component.html',
    styleUrls: ['detail.component.scss'],
})
export class DetailComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
