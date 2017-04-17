import { Component, OnInit,ViewContainerRef,ViewChild } from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'app-login',
  providers: [MyServiceService,AppGlobal],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  appGlobal = AppGlobal.getInstance();
 
  loginForm:Object=  {};

  constructor(private myService:MyServiceService,private router:Router,public aRoute:ActivatedRoute,private storeService: LocalStorageService) { 
  }
  ngOnInit() {
    this.aRoute.params.subscribe(params => {
              // this.id = params  // {id: "xxx"}
                
             this.myService.service("/stores/qrc/"+params.login,"get").subscribe(
              data=> {
                   if(!!data){
                     //this.appGlobal.userInfo=data;
                   // console.log(data)
                    this.appGlobal.toastTime=0;
                    this.storeService.set("merchantId", data.merchantId);
                    this.storeService.set("QRC", params.login);
                    this.storeService.set("ZONEINFO", data.zoneInfo);
                    
                    this.appGlobal.navSelect="Staff";
                    this.appGlobal.storeInfo=data;
                   //  this.router.navigate(['index/home',{}] );//{ id:mobile.id }
                   }else{
                     this.router.navigate(['']);
                   }
                 }
             )

/*
                if(params.login!="xian"){

                  this.router.navigate(['']);
                }else{
                    console.log("======================");


                  this.storeService.set("QRCURL", params.login);
                  console.log("======================");
                }*/
           });
  }

   login(form: any): void{
     this.appGlobal.loading=true;
     this.loginForm["merchantId"]=this.storeService.get("merchantId");
     this.loginForm["zoneInfo"]=this.storeService.get("zoneInfo");
    // this.router.navigate(['index',{}] );//{ id:mobile.id }
     this.myService.service("/admin/login","post",this.loginForm).subscribe(
               data=> {
                   if(!!data){
                    this.appGlobal.toastTime=0.5;
                     this.appGlobal.userInfo=data;
                     console.log(this.appGlobal.userInfo)
                    
                     this.router.navigate(['index/customer'] );//{ id:mobile.id }
                   }
                 }
                
            );


  }
/*    onSelect(mobile: Mobile) {
        this._router.navigate( ['MobileDetail', { id:mobile.id }] );
    }

    isSelected(m: Mobile) { 
        return m.id === this._selectedId; 
    }*/
}
