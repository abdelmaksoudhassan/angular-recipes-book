import { NgModule } from "@angular/core";
import { AuthComponent } from './auth.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { authRoutingModule } from './auth-routing-module';
@NgModule({
    declarations:[
        AuthComponent
    ],
    imports:[
        CommonModule,
        RouterModule,
        FormsModule,
        authRoutingModule
    ]
})
export class authModule {}