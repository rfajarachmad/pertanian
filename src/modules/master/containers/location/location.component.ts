import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { LocationModalComponent } from '@modules/master/components/location-modal/location-modal.component';
import { LocationArea } from '@modules/master/models';
import { MasterService } from '@modules/master/services';
import { NgbActiveModal, NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import swal from 'sweetalert2';

@Component({
    selector: 'sb-location',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './location.component.html',
    styleUrls: ['location.component.scss'],
    providers: [NgbModalConfig, NgbModal, NgbActiveModal],
})
export class LocationComponent implements OnInit {
    items: LocationArea[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private config: NgbModalConfig,
        private modalService: NgbModal,
        public masterService: MasterService
    ) {
        config.backdrop = 'static';
        config.keyboard = false;
        config.size = 'md';
    }
    ngOnInit() {
        this._populateItems();
    }

    open() {
        const modalRef = this.modalService.open(LocationModalComponent, { centered: true });
        modalRef.result
            .then((result: LocationArea) => {
                console.log(result);
                this._showLoading();
                this.masterService.saveLocation(result).subscribe(() => {
                    this._populateItems();
                    swal.close();
                });
            })
            .catch(error => {
                console.log(error);
            });
    }

    detail(item: LocationArea) {
        const modalRef = this.modalService.open(LocationModalComponent, { centered: true });
        (modalRef.componentInstance as LocationModalComponent).data = item;
        modalRef.result
            .then((result: LocationArea) => {
                console.log(result);
                this._showLoading();
                this.masterService.saveLocation(result).subscribe(() => {
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
        this.masterService.getLocation().subscribe(alsintans => {
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
