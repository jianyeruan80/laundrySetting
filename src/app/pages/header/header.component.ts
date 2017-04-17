import { Component, OnInit } from '@angular/core';
import { AppGlobal } from '../../app-global';
import { LocalStorageService } from 'angular-2-local-storage';
import {Router}  from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  appGlobal = AppGlobal.getInstance();
  constructor(private storeService: LocalStorageService,private router:Router) { }

  ngOnInit() {
  }
  exit(){
    this.appGlobal.userInfo={};
    this.router.navigate([this.storeService.get("QRC")]);
  }
}


/*import { Component,Output,Directive,EventEmitter, ElementRef, Input ,ViewChild,Renderer,OnInit} from '@angular/core';
import { NavController, NavParams,Content} from 'ionic-angular';
import { AppGlobal } from '../../app/app-global';

import { MyService } from '../../providers/my-service';
import {Location} from '@angular/common';
import { LoginPage } from '../../pages/login/login';


@Component({
	
  selector: 'page-header',
  templateUrl: 'header.html',
  providers: [AppGlobal]
  
  
})
 
export class HeaderPage implements  OnInit{
@Output() parentNav:EventEmitter<string>= new EventEmitter();
appGlobal = AppGlobal.getInstance();  
navFirst:string="Store";
 constructor(private nyService: MyService,private navCtrl: NavController) {}
 ngOnInit(){
   this.appGlobal.navInfo=["Store","Option","Menu","Order","Customer","Report","Permission"];
 }
navs(navName:string){
  //console.log(event.target)
 
  this.parentNav.emit(navName);
    //this.navCtrl.push(IndexPage,{})}
}
exit(){
    this.appGlobal.userInfo={};
    this.navCtrl.setRoot(LoginPage);
}
language(){
  
}
}
*/