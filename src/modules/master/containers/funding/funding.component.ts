import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FundingModalComponent } from '@modules/master/components';
import { Funding } from '@modules/master/models';
import { MasterService } from '@modules/master/services';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
    selector: 'sb-funding',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './funding.component.html',
    styleUrls: ['funding.component.scss'],
    providers: [NgbModalConfig, NgbModal, NgbActiveModal],
})
export class FundingComponent implements OnInit {
    items: Funding[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private config: NgbModalConfig,
        private modalService: NgbModal,
        public masterService: MasterService
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
        config.size = 'lg';
    }
    ngOnInit() {
        this._populateItems();
    }

    open() {
        const modalRef = this.modalService.open(FundingModalComponent, { centered: true });
        modalRef.result
            .then((result: Funding) => {
                console.log(result);
                this._showLoading();
                this.masterService.saveFunding(result).subscribe(() => {
                    this._populateItems();
                    swal.close();
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    detail(item: Funding) {
        const modalRef = this.modalService.open(FundingModalComponent, { centered: true });
        (modalRef.componentInstance as FundingModalComponent).data = item;
        modalRef.result
            .then((result: Funding) => {
                console.log(result);
                this._showLoading();
                this.masterService.saveFunding(result).subscribe(() => {
                    this._populateItems();
                    swal.close();
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    _populateItems() {
        this._showLoading();
        this.masterService.getFundings().subscribe(alsintans => {
            this.items = alsintans;
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
