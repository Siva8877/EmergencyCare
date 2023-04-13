import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Hospital } from '../api/hospital';

@Injectable()
export class HospitalService {

    constructor(private http: HttpClient) { }

    getHospitals() {
        return this.http.get<any>('assets/demo/data/hospitals.json')
            .toPromise()
            .then(res => res);
    }
    getBloodAvailabilityList() {
        return this.http.get<any>('assets/demo/data/bloodAvailabilityData.json')
            .toPromise()
            .then(res => res.date);
    }
    
}
