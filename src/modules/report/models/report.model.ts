export interface ReportFunding {
    province_id: string;
    province?: string;
    city_id: string;
    city?: string;
    district_id: string;
    district?: string;
    sub_district_id: string;
    sub_district?: string;
    type_id: string;
    type?: string;
    funding_id: string;
    funding?: string;
    total: number;
    year: number;
}

export interface ReportCondition {
    province_id: string;
    province?: string;
    city_id: string;
    city?: string;
    district_id: string;
    district?: string;
    sub_district_id: string;
    sub_district?: string;
    type_id: string;
    type?: string;
    funding_id: string;
    funding?: string;
    year: number;
    total_operational: number;
    total_broken: number;
    total_damage: number;
}

export interface ReportCoverage {
    province_id: string;
    province?: string;
    city_id: string;
    city?: string;
    district_id: string;
    district?: string;
    sub_district_id: string;
    sub_district?: string;
    type_id: string;
    type?: string;
    year: number;
    coverage: number;
    coverage_status: string;
    coverage_color?: string;
    land_area: number;
    total_need: number;
    total_available: number;
}

export interface FundingSearchParameter {
    province_id: string;
    city_id: string;
    district_id: string;
    sub_district_id: string;
    type_id: string;
    funding_id: string;
    year: number;
    coverage_status?: string;
}
