import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";


@Component({
    selector: "app-auth",
    templateUrl: "./auth.component.html",
    styleUrls: ["./auth.component.css"]
})

export class AuthComponent implements OnInit,OnDestroy{

    isLoginMode = true;
    isLoading = false;
    error: string = null;
    // prvi poziv direktive
    @ViewChild(PlaceholderDirective,{static: false})
    alertHost: PlaceholderDirective
    private closeSub: Subscription;


    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    ngOnInit() {
        
    }

    onSwitchMode(){
        this.isLoginMode = !this.isLoginMode//reverseValue
    }


    onSubmit(form: NgForm){
        if(!form.valid){
            return
        }
        const email = form.value.email;
        const password = form.value.password
        this.error = null;
        let authObs: Observable<AuthResponseData>;
        this.isLoading = true
        
        if(this.isLoginMode){
            authObs = this.authService.login(email,password)
        }else{
            authObs = this.authService.signUp(email,password)
        }

        authObs.subscribe(
            resData => {
                this.isLoading = false;
                this.router.navigate(["./recipes"])
            },
            errorMess => {
                this.error = errorMess
                this.showErrorAlert(errorMess);
                this.isLoading = false;
            }
        )
    }
    /*
    onAlertClosed(){
        this.error = null;
    }
    */
    private showErrorAlert(errorMessage: string){
        const hostViewContainerRef = this.alertHost.viewContainerRef
        hostViewContainerRef.clear(); // Ciscenje prethodno dodate komponente
        const componentRef = hostViewContainerRef.createComponent<AlertComponent>(AlertComponent);
        componentRef.instance.message = errorMessage;
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe();
            hostViewContainerRef.clear();
        })
    }

    ngOnDestroy(): void {
        if(this.closeSub){
            this.closeSub.unsubscribe();
        }
    }


    
}