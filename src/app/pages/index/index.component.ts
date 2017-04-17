import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import {Router}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';
import { AppGlobal } from '../../app-global';
import { AboutComponent } from '../about/about.component';
import { LocalStorageService } from 'angular-2-local-storage';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
appGlobal = AppGlobal.getInstance();
testList:any=[];
 constructor(private myService:MyServiceService,private router:Router, private storeService: LocalStorageService) { 

  	 this.testList=[
  	          {"name":"a","age":1},{"name":"a1","age":2},
  	          {"name":"a3","age":1},{"name":"a4","age":2},
  	          {"name":"a5","age":1},{"name":"a6","age":2},
  	          {"name":"a7","age":1},{"name":"a8","age":2}
  	       ]
   }

  ngOnInit() {
    
     if(!this.appGlobal.userInfo["accessToken"]){
     // this.router.navigate([this.storeService.get("QRC")]);
     }
     
     //console.log(this.storeService.get("QRCURL"));
  	//this.router.navigate(["about",{}]);
  	//this.router.navigate(['/about', {outlets: {'about'}}]);
//  	 this.router.navigate(["about"],{relativeTo:this.aRoute});
   // this.router.navigate(['home',{}] );//{ id:mobile.id }
     //callfirst() {
  //  this.value = 1;
   // this.router.navigate(['/second', {outlets: {'secondchild': [this.value]}}]);
  //}
    //this.router.navigate(['/speakers', {outlets: {'bio': [id]}}]);
  }
  linkTo(item){
    console.log(item)
  	
  	  this.router.navigate([item.url]);
  	    //,{relativeTo:this.aRoute}
    //    var json={"xx":"xx"}
  	//this.router.navigate(['/index/about/2',json]);

  }

}
