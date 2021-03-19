import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import {
    masterCities,
    masterDistricts,
    masterProvinces,
    masterSubDisttricts,
} from '@modules/master/data/master-location-data';
import { City, District, LocationArea, Province, SubDistrict } from '@modules/master/models';
import { MasterService } from '@modules/master/services';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { distinct } from 'rxjs/operators';

@Component({
    selector: 'sb-location-modal',
    changeDetection: ChangeDetectionStrategy.Default,
    templateUrl: './location-modal.component.html',
    styleUrls: ['location-modal.component.scss'],
})
export class LocationModalComponent implements OnInit {
    myForm: FormGroup;
    data?: LocationArea;
    provinces: Province[] = [];
    cities: City[] = [];
    districts: District[] = [];
    sub_districts: SubDistrict[] = [];

    constructor(
        public activeModal: NgbActiveModal,
        private formBuilder: FormBuilder,
        private masterService: MasterService
    ) {
        this.myForm = this.formBuilder.group({
            id: '',
            province_id: '',
            province: '',
            city_id: '',
            city: '',
            district_id: '',
            district: '',
            sub_district_id: '',
            sub_district: '',
            land_area: '',
            year: '',
        });
    }
    ngOnInit() {
        if (this.data) {
            this.myForm.controls.id.setValue(this.data.id);
            this.myForm.controls.province_id.setValue(this.data.province_id);
            this.myForm.controls.city_id.setValue(this.data.city_id);
            this.myForm.controls.district_id.setValue(this.data.district_id);
            this.myForm.controls.sub_district_id.setValue(this.data.sub_district_id);
            this.myForm.controls.land_area.setValue(this.data.land_area);
            this.myForm.controls.year.setValue(this.data.year);
            this._populateCity(this.data.province_id);
            this._populateDistrict(this.data.city_id);
            this._populateSubDistrict(this.data.district_id);
        }
        this.masterService.getProvinces().subscribe(result => {
            this.provinces = result;
        });
    }
    submitForm() {
        this.activeModal.close(this.myForm.value);
    }

    close() {
        this.activeModal.dismiss();
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
        this.masterService.getCities(provId).subscribe(result => {
            this.cities = result;
        });
    }

    _populateDistrict(cityId: string) {
        this.masterService.getDistricts(cityId).subscribe(result => {
            this.districts = result;
        });
    }

    _populateSubDistrict(districtId: string) {
        this.masterService.getSubDistricts(districtId).subscribe(result => {
            this.sub_districts = result;
        });
    }
}
