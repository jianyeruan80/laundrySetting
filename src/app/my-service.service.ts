

import { Injectable,ViewContainerRef } from '@angular/core';

import { Http ,Response,URLSearchParams, Headers, RequestOptions,Request} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/finally';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/timer';
import { Observable} from 'rxjs/Observable';
import { AppGlobal } from './app-global';

//import { ToastsManager } from 'ng2-toastr/ng2-toastr';
@Injectable()
export class MyServiceService {
  appGlobal = AppGlobal.getInstance(); 
  headers = new Headers({'Content-Type': 'application/json;charset=UTF-8'}); 
  loading;
  url:string="";
  constructor(private http: Http) {
     // this.toastr.setRootViewContainerRef(vcr);
  }
  toastr(){

  }
   search(url:string,method:string="post",data:Object={},params:Object={},flag:boolean=false,error:boolean=false) {
   /* var search = new URLSearchParams()
    search.set('action', 'opensearch');
    search.set('search', term);
    search.set('format', 'json');*/
    this.url=this.appGlobal.server+url;
    return this.http
                .post(this.url, {})
                .map((request) => request.json()[1]);
  }
  upload(url:string,fileToUpload: any,name:string) {
/*constructor(public toastr: ToastsManager, vcr: ViewContainerRef) {
         this.toastr.setRootViewContainerRef(vcr);
      }*/
           
          let input = new FormData();
          input.append("file", fileToUpload);
          input.append("input",name);
          this.url=this.appGlobal.server+url+"/"+this.appGlobal.userInfo["merchantId"];
          return this.http
              .post(this.url, input,{headers:new Headers({})})
              .map(res => {  
                            let json=res.json();
                            if(!!json && !!json["message"]){
                                 this.appGlobal.error["message"]=json["message"];
                                 this.appGlobal.error["type"]="error";
                              json=null;
                              }
                              return json;
                                                           })
              .catch(err=>Observable.throw({"code":"500","message":"Backend Server Error"}))
              .finally(() => {this.appGlobal.loading=false;})
      }
  service(url:string,method:string="post",data:Object={},params:Object={},flag:boolean=false,error:boolean=false){
         //this.toastr.error('This is not good!', 'Oops!');
        //   this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
     //  this.presentLoading();
       this.appGlobal.loading=true;
       this.url=this.appGlobal.server+url;
       
       if(!!this.appGlobal.userInfo && !!this.appGlobal.userInfo["accessToken"]){
         this.headers = new Headers({'Content-Type': 'application/json;charset=UTF-8', 'Authorization': "Bearer "+this.appGlobal.userInfo["accessToken"]}); 
       }
       this.appGlobal.flag=!flag || this.appGlobal.flag;
       var str = Object.keys(params).map(function(key){ 
         return encodeURIComponent(key) + '=' + encodeURIComponent(params[key]); 
         }).join('&');
       var searchParams = new URLSearchParams(str);

       if(this.appGlobal.flag){
                this.appGlobal.flag=false;
                let options = new RequestOptions({
                method: method,
                url: this.url,
                headers:this.headers,
                body: data,
                search:searchParams
            });

                
            return this.http.request(new Request(options)).map(res =>{  
                                               
                                                      
                                                         let json=res.json();
                                                         if(error){
                                                             return json;
                                                          }else if(!!json && !!json["message"]){
                                                             this.openMessage(json["message"])
                                                            return null;
                                                            }else{
                                                               this.openMessage("Success !","success");
                                                            return json;  
                                                            }
                                                            
                                                           })
                      .catch(err=>{this.openMessage("Backend Server Error !");return Observable.throw({"code":"500","message":"Backend Server Error !"})})
                      .finally(() => {
                         this.appGlobal.loading=false;
                         this.appGlobal.flag=true})
               }
  }
    
    openMessage(message,type="error"){
      this.appGlobal.toastTime=0.1;
       if(type=="error")this.appGlobal.toastTime=1;
      if(this.appGlobal.toastTime>0){
        this.appGlobal.error["message"]=message;
        this.appGlobal.error["type"]=type;
        this.appGlobal.error["delay"]=this.appGlobal.toastTime*1000;
        this.clossMessage();  
      }
      
    }
    clossMessage() {
        let timer = Observable.timer(this.appGlobal.toastTime*1000);
        timer.subscribe(t=> {
        this.appGlobal.error["message"]="";
        this.appGlobal.error["type"]="error";
    });
      
    /*  this.loading = this.loadingCtrl.create({
          content: "Please wait...",
          duration: 2000
        });
        this.loading.present();*/
    }
   

/*toastError(msg:string,position:string="bottom",cssClass:string="toast-error") {
   let toast = this.toastCtrl.create({
    message: msg,
    duration: 3000,
    position: position,
    cssClass: cssClass,
  });

  toast.onDidDismiss(() => {
    console.log('Dismissed toast');
  });

   toast.present();
}
*/
/* showSuccess() {
        this.toastr.success('You are awesome!', 'Success!');
      }
    
      showError() {
        this.toastr.error('This is not good!', 'Oops!');
      }
    
      showWarning() {
        this.toastr.warning('You are being warned.', 'Alert!');
      }
    
      showInfo() {
        this.toastr.info('Just some information for you.');
      }
      
      showCustom() {
        this.toastr.custom('<span style="color: red">Message in red.</span>', null, {enableHTML: true});
      }*/

/*   toastError(err) {
      this.presentToast(err:string,position:string="bottom",cssClass:string="toast-error");
  }*/
}


//http://www.cnblogs.com/keatkeat/p/5814708.html
/*
this.http.get(
    "http://localhost:58186/api/products",
    { headers: new Headers({ "Accept": "application/json" })}
).finally(() => {
    console.log("finally"); //不管 success or error 最后都会跑这个
}).subscribe(response => {        
    console.log("success");
}, response => {
    console.log("fail");
}, () => {
    console.log("success final");
});
 result:Array<Object>; 
http.get('friends.json')
                  .map(response => response.json())
                  .subscribe(result => this.result =result);
import {Injectable} from '@angular/core';  
import {Http} from '@angular/http';

@Injectable()
export class GitHubService {  
    constructor(private http: Http) {
    }

    getRepos(username) {
        let repos = this.http.get(`https://api.github.com/users/${username}/repos`);
        return repos;

        ngOnInit() {
    this.getFoods();
  } 
  getFoods() {
    this.http.get('/app/food.json')
      .map((res:Response) => res.json())
      .subscribe(
        data => { this.foods = data},
        err => console.error(err),
        () => console.log('done')
      );
  }
  */