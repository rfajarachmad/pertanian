import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnInit,
    ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EquipmentRoutingModule } from '@modules/equipment/equipment-routing.module';
import { Equipment } from '@modules/equipment/models';
import {
    masterCities,
    masterDistricts,
    masterProvinces,
    masterSubDisttricts,
} from '@modules/master/data/master-location-data';
import { Alsintan, City, District, Funding, Province, SubDistrict } from '@modules/master/models';
import { MasterService } from '@modules/master/services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'environments/environment';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { LatLngBounds } from 'ngx-google-places-autocomplete/objects/latLngBounds';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { distinct } from 'rxjs/operators';
import swal from 'sweetalert2';

@Component({
    selector: 'sb-modal-form',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './modal-form.component.html',
    styleUrls: ['modal-form.component.scss'],
    providers: [MasterService],
})
export class ModalFormComponent implements OnInit {
    myForm: FormGroup;
    options: any = {
        componentRestrictions: {
            country: 'id',
        },
        strictBounds: false,
        types: ['geocode'],
    };
    data?: Equipment;
    source = '';
    report_url = '';
    provinces: Province[] = [];
    cities: City[] = [];
    districts: District[] = [];
    sub_districts: SubDistrict[] = [];
    types: Alsintan[] = [];
    fundings: Funding[] = [];
    years: number[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        public masterService: MasterService,
        private cd: ChangeDetectorRef
    ) {
        this.myForm = this.formBuilder.group({
            id: '',
            province: '',
            province_id: '',
            city: '',
            city_id: '',
            district: '',
            district_id: '',
            sub_district: '',
            sub_district_id: '',
            loc_addr_detail: '',
            reg_no: '',
            type: '',
            type_id: '',
            year: '',
            funding: '',
            funding_id: '',
            condition: '',
            owner: '',
            ownership: '',
            land_area: '',
            note: '',
            location: {},
            address_detail: '',
            status: '',
            createdByName: '',
            created_by: '',
            report: '',
            report_name: '',
        });
    }

    ngOnInit() {
        if (this.data) {
            this.myForm.controls.id.setValue(this.data.id);
            this.myForm.controls.province_id.setValue(this.data.province_id);
            this.myForm.controls.city_id.setValue(this.data.city_id);
            this.myForm.controls.district_id.setValue(this.data.district_id);
            this.myForm.controls.sub_district_id.setValue(this.data.sub_district_id);
            this.myForm.controls.loc_addr_detail.setValue(this.data.loc_addr_detail);
            this.myForm.controls.reg_no.setValue(this.data.reg_no);
            this.myForm.controls.type_id.setValue(this.data.type_id);
            this.myForm.controls.year.setValue(this.data.year);
            this.myForm.controls.funding_id.setValue(this.data.funding_id);
            this.myForm.controls.condition.setValue(this.data.condition);
            this.myForm.controls.owner.setValue(this.data.owner);
            this.myForm.controls.ownership.setValue(this.data.ownership);
            this.myForm.controls.land_area.setValue(this.data.land_area);
            this.myForm.controls.note.setValue(this.data.note);
            this.myForm.controls.status.setValue(this.data.status);
            this.myForm.controls.created_by.setValue(this.data.created_by);
            this.myForm.controls.report.setValue(this.data.report);
            this.myForm.controls.report_name.setValue(this.data.report_name);

            this.masterService.getUserNameById(this.data.created_by).subscribe(name => {
                this.myForm.controls.createdByName.setValue(name);
            });
            this.report_url = environment.server + this.data.report_url;
            this._populateCity(this.data.province_id);
            this._populateDistrict(this.data.city_id);
            this._populateSubDistrict(this.data.district_id);
        }
        this._populateProvince();
        this.masterService.getActiveAlsintan().subscribe((result: Alsintan[]) => {
            this.types = result;
        });
        this.masterService.getActiveFundings().subscribe((result: Funding[]) => {
            this.fundings = result;
        });
        this._populateYear();
    }

    _populateProvince() {
        this._showLoading();
        this.masterService.getProvinces().subscribe((result: Province[]) => {
            this.provinces = result;
            swal.close();
        });
    }

    _populateYear() {
        const d = new Date();
        const n = d.getFullYear();
        this.years = [];
        this.years.push(n);
        this.years.push(n - 1);
        this.years.push(n - 2);
        this.years.push(n - 3);
        this.years.push(n - 4);
        this.years.push(n - 5);
    }

    submitForm() {
        this.activeModal.close(this.myForm.value);
    }

    verify() {
        this.myForm.controls.status.setValue('Terverifikasi');
        this.activeModal.close(this.myForm.value);
    }

    reject() {
        this.myForm.controls.status.setValue('Ditolak');
        this.activeModal.close(this.myForm.value);
    }

    close() {
        this.activeModal.dismiss();
    }

    addressChange(address: any) {
        this.myForm.controls.location.setValue({
            province: this._getComponentByType(address, 'administrative_area_level_1'),
            city: this._getComponentByType(address, 'administrative_area_level_2'),
            district: this._getComponentByType(address, 'administrative_area_level_3'),
            sub_district: this._getComponentByType(address, 'administrative_area_level_4'),
            lat: address.geometry.location.lat() + ((Math.random() - 0.5) * 2) / 100,
            lng: address.geometry.location.lng() + ((Math.random() - 0.5) * 2) / 100,
        });
    }

    changeProvince(e: any) {
        console.log(e.target.value);
        this._populateCity(e.target.value);
    }

    changeCity(e: any) {
        console.log(e.target.value);
        this._populateDistrict(e.target.value);
    }

    changeDistrict(e: any) {
        console.log(e.target.value);
        this._populateSubDistrict(e.target.value);
    }

    _populateCity(provId: string) {
        this._showLoading();
        this.masterService.getCities(provId).subscribe((result: City[]) => {
            this.cities = result;
            swal.close();
        });
    }

    _populateDistrict(cityId: string) {
        this._showLoading();
        this.masterService.getDistricts(cityId).subscribe((result: District[]) => {
            this.districts = result;
            swal.close();
        });
    }

    _populateSubDistrict(districtId: string) {
        this._showLoading();
        this.masterService.getSubDistricts(districtId).subscribe((result: SubDistrict[]) => {
            this.sub_districts = result;
            swal.close();
        });
    }

    _getComponentByType(googleAddress: any, inputType: string): string {
        let name = '';
        if (googleAddress.address_components) {
            googleAddress.address_components.forEach((component: any) => {
                component.types.forEach((type: string) => {
                    if (type === inputType) {
                        name = component.long_name;
                        return true;
                    }
                });
            });
        }
        return name;
    }

    _showLoading() {
        swal.fire({
            text: 'Loading..',
            showConfirmButton: false,
            allowOutsideClick: false,
        });
    }

    onFileChange(event: any) {
        this._showLoading();
        const reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.readAsDataURL(file);

            reader.onload = () => {
                this.myForm.patchValue({
                    report: reader.result,
                    report_name: file.name,
                });

                // need to run CD since file load runs outside of zone
                this.cd.markForCheck();
                swal.close();
            };
        }
    }
}
