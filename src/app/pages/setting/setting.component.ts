import { Component, OnInit,ViewContainerRef,ViewChild } from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { LocalStorageService } from 'angular-2-local-storage';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  appGlobal = AppGlobal.getInstance();
  settingCf:any=[];
  settingType:Object={"type":"Global"};
  cfSelect:any=0;
  cfSelectSub:any=0;
  
  settingList:any=[];
  isSelect:Number=0;
  settingForm:any= [];
  deviceArray:any=[];
  Payment:Object={};
  Other:Object={};
  constructor(private myService:MyServiceService,private router:Router,public aRoute:ActivatedRoute,private storeService: LocalStorageService) { 
  	 this.settings({"type":"!Device"});
     this.cfSelect=0;
     this.settingCf=[
     {
       "key":"Setting",
       "value":"Setting",
       "values":[
               {value:"Global Setting",type:"Global"},
              /* {value:"Customer Setting",key:"User"},
               {value:"App Setting",key:"App"}*/
         ]
     },
     {
       "key":"Device",
       "value":"Device",
       "values":[
               {value:"Printer",type:"Printer"},
               {value:"Payment",type:"Payment"},
               /*{value:"Other",key:"Other"}*/
         ]
     }
  ]
  
  this.deviceArray[0]= {"key":"","group":"","merchantId":"","type":"Printer","settingInfo":
                [
               {"values":[
                     
                   /*  {"type":"radio","name":"Payment Service","value":["Usaepay","Verifone","Pax"],"select":"Usaepay"},*/
                     /*{"type":"input","name":"Souce Key","value":""},*/
                     {"type":"input","name":"IP Address","value":""},
           /*          {"type":"checkbox","name":"print Merchant Copy","value":false},
                     {"type":"checkbox","name":"Enable Signature","value":false},
                     {"type":"checkbox","name":"Print Customer Copy","value":false},
                     {"type":"checkbox","name":"Print Tip Input","value":false},*/
                     {"type":"checkbox","name":"Status","value":true}
                     ]}
              
               ]
          };
this.deviceArray[1]= {"key":"","group":"","merchantId":"","type":"payment","settingInfo":
                [
               {"values":[
                     
                      {"type":"radio","name":"Terminal","value":["Usaepay","Verifone","Pax"],"select":"Usaepay"},
                      {"type":"input","name":"Terminal Model","value":""},
                       {"type":"input","name":"IP Address","value":""},
                       {"type":"input","name":"Port Number","value":""},
                         {"type":"checkbox","name":"Status","value":true}
                     ]}
              
               ]
          };
    this.deviceArray[2]= {"key":"","group":"","merchantId":"","type":"xxx","settingInfo":
                [
               {"values":[
                     
                     {"type":"radio","name":"Payment Service","value":["Usaepay","Verifone","Pax"],"select":"Usaepay"},
                     {"type":"input","name":"Souce Key","value":""},
                     {"type":"input","name":"Pin Number","value":""},
                     {"type":"checkbox","name":"print Merchant Copy","value":false},
                     {"type":"checkbox","name":"Enable Signature","value":false},
                     {"type":"checkbox","name":"Print Customer Copy","value":false},
                     {"type":"checkbox","name":"Print Tip Input","value":false},
                     {"type":"checkbox","name":"Status","value":false}
                     ]}
              
               ]
          };      

     
  }
  ngOnInit() {
    this.aRoute.params.subscribe(params => {
                this.appGlobal.userInfo={};
                this.appGlobal.userInfo["accessToken"]=params.token;
     });
   
  }
  select(item){

    if(this.cfSelect==0){
       if(!!item){
          this.settingForm=JSON.parse(JSON.stringify(item));   
      }else{
       
 
        this.settingForm=JSON.parse(JSON.stringify(this.settingList[this.cfSelectSub]));   
      }
    }else{
      
        
        
        if(!!item){
            this.settingForm=JSON.parse(JSON.stringify(item));   
        }else{

          if(!!(this.cfSelect==1) && !!(this.cfSelectSub==0)){
            
            this.settingType={"type":"Printer"};
          }
          this.isSelect=-1;    
          this.settingForm=JSON.parse(JSON.stringify(this.deviceArray[this.cfSelectSub]));   
        }
    }
    
    

  	
  	
  }
  settings(n){
     let sendData= !!n?n:(this.cfSelect==0?{"type":"!Device"}:{"type":"Device"});
     if(this.cfSelect==0){
          this.settingType={"type":"Global"};
     }else{
         this.settingType={"type":"Printer"};
         
     }
  		this.myService.service("/settings/merchant/id","get",{},sendData).subscribe(
               data=> {
                   if(!!data){
                     console.log(data);
                   	this.settingForm=[];
                   	this.settingList=data;
                    if(this.cfSelect==0){
                        this.settingForm=this.settingList[0];  
                    }else{
                       this.settingForm=this.deviceArray[0];


                    }
                   

                    
                  

            }
                 }
                
            );
  }
  changeList(data){
    if(typeof(data)=="string"){
          for(var i=0;i<this.settingList.length;i++){
          if(data==this.settingList[i]["_id"]){
            
            this.settingList.splice(i,1);
          }
      }
    }else{
          for(var i=0;i<this.settingList.length;i++){
    		  if(data["_id"]==this.settingList[i]["_id"]){
    		  	
    		  	this.settingList[i]=data;
    		  }
    	}
  }
  }
  del(){
    
        this.myService.service("/settings/"+this.settingForm["_id"],"delete",).subscribe(
               data=> {
                   if(!!data){
                       this.changeList(this.settingForm["_id"]);
                      this.isSelect=-1;
                      this.settingForm=this.deviceArray[this.cfSelectSub];
                     
                      
                      
                    

            }
                 }
                
            );
  }
  save(){
         
      var id=this.settingForm["_id"] || "NEW";
      this.settingForm["type"]=this.settingType["type"];
      if(id=="NEW")this.settingForm["key"]=this.settingForm["group"];
  		this.myService.service("/settings/"+id,"put",this.settingForm).subscribe(
               data=> {
                   if(!!data){

                      
                    	this.settingForm=data;
                      if(id=="NEW"){
                          this.settingList.push(data);  
                      }else{
                        this.changeList(data);
                      }
                      
                      
                  	

            }
                 }
                
            );
  }
 add(){
   if(this.cfSelect==1){
     this.settingForm=[];
       this.settingForm=this.deviceArray[this.cfSelectSub];  
   }
   
 }
}
