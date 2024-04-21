import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

@NgModule({
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService , multi: true}
    // svi servisi ali posto imamo providedIn root ne moramo
    // Cisto demonstrativno CoreModule da mozda negde sretnemo
    ],
})


export class CoreModule{}