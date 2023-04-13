import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Patient } from '../api/patient';

@Injectable()
export class PatientService {

    constructor(private http: HttpClient) { }

    getPatients() {
        return this.http.get<any>('assets/demo/data/patients.json')
            .toPromise()
            .then(res => res.data as Patient[])
            .then(data => data);
    }
    
}
