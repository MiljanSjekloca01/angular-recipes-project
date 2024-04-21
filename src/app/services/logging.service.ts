import { Injectable } from "@angular/core";

// Demo servis za 340 Section Loading Services Differently
@Injectable({ providedIn:"root"})
export class LoggingService{
    lastLog: string;

    printLog(message: string){
        console.log(message);
        console.log(this.lastLog);
        this.lastLog = message
    }
}