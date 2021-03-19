export interface Equipment {
    id: number;
    province: string;
    province_id: string;
    city: string;
    city_id: string;
    district: string;
    district_id: string;
    sub_district: string;
    sub_district_id: string;
    loc_addr_detail: string;
    reg_no: string;
    type: string;
    type_id: string;
    year: string;
    funding: string;
    funding_id: string;
    condition: string;
    owner: string;
    ownership: string;
    land_area: string;
    note: string;
    location: {};
    address_detail: string;
    status: string;
    createdByName: string;
    created_by: number;
    verified_by?: number;
    verifiedByName?: string;
    report?: string;
    report_name?: string;
    report_url?: string;
}

export interface Location {
    province: string;
    city: string;
    district: string;
    sub_district: string;
    lat: number;
    lng: number;
}
