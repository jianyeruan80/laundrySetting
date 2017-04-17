
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';

/*    constructor() {
constructor(private locationStrategy:LocationStrategy) {
  console.log(locationStrategy.prepareExternalUrl('xxx'));
}*/
export class AppGlobal {
    private static instance: AppGlobal = new AppGlobal();

    userInfo:Object={};
    storeInfo:Object={};
    navInfo:any;
    toastTime=0;
    loading:boolean=false;
    error:Object={};
    navSelect:string;
    isStaff:String="Staff";
    isDebug: boolean = true;
    server: string = this.isDebug ? "https://5137510d.ngrok.io/api" : "http://service520.com:3100/api";
    picUrl: string = this.isDebug ? "http://192.168.1.100:3000/" : "http://service520.com:3100/";
    ///apiUrl: string = "/MobileApi/api";
     
    pageSize: number = 10;
    flag:boolean = true;
    constructor() {
         this.server=window.location.origin+"/api"
         this.error["message"]="";
         this.error["delay"]=3;
         this.error["type"]="";//success,info,warning,error
        if (AppGlobal.instance) {
             throw new Error("error: Use AppGlobal.getInstance() replace new.");
        }
        AppGlobal.instance = this;
    }

 
    public static getInstance(): AppGlobal {
        return AppGlobal.instance;
    }


}
