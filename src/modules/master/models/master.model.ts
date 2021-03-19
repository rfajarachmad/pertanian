export interface Alsintan {
    id: number;
    code: string;
    name: string;
    description: string;
    capacity?: number;
    status: string;
}

export interface Funding {
    id: number;
    code: string;
    name: string;
    description: string;
    status: string;
}

export interface LocationArea {
    id: number;
    province_id: string;
    province: string;
    city_id: string;
    city: string;
    district_id: string;
    district: string;
    sub_district_id: string;
    sub_district: string;
    land_area: number;
    year: number;
}

export interface Province {
    id: string;
    name: string;
}

export interface City {
    id: string;
    name: string;
}

export interface District {
    id: string;
    name: string;
}

export interface SubDistrict {
    id: string;
    name: string;
}

