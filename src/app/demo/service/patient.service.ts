import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../api/patient';

@Injectable()
export class PatientService {

    constructor(private http: HttpClient) { }

    getPatients(hospitalId: any) {
        return this.http.get<any>('assets/demo/data/patients.json')
            .toPromise()
            .then(res => res as Patient[])
            .then(data => {
                if (data && Array.isArray(data) && hospitalId) {
                    return data.filter(obj => {
                        return obj.hospitalId?.toString() === hospitalId
                    });
                } else {
                    return data;
                }
            });
    }
    
}
