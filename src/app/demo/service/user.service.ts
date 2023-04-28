import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

    constructor(private http: HttpClient) { }

    public getUser(userName: any, password: any) {
        return this.http.get<any>('assets/demo/data/userList.json')
            .toPromise()
            .then(res => {
                let userDetail = {};
                if (res && Array.isArray(res)) {
                    userDetail = res.find(obj => {
                        return obj.userid === userName && obj.password === password;
                    });
                }
                return userDetail;
            });
    }

}
