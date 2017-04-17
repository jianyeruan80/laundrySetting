import { Component, OnInit,ViewChild ,Renderer, ElementRef} from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { FormControl } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";
import { Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-license',
  templateUrl: './license.component.html',
  styleUrls: ['./license.component.css']
})
export class LicenseComponent implements OnInit {
  licenses:any=[];
  license:Object={};
  licenseSub={};
  modal:boolean=false;
  @ViewChild('key') key:ElementRef;
  @ViewChild('originKey') originKey:ElementRef;
   keyValue:string="";

  constructor(private myService:MyServiceService,private router:Router,public renderer: Renderer, public elementRef: ElementRef) {
  	
  }
  initLicense(){
  	 this.license["addressInfo"]={};
     this.licenseSub={};
  	 this.licenseSub["type"]="Normal";
  }
  ngOnInit() {
   this.initLicense();
   this.licensesList();
   
  }
   openLicense(item,pcKey){
      this.initLicense();
      if(!!item){
         this.license=JSON.parse(JSON.stringify(item));
         this.licenseSub["merchantId"]=this.license["merchantId"];
         this.licenseSub["pcKey"]=pcKey || "";
      }
      console.log(this.license);
  		this.modal=true;
    }
    licensesList(){
    	this.myService.service("/stores/licensesQuery","post",{}).subscribe(
		            data=> {
		            	if(!!data){
		            		this.licenses=data;
		            		
		            	}
	               })
    }
    
    saveLicense(){
    	
    	this.license["pcKey"]=this.licenseSub["pcKey"];
    	this.license["licenseSub"]=this.licenseSub;
      if(!!this.license["_id"]){
        this.myService.service("/stores/createLicensekey/"+this.license["_id"],"put",this.license).subscribe(
                data=> {
                  if(!!data){
                    this.license=data;
                    console.log(data);
                    this.licenseSub["key"]=data["newKey"];
                    this.licenseSub["merchantId"]=data["merchantId"];
                    
                  }
                 })
      }else{
         
        this.myService.service("/stores/createLicensekey","post",this.license).subscribe(
                data=> {
                  if(!!data){
                    this.license=data;
                    this.licenseSub["key"]=data["newKey"];
                    this.licenseSub["merchantId"]=data["merchantId"];
                    
                    
                  }
                 })
      }  
    	
    }
     
      copy(key){
      let e;
      if(!!key){
           e= this.key.nativeElement;
           e.value=key;
        }else{
          e= this.originKey.nativeElement;
        }
      
       e.select();
      document.execCommand('copy');
      //  timer.subscribe(t=> {this.keyValue=key; native.getAttribute("requestID" 
            //this.renderer.invokeElementMethod(this.key.nativeElement,'focus');
            //this.testKey="11111111111111";
            //this.renderer.invokeElementMethod(this.testKey.nativeElement,'select');
            //this.renderer.invokeElementMethod(this.testKey.nativeElement,'select');
            
      // })
      //this.renderer.invokeElementMethod(this.originKey.nativeElement,'focus');
       
      //http://plnkr.co/edit/rq50jYSeFQsliFWo7stU?p=preview
         //this.focusMe();
         //this.renderer.invokeElementMethod(this.key.nativeElement,'focus');
        // this.renderer.invokeElementMethod(this.key.nativeElement,'select');
        // var child = this.renderer.invokeElementMethod(this.elementRef.nativeElement, 'querySelector', ['div']);
        //console.log(child);
        //this.el.nativeElement.focus();
        
    }

}

