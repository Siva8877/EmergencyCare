import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OrganRequestComponent } from './organ.request.component';

@NgModule({
    imports: [RouterModule.forChild([
        { path: '', component: OrganRequestComponent }
    ])],
    exports: [RouterModule]
})
export class OrganRequestRoutingModule { }
