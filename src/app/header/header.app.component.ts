import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DataStorageService } from "../shared/data-storage.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from "rxjs";


@Component({
    selector:"app-header",
    templateUrl:"./header.component.html",
})

export class HeaderComponent implements OnInit{
    isAuthenticated = false;
    collapsed = true;
    private userSub: Subscription;

    constructor(
        private dStorageService: DataStorageService,
        private authService: AuthService
    ){}

    onSaveData(){
        this.dStorageService.storeRecipes();
    }

    onFetchData(){
        this.dStorageService.fetchRecipes().subscribe();
    }

    ngOnInit() {
       this.userSub =  this.authService.user.subscribe(
        user => {
            this.isAuthenticated = !!user // !user ? false : true
        })
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

    // mislim da bi moglo i samo this.authService.user.next(null);
    onLogout(){
        this.authService.logout();
    }
}