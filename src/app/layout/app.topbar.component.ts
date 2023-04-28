import { Component, ElementRef, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { LayoutService } from "./service/app.layout.service";
import {
    Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
  } from '@angular/router';
@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items!: MenuItem[];

    @ViewChild('menubutton') menuButton!: ElementRef;

    @ViewChild('topbarmenubutton') topbarMenuButton!: ElementRef;

    @ViewChild('topbarmenu') menu!: ElementRef;

    constructor(public layoutService: LayoutService, private router: Router,) { }

    logout() {
        localStorage.setItem('userId', '');
        localStorage.setItem('password', '');
        localStorage.setItem('role', '');
        localStorage.setItem('name', '');
        this.router.navigate(['/login']);
    }
}
