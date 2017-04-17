import { Component, OnInit,ViewChild } from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { DOCUMENT } from '@angular/platform-browser';
import { Observable} from 'rxjs/Observable';
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
 appGlobal = AppGlobal.getInstance();
 /*@ViewChild('all') elAll; */
 role:Object={};
 user:Object={};
 roles:any=[];
 users:any=[];
 perms:any=[];
 copyPerms:any=[];
 isStaff:String="Staff";
 isUser:number=-1;
 isRole:number=-1;
 allSelect:boolean=false;
 key:boolean=false;
 
  constructor(private myService:MyServiceService,private router:Router) {
  		 this.user["addressInfo"]= this.user["addressInfo"] || {};
  		 this.user["status"]="true";
  		 this.role["status"]="true";
   }

  ngOnInit() {
  	this.isStaff="Staff";
  	this.isUser=-1;
  	this.isRole=-1;
  	this.permsList();
  	this.rolesList();

  	this.usersList();
  		
  }
  openUR(){
  	 this.setPermsCheckBox(false,"ALL");
  	 if(this.isStaff=="Staff"){
  	 	this.setRolesCheckBox(false,"ALL");
  		this.user={};this.isUser=-1;
  		this.user["addressInfo"]={}
  		this.user["status"]="true";
  	}else{
		this.role={};this.isRole=-1;  		
		this.role["status"]="true";
  	}
  }
  saveUser(){
  	 
     this.user["roles"]=[];
     var permStr="";
  		for(var i=0;i<this.roles.length;i++){
                if(this.roles[i].key){
             		 	this.user["roles"].push(this.roles[i]._id);
             		 	permStr+=(this.roles[i].permissions.toString() || "");
             	}
		 	  
		  }

          this.user["permissions"]=[];
		  for(var i=0;i<this.perms.length;i++){
	              
			 	   	  for(var j=0;j<this.perms[i].perms.length;j++){
			 	   	  	 
	             		 if(permStr.indexOf(this.perms[i].perms[j].value) ==-1 && this.perms[i].perms[j].key==true){
	             		 	
	             		 	this.user["permissions"].push(this.perms[i].perms[j].value);	
	             		 }
	             		 
			 	  }

			 		
			}

     if(this.user["_id"]){

     	 console.log(this.user);
     	 this.myService.service("/admin/users/"+this.user["_id"],"put",this.user).subscribe(
               data=> {
                   if(!!data){
                     this.appGlobal.toastTime=0.5;
                     /*this.user=data;
                     this.user["addressInfo"]=this.user["addressInfo"] || {};
                     if(data.status!="true"){
                         this.user={};
                         this.isUser=-1;	
                     }*/
                     this.usersList();
                     //this.users.push(data);
                    
                     
                   }
                 }
                
            );

     }else{
     	 this.myService.service("/admin/users","post",this.user).subscribe(
               data=> {
                   if(!!data){
                     this.appGlobal.toastTime=0.5;
                     this.user=data;
                     this.isUser=this.users.length;
                     this.users.push(data);
                     
                     
                   }
                 }
                
            );
     }
    
    
  }
  saveRole(){
  		
  		
         this.role["permissions"]=[];
  		for(var i=0;i<this.perms.length;i++){
              
		 	   	  for(var j=0;j<this.perms[i].perms.length;j++){
             		 if(this.perms[i].perms[j].key){
             		 	
             		 	this.role["permissions"].push(this.perms[i].perms[j].value);
             		 }
		 	  }
		 		
		  }
	

if(this.role["_id"]){
  			this.myService.service("/admin/roles/"+this.role["_id"]	,"put",this.role).subscribe(
               data=> {
                   if(!!data){
                    this.appGlobal.toastTime=0.5;
                     this.role=data; 
                     if(data.status!="true"){
                         this.role={};
                         this.isRole=-1;	
                     }
                      this.rolesList();
                    
                     
                   }
                 }
                
            );
  		}else{
  				this.myService.service("/admin/roles","post",this.role).subscribe(
               data=> {
                   if(!!data){
                    this.appGlobal.toastTime=0.5;
                     this.role=data;
                     this.isRole=this.roles.length;
                     this.roles.push(data);
                      
                     
                   }
                 }
                
            );
  		}
        
  }
  rolesList(){
  	    
        this.myService.service("/admin/roles","get").subscribe(
               data=> {
                   if(!!data){
                      this.appGlobal.toastTime=0.5;
                      this.roles=data;
                      for(var i=0;i<data.length;i++){
                      	this.roles[i]["key"]=false;
                      }
          
                     
                   }
                 }
                
            );
  }
   usersList(){
  	    
        this.myService.service("/admin/users","get").subscribe(
               data=> {
                   if(!!data){
                      this.appGlobal.toastTime=0.5;

                      this.users=data;
                      console.log(this.users);
                      //this.roles.push(data);
                    	
                     
                   }
                 }
                
            );
  }
  permsList(){
  		
        this.myService.service("/admin/permissions","get").subscribe(
               data=> {
                   if(!!data){
                      this.appGlobal.toastTime=0.5;

                      this.perms=data;
                      console.log(this.perms);
                      
                      //this.roles.push(data);
                    	
                     
                   }
                 }
                
            );
  }
selectRole(item){
	
	this.role=JSON.parse(JSON.stringify(item));
	var permStr=this.role["permissions"].toString() || "";
    
        let timer = Observable.timer(10);
        timer.subscribe(t=> {
        if(this.isStaff=="Staff"){
        this.user["permissions"]= this.user["permissions"] || [];	
    	permStr=this.user["permissions"].toString() || "";
        for(var i=0;i<this.roles.length;i++){
    		
    		  
    		  if(this.roles[i]["key"]){

    		  		permStr+=(this.roles[i].permissions.toString() || "");
    		  }
    	}
      }
   for(var i=0;i<this.perms.length;i++){
	              
			 	   	  for(var j=0;j<this.perms[i].perms.length;j++){
			 	   	  	 
	             		 if(permStr.indexOf(this.perms[i].perms[j].value) !=-1){
	             		 	
	             		 	this.perms[i].perms[j].key=true;	
	             		 }else{
	             		 	this.perms[i].perms[j].key=false;
	             		 }
	             		 
			 	  }

			 		
			}

    });
}
selectUser(item){
	this.setPermsCheckBox(false,"ALL");
	this.user=JSON.parse(JSON.stringify(item));
	this.user["addressInfo"]=this.user["addressInfo"] || {};
	let rolesStr=this.user["roles"].toString() || "";
	let permsStr=this.user["permissions"].toString() || "";
	for(let i=0;i<this.roles.length;i++){
		 if(rolesStr.indexOf(this.roles[i]._id) !=-1){
		 	this.roles[i].key=true;	
             permsStr+=this.roles[i]["permissions"].toString() || "";


		 }else{
		 	this.roles[i].key=false;	
		 }
	}

	for(var i=0;i<this.perms.length;i++){
	              
			 	   	  for(var j=0;j<this.perms[i].perms.length;j++){
			 	   	  	 
	             		 if(permsStr.indexOf(this.perms[i].perms[j].value) !=-1){
	             		 	
	             		 	this.perms[i].perms[j].key=true;	
	             		 }else{
	             		 	this.perms[i].perms[j].key=false;
	             		 }
	             		 
			 	  }

			 		
			}
	
}
	all(event){
		  this.setPermsCheckBox(event.target.checked,"ALL");
	}
	groupAll(event,n){
		
		 	this.setPermsCheckBox(event.target.checked,n);
		 		
	}
    
	setPermsCheckBox(checked,n){
		
        if(n=="ALL"){
        	this.allSelect=checked;
        	for(var i=0;i<this.perms.length;i++){
	              this.perms[i].key=checked;
			 	   	  for(var j=0;j<this.perms[i].perms.length;j++){
	             		 this.perms[i].perms[j].key=checked;
			 	  }

			 		
			  }
			  console.log(this.perms);
        }else if(n>=0){
        	
        	for(var j=0;j<this.perms[n].perms.length;j++){
             		 this.perms[n].perms[j].key=checked;
		 	  }
        }
	}
setRolesCheckBox(checked,n){
		
        if(n=="ALL"){
        	
        	for(var i=0;i<this.roles.length;i++){
	             this.roles[i]["key"]=checked;
			 	   	
			 		
			 }
			  
        }else if(n>=0){
        	
        	for(var j=0;j<this.perms[n].perms.length;j++){
             		 this.perms[n].perms[j].key=checked;
		 	  }
        }
	}


}
