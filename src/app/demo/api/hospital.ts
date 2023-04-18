export interface DevicesAvailability {
    itemId: number;
    facilityName: string;
}

export interface Facilities {
    emergencyBed: number,
    bloodAvailability?: BloodAvailability[],
    organAvailability?: OrganAvailability[],
    devicesAvailability?: DevicesAvailability[]
}

export interface BloodAvailability {
    itemId: number;
    bloodGroupId: number;
    hospitalId : string;
    hospitalName? : string;
    bloodGroup: string;
    AvailableUnit: number;
}

export interface OrganAvailability {
    itemId: number;
    hospitalName? : string;
    bloodGroup: string;
    donorAge: number;
    liverSize : number;
    liverWeight: number;
    heartWeight: number;
}

export interface Hospital {
    id?: string;
    name?: string;
    contactNo? : string;
    address?: string;
    emergencyBed?: number;
    facilities?: Facilities;
}