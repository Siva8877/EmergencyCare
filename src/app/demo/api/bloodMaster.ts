export interface BloodMaster {
    itemId: number;
    bloodGroup: string;
}

export interface BloodRequest {
    requestedByHosId: string;
    requestedToHosId: string;
    bloodGroupID: string;
    requestedUnit: number;
}