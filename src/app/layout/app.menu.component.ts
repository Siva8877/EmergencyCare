import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];
    role = '';
    constructor(public layoutService: LayoutService) {
        if (localStorage.getItem('role') === 'admin') {
            this.role = 'admin';
        } else if (localStorage.getItem('role') === 'superadmin') {
            this.role = 'superadmin';
        }
    }

    ngOnInit() {

         if(this.role === 'admin'){
            this.model = [
                {
                    label: 'Hospital',
                    items: [
                        { label: 'HospitalDetail', icon: 'fa fa-hospital-o', routerLink: ['/hospitaldetail'] },
                        { label: 'HospitalList', icon: 'fa fa-hospital-o', routerLink: ['/hospital'] },
                        { label: 'BloodAvailability', icon: 'fa fa-medkit', routerLink: ['/bloodlist'] },
                        { label: 'OrganAvailability', icon: 'fa fa-heartbeat', routerLink: ['/organlist'] }
                    ]
    
                }, {
                    label: 'Patient',
                    items: [
                        { label: 'PatientList', icon: 'pi pi-fw pi-users', routerLink: ['/patient'] }
                    ]
                }, {
                    label: 'Request',
                    items: [
                        { label: 'Blood Request', icon: 'pi pi-fw pi-users', routerLink: ['/bloodrequest'] },
                        { label: 'Organ Request', icon: 'pi pi-fw pi-users', routerLink: ['/organrequest'] }
                    ]
                }
            ];
        }else{
                this.model = [
                    {
                        label: 'Hospital',
                        items: [
                            { label: 'HospitalList', icon: 'fa fa-hospital-o', routerLink: ['/hospital'] },
                            { label: 'BloodAvailability', icon: 'fa fa-medkit', routerLink: ['/bloodlist'] },
                            { label: 'OrganAvailability', icon: 'fa fa-heartbeat', routerLink: ['/organlist'] }
                        ]
        
                    }, {
                        label: 'Patient',
                        items: [
                            { label: 'PatientList', icon: 'pi pi-fw pi-users', routerLink: ['/patient'] }
                        ]
                    }, {
                        label: 'Request',
                        items: [
                            { label: 'Blood Request', icon: 'pi pi-fw pi-users', routerLink: ['/bloodrequest'] },
                            { label: 'Organ Request', icon: 'pi pi-fw pi-users', routerLink: ['/organrequest'] }
                        ]
                    }
                ];
        }

       
    }
}
