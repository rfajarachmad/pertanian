import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
    selector: 'sb-submission-table',
    changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './submission-table.component.html',
    styleUrls: ['submission-table.component.scss'],
})
export class SubmissionTableComponent implements OnInit {
    constructor() {}
    ngOnInit() {}
}
