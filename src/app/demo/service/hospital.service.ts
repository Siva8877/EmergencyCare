import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HospitalService {

    constructor(private http: HttpClient) { }

    getHospitals() {
        return this.http.get<any>('assets/demo/data/hospitals.json')
            .toPromise()
            .then(res => res);
    }

    getHospitalsV1() {
        return this.http.get<any>('assets/demo/data/hospitalsv1.json')
            .toPromise()
            .then(res => res);
    }


    getBloodAvailabilityList() {
        return this.http.get<any>('assets/demo/data/bloodAvailabilityData.json')
            .toPromise()
            .then(res => res);
    }

    getOrganAvailabilityList() {
        return this.http.get<any>('assets/demo/data/organAvailability.json')
            .toPromise()
            .then(res => res);
    }

    getBloodRequestList() {
        return this.http.get<any>('assets/demo/data/bloodRequestData.json')
            .toPromise()
            .then(res => res);
    }

    getOrganRequestList() {
        return this.http.get<any>('assets/demo/data/organRequestData.json')
            .toPromise()
            .then(res => res);
    }
    
}
