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

    getHospitalsV1(hospitalId: any) {
        return this.http.get<any>('assets/demo/data/hospitalsv1.json')
            .toPromise()
            .then(res => {
                if (res && Array.isArray(res) && hospitalId) {
                    return res.filter(obj => {
                        return obj.hospitalId !== hospitalId
                    });
                } else {
                    return res;
                }
            });
    }

    getMyHospitalDetail(hospitalId: any) {
        return this.http.get<any>('assets/demo/data/hospitalsv1.json')
            .toPromise()
            .then(res => {
                if (res && Array.isArray(res) && hospitalId) {
                    return res.find(obj => {
                        return obj.hospitalId === hospitalId
                    });
                } else {
                    return res;
                }
            });
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

    getBloodRequestList(hospitalId: any) {
        return this.http.get<any>('assets/demo/data/bloodRequestData.json')
            .toPromise()
            .then(res => {
                if (res && Array.isArray(res) && hospitalId) {
                    return res.filter(obj => {
                        return obj.requestedByHosId === hospitalId ||
                            obj.requestedToHosId === hospitalId
                    });
                } else {
                    return res;
                }
            });
    }

    sendBloodRequest(bloodRequestObj: any) {
        return this.http.post<any>('http://localhost:8080/api/emr/request/blood',bloodRequestObj)
            .toPromise()
            .then(res => {
                return res;
            }).catch(err =>{
                return err;
            });
    }

    getOrganRequestList(hospitalId: any) {
        return this.http.get<any>('assets/demo/data/organRequestData.json')
            .toPromise()
            .then(res => {
                if (res && Array.isArray(res) && hospitalId) {
                    return res.filter(obj => {
                        return obj.requestedByHosId === hospitalId ||
                            obj.requestedToHosId === hospitalId
                    });
                } else {
                    return res;
                }
            });
    }
    
}
