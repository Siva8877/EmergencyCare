import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganAvailabilityComponent } from './organ.availability.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: OrganAvailabilityComponent }
    ])],
    exports: [RouterModule]
})
export class OrganAvailabilityRoutingModule { }
