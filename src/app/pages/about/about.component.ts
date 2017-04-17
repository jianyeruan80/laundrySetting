import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(public aroute:ActivatedRoute) { 
  	        
   }

  ngOnInit() {
  	  this.aroute.params.subscribe(params => {
              console.log(params);
           });
  }

}

/* import {ActivatedRoute} from "@angular/router";
   
   export class AboutList {
       id: Object;
       constructor(public route:ActivatedRoute) {
           this.id = {};
       }
       ngOnInit() {
           this.route.params.subscribe(params => {
               this.id = params  // {id: "xxx"}
           });
       }
   }
   
   
   直接获取id值
   this.route.snapshot.params["id"]*/