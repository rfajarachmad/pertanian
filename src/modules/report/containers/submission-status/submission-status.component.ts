import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    OnInit,
    ViewChild,
} from '@angular/core';
import { Equipment } from '@modules/equipment/models';
import { EquipmentService } from '@modules/equipment/services';
import { Chart } from 'chart.js';
import swal from 'sweetalert2';

@Component({
    selector: 'sb-submission-status',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './submission-status.component.html',
    styleUrls: ['submission-status.component.scss'],
})
export class SubmissionStatusComponent implements OnInit, AfterViewInit {
    @ViewChild('myPieChart') myPieChart!: ElementRef<HTMLCanvasElement>;
    chart!: Chart;
    items: Equipment[] = [];

    selectedStatus = 'Pilih Status';

    constructor(private equipmentService: EquipmentService) {}
    ngOnInit() {}

    ngAfterViewInit() {
        // this.equipmentService.getSubmissionStatusPct().subscribe((result: any) => {
        //     this.chart = new Chart(this.myPieChart.nativeElement, {
        //         type: 'pie',
        //         data: {
        //             labels: ['Menunggu Verifikasi', 'Ditolak', 'Terverifikasi'],
        //             datasets: [
        //                 {
        //                     data: [result.waiting, result.rejected, result.verified],
        //                     backgroundColor: ['#007bff', '#ffc107', '#28a745'],
        //                 },
        //             ],
        //         },
        //     });
        // });
    }

    search(status: string) {
        console.log(status);
        this._showLoading();
        this.selectedStatus = status;
        this.equipmentService.findByStatus(status).subscribe((result: Equipment[]) => {
            this.items = result;
            swal.close();
        });
    }

    _showLoading() {
        swal.fire({
            text: 'Loading..',
            showConfirmButton: false,
            allowOutsideClick: false,
        });
    }
}
