import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { masterAlsintans } from '../data/master-data-alsintan';
import { masterFundings } from '../data/master-data-fundings';
import {
    masterCities,
    masterDistricts,
    masterProvinces,
    masterSubDisttricts,
} from '../data/master-location-data';
import { Alsintan, City, District, Funding, LocationArea, Province, SubDistrict } from '../models';

@Injectable()
export class MasterService {
    constructor(private http: HttpClient) {
        this._cache();
    }

    getMaster$(): Observable<{}> {
        return of({});
    }

    _cache() {
        this.http.get<Province[]>(environment.api + '/master/provinces').subscribe(result => {
            window.sessionStorage.setItem('master.provinces', JSON.stringify(result));
        });
        this.http.get<Province[]>(environment.api + '/master/cities?prov=32').subscribe(result => {
            window.sessionStorage.setItem('master.cities', JSON.stringify(result));
        });
        this.http
            .get<Province[]>(environment.api + '/master/districts?city=3203')
            .subscribe(result => {
                window.sessionStorage.setItem('master.districts', JSON.stringify(result));
            });
        this.http
            .get<Province[]>(environment.api + '/master/sub-districts?city=3203')
            .subscribe(result => {
                window.sessionStorage.setItem('master.subdistricts', JSON.stringify(result));
            });
    }

    saveAlsintan(data: Alsintan): Observable<Alsintan> {
        if (!data.id) {
            data.status = 'Active';
            return this.http.post<Alsintan>(environment.api + '/master/types', data);
        } else {
            return this.http.put<Alsintan>(environment.api + '/master/types/' + data.id, data);
        }
    }

    getAlsintan(): Observable<Alsintan[]> {
        return this.http.get<Alsintan[]>(environment.api + '/master/types');
    }

    getActiveAlsintan(): Observable<Alsintan[]> {
        return this.http.get<Alsintan[]>(environment.api + '/master/types?status=Active');
    }

    getFundings(): Observable<Funding[]> {
        return this.http.get<Alsintan[]>(environment.api + '/master/fundings');
    }

    getActiveFundings(): Observable<Funding[]> {
        return this.http.get<Alsintan[]>(environment.api + '/master/fundings?status=Active');
    }

    saveFunding(data: Funding): Observable<Funding> {
        if (!data.id) {
            data.status = 'Active';
            return this.http.post<Alsintan>(environment.api + '/master/fundings', data);
        } else {
            return this.http.put<Alsintan>(environment.api + '/master/fundings/' + data.id, data);
        }
    }

    saveLocation(data: LocationArea): Observable<LocationArea> {
        if (!data.id) {
            return this.http.post<LocationArea>(environment.api + '/master/land-areas', {
                province_id: data.province_id,
                city_id: data.city_id,
                district_id: data.district_id,
                sub_district_id: data.sub_district_id,
                land_area: data.land_area,
                year: data.year,
            });
        } else {
            return this.http.put<LocationArea>(environment.api + '/master/land-areas/' + data.id, {
                province_id: data.province_id,
                city_id: data.city_id,
                district_id: data.district_id,
                sub_district_id: data.sub_district_id,
                land_area: data.land_area,
                year: data.year,
            });
        }
    }

    getLocation(): Observable<LocationArea[]> {
        return this.http.get<LocationArea[]>(environment.api + '/master/land-areas').pipe(
            map((result: LocationArea[]) => {
                result.forEach(item => {
                    this._getProvince(item.province_id).subscribe(name => {
                        item.province = name;
                    });
                    this._getCity(item.city_id).subscribe(name => {
                        item.city = name;
                    });
                    this._getDistrict(item.district_id).subscribe(name => {
                        item.district = name;
                    });
                    this._getSubDistrict(item.sub_district_id).subscribe(name => {
                        item.sub_district = name;
                    });
                });
                return result;
            })
        );
    }

    getProvinces(): Observable<Province[]> {
        return this.http.get<Province[]>(environment.api + '/master/provinces');
    }

    getCities(provId: string): Observable<City[]> {
        return this.http.get<Province[]>(environment.api + '/master/cities?prov=' + provId);
    }

    getDistricts(cityId: string): Observable<District[]> {
        return this.http.get<Province[]>(environment.api + '/master/districts?city=' + cityId);
    }

    getSubDistricts(districtId: string): Observable<SubDistrict[]> {
        return this.http.get<SubDistrict[]>(
            environment.api + '/master/sub-districts?district=' + districtId
        );
    }

    _getProvince(id: string): Observable<string> {
        const masterProvices = window.sessionStorage.getItem('master.provinces');
        let name = '';
        if (masterProvices) {
            const objArray: Province[] = JSON.parse(masterProvices);
            let found = false;
            objArray.forEach(item => {
                if (item.id && item.id.toString() === id) {
                    name = item.name;
                    found = true;
                }
            });
            if (!found) {
                return this._cacheProvince(objArray, id);
            } else {
                return of(name);
            }
        } else {
            const objArray: Province[] = [];
            return this._cacheProvince(objArray, id);
        }
    }

    _cacheProvince(arry: Province[], id: string): Observable<string> {
        return this.http.get<string>(environment.api + '/master/provinces/' + id).pipe(
            map((result: any) => {
                arry.push(result);
                window.sessionStorage.setItem('master.provinces', JSON.stringify(arry));
                return result.name;
            })
        );
    }

    _getCity(id: string): Observable<string> {
        const masterCities = window.sessionStorage.getItem('master.cities');
        let name = '';
        if (masterCities) {
            const objArray: City[] = JSON.parse(masterCities);
            let found = false;
            objArray.forEach(item => {
                if (item.id && item.id.toString() === id) {
                    name = item.name;
                    found = true;
                }
            });
            if (!found) {
                return this._cacheCity(objArray, id);
            } else {
                return of(name);
            }
        } else {
            const objArray: City[] = [];
            return this._cacheCity(objArray, id);
        }
    }

    _cacheCity(arry: City[], id: string): Observable<string> {
        return this.http.get<string>(environment.api + '/master/cities/' + id).pipe(
            map((result: any) => {
                arry.push(result);
                window.sessionStorage.setItem('master.cities', JSON.stringify(arry));
                return result.name;
            })
        );
    }

    _getDistrict(id: string): Observable<string> {
        const masterDistrict = window.sessionStorage.getItem('master.districts');
        let name = '';
        if (masterDistrict) {
            const objArray: District[] = JSON.parse(masterDistrict);
            let found = false;
            objArray.forEach(item => {
                if (item.id && item.id.toString() === id) {
                    name = item.name;
                    found = true;
                }
            });
            if (!found) {
                return this._cacheDistrict(objArray, id);
            } else {
                return of(name);
            }
        } else {
            const objArray: District[] = [];
            return this._cacheDistrict(objArray, id);
        }
    }

    _cacheDistrict(arry: District[], id: string): Observable<string> {
        return this.http.get<string>(environment.api + '/master/districts/' + id).pipe(
            map((result: any) => {
                arry.push(result);
                window.sessionStorage.setItem('master.districts', JSON.stringify(arry));
                return result.name;
            })
        );
    }

    _getSubDistrict(id: string): Observable<string> {
        const masterDistrict = window.sessionStorage.getItem('master.subdistricts');
        let name = '';
        if (masterDistrict) {
            const objArray: SubDistrict[] = JSON.parse(masterDistrict);
            let found = false;
            objArray.forEach(item => {
                if (item.id && item.id.toString() === id) {
                    name = item.name;
                    found = true;
                }
            });
            if (!found) {
                return this._cacheSubDistrict(objArray, id);
            } else {
                return of(name);
            }
        } else {
            const objArray: SubDistrict[] = [];
            return this._cacheSubDistrict(objArray, id);
        }
    }

    _cacheSubDistrict(arry: SubDistrict[], id: string): Observable<string> {
        return this.http.get<string>(environment.api + '/master/sub-districts/' + id).pipe(
            map((result: any) => {
                arry.push(result);
                window.sessionStorage.setItem('master.subdistricts', JSON.stringify(arry));
                return result.name;
            })
        );
    }

    getAlsintanNameByCode(code: string): Observable<string> {
        const masterDistrict = window.sessionStorage.getItem('master.alsintans');
        let name = '';
        if (masterDistrict) {
            const objArray: Alsintan[] = JSON.parse(masterDistrict);
            let found = false;
            objArray.forEach(item => {
                if (item.id && item.code === code) {
                    name = item.name;
                    found = true;
                }
            });
            if (!found) {
                return this._cacheAlsintan(objArray, code);
            } else {
                return of(name);
            }
        } else {
            const objArray: Alsintan[] = [];
            return this._cacheAlsintan(objArray, code);
        }
    }

    _cacheAlsintan(arry: Alsintan[], code: string): Observable<string> {
        return this.http.get<string>(environment.api + '/master/types/' + code).pipe(
            map((result: any) => {
                arry.push(result);
                window.sessionStorage.setItem('master.alsintans', JSON.stringify(arry));
                return result.name;
            })
        );
    }

    getFundingNameByCode(code: string): Observable<string> {
        const masterDistrict = window.sessionStorage.getItem('master.fundings');
        let name = '';
        if (masterDistrict) {
            const objArray: Funding[] = JSON.parse(masterDistrict);
            let found = false;
            objArray.forEach(item => {
                if (item.id && item.code === code) {
                    name = item.name;
                    found = true;
                }
            });
            if (!found) {
                return this._cacheFunding(objArray, code);
            } else {
                return of(name);
            }
        } else {
            const objArray: Funding[] = [];
            return this._cacheFunding(objArray, code);
        }
    }

    _cacheFunding(arry: Funding[], code: string): Observable<string> {
        return this.http.get<string>(environment.api + '/master/fundings/' + code).pipe(
            map((result: any) => {
                arry.push(result);
                window.sessionStorage.setItem('master.fundings', JSON.stringify(arry));
                return result.name;
            })
        );
    }

    getUserNameById(id: number): Observable<string> {
        return this.http.get<string>(environment.api + '/users/' + id).pipe(
            map((result: any) => {
                return result.name;
            })
        );
    }
}
