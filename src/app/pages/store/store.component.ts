import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { AppGlobal } from '../../app-global';
import {Router,ActivatedRoute}  from '@angular/router';
import { MyServiceService } from '../../my-service.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {
   appGlobal = AppGlobal.getInstance();
   store:Object={};
   @ViewChild('uploadPic') uploadPic:ElementRef;
   @ViewChild('showPic') showPic:ElementRef;
   constructor(private myService:MyServiceService,private router:Router,public aRoute:ActivatedRoute) { }
   ngOnInit() {
  	this.aRoute.params.subscribe(params => {
  				this.store= JSON.parse(JSON.stringify(this.appGlobal.storeInfo));
  				if(!this.store["addressInfo"]) this.store["addressInfo"]={}; 
  				

  	})
  }
upload(event): void {
this.show(this.showPic,event.target.name);
}
show(pic,name):void{
 let file = this.uploadPic.nativeElement.files[0];
          var reader = new FileReader();
          reader.onload = function(e) {
          var dataURL = reader.result;
          
          pic.nativeElement.src=dataURL;
}
reader.readAsDataURL(file);
this.myService.upload("/uploadPic",file,name).subscribe(
               data=> {if(!!data && !!data.key){
               	this.store[data.key]=(data.value || "");

               	}}
               	
                 
               );

  }
uploadPicture(){
      this.uploadPic.nativeElement.click();
  }
  save(): void{
  	
  		this.myService.service("/stores","put",this.store).subscribe(
               data=>{this.store=(data || this.store);this.appGlobal.storeInfo=this.store;}
               
               );
  /*  }else{
  			this.myService.service("/stores","post",this.store).subscribe(
               data=>{this.store=(data || this.store)},
               err=>this.myService.toastError(err.message)
               );

   }*/
  	
  }
}
