import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FacilityMaster } from '../api/facilityMaster';
import { BloodMaster } from '../api/bloodMaster';

@Injectable()
export class MasterService {

    constructor(private http: HttpClient) { }

    getFacilityMaster() {
        return this.http.get<any>('assets/demo/data/facilities.json')
            .toPromise()
            .then(res => res.data as FacilityMaster[])
            .then(data => data);
    }

    getBloodMaster() {
        return this.http.get<any>('assets/demo/data/bloodGroup.json')
            .toPromise()
            .then(res => res.data as BloodMaster[])
            .then(data => data);
    }
}