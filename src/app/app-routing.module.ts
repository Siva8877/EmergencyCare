import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: AppLayoutComponent,
                children: [                  
                    { path: 'hospitaldetail', loadChildren: () => import('./demo/components/hospitaldetail/hospital.detail.module').then(m => m.HospitalDetailModule) },
                    { path: 'hospital', loadChildren: () => import('./demo/components/hospital/hospital.module').then(m => m.HospitalModule) },
                    { path: 'bloodlist', loadChildren: () => import('./demo/components/bloodavailability/blood.availability.module').then(m => m.BloodAvailabilityModule) },
                    { path: 'bloodrequest', loadChildren: () => import('./demo/components/bloodrequest/blood.request.module').then(m => m.BloodRequestModule) },
                    { path: 'organlist', loadChildren: () => import('./demo/components/organavailability/organ.availability.module').then(m => m.OrganAvailabilityModule) },
                    { path: 'organrequest', loadChildren: () => import('./demo/components/organrequest/organ.request.module').then(m => m.OrganRequestModule) },

                    { path: 'patient', loadChildren: () => import('./demo/components/patient/patient.module').then(m => m.PatientModule) },
                    { path: 'uikit', loadChildren: () => import('./demo/components/uikit/uikit.module').then(m => m.UIkitModule) },
                    { path: 'utilities', loadChildren: () => import('./demo/components/utilities/utilities.module').then(m => m.UtilitiesModule) },
                    { path: 'blocks', loadChildren: () => import('./demo/components/primeblocks/primeblocks.module').then(m => m.PrimeBlocksModule) },
                    { path: 'pages', loadChildren: () => import('./demo/components/pages/pages.module').then(m => m.PagesModule) }
                ]
            },
            { path: '', loadChildren: () => import('./demo/components/auth/login/login.module').then(m => m.LoginModule) },
            { path: 'login', loadChildren: () => import('./demo/components/auth/login/login.module').then(m => m.LoginModule) },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'landing', loadChildren: () => import('./demo/components/landing/landing.module').then(m => m.LandingModule) },
            { path: 'notfound', component: NotfoundComponent },
            { path: '**', redirectTo: '/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
