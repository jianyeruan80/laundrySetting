import { Component, OnInit } from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/distinctUntilChanged";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
	appGlobal = AppGlobal.getInstance();
    searchData:Object={};
    public data;
/*    public filterQuery = "";
    public rowsOnPage = 10;
    public sortBy = "email";
    public sortOrder = "asc";*/
    //config["currentPage"]:number=1;
    config:Object={}
    customers:any=[];
     customer:Object={};
     searchInfo = new FormControl();
     status:boolean=true;
     modal:boolean=false;
     constructor(private myService:MyServiceService,private router:Router) {
    	this.config["total"]=0;
    	this.config["pageOnCount"]=3;
    	this.config["screenOnPage"]=5;
    	this.config["totalPages"]=[];
    	this.config["currentPage"]=1;
    	this.config["startPage"]=0;
    	this.config["endPage"]=10;
        this.config["searchData"]={};
        this.config["searchData"]["status"]="true";
    }
 
    ngOnInit(): void {
/*i.currentTarget.value*/
        this.search(1);
        this.searchInfo.valueChanges
                 .debounceTime(600)
                 .distinctUntilChanged()
                 .map(i => i).subscribe(val => {
                 	this.config["searchData"]["searchInfo"]=val;
  					this.search(1);
         });
       /* this.status.valueChanges
                 .debounceTime(600)
                 .distinctUntilChanged()
                 .map(i => i).subscribe(val => {
                 	this.config["searchData"]["status"]=val;
                 	console.log("============");
                 	console.log(val);
                 	console.log("============");
  					this.search(1);
           });*/
    }
    openCustomer(item){
    	this.customer=JSON.parse(JSON.stringify(item));
    	this.modal=true;

    }
    save(){
    		this.myService.service("/customers/"+this.customer["_id"],"put",this.customer).subscribe(
		            data=> {
		            	if(!!data){
		            		this.search(this.config["currentPage"]);
		            		this.modal=false;
		            	}
	               })
    }
    onChange(event){
    	console.log(this.config["searchData"]["searchInfo"]);
    	this.search(1);
    }
    search(num) {
    	   var sign=false;

    	   if(!isNaN(num)){
    	   	this.config["currentPage"]=num;
    	   	sign=true;
    	   }else if(num=="prev" && this.config["startPage"]>0){
             	this.config["currentPage"]=this.config["startPage"]-1>0?this.config["startPage"]-1:1;
    	   	  	sign=true;
    	   	 }else if(num=="next" && this.config["endPage"]<this.config["totalPages"].length){

    	   	       this.config["currentPage"]=this.config["endPage"]+1;
    	   			sign=true;
    	   	}
    	   if(sign){

	    	   	if(this.config["currentPage"]>=this.config["screenOnPage"]/2 && this.config["screenOnPage"]<this.config["totalPages"].length){
	        		this.config["startPage"]=this.config["currentPage"]-this.config["screenOnPage"]/2; //16
	        		this.config["endPage"]=this.config["startPage"]+this.config["screenOnPage"]<this.config["totalPages"].length?this.config["startPage"]+this.config["screenOnPage"]:this.config["totalPages"].length;
                    this.config["startPage"]=this.config["endPage"]-this.config["screenOnPage"]>0?this.config["endPage"]-this.config["screenOnPage"]:this.config["startPage"]
	        	}else{
	        		this.config["startPage"]=0;
	        		this.config["endPage"]=this.config["screenOnPage"];
	        	}
	        	
	        	this.myService.service("/customers/query","post",this.config).subscribe(
	               data=> {
	                   if(!!data){
	                   	 this.config["totalPages"]=[];
	                      this.appGlobal.toastTime=0.5;
	                      this.config["total"]=data.total;
	                      this.customers=data.data;
	                      for(var i=1;i<=Math.ceil(this.config["total"]/this.config["pageOnCount"]);i++){
	    					this.config["totalPages"].push(i);
	                      }
	                       this.config["endPage"]=this.config["totalPages"].length>this.config["endPage"]?this.config["endPage"]:this.config["totalPages"].length;
	                    
	                   }
	                 }
	                
	            );
    	   }
    	   
    }

}


