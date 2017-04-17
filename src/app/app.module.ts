import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule} from "@angular/router";
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { LoginComponent } from './pages/login/login.component';
import { IndexComponent } from './pages/index/index.component';

import { routes } from './app.routes';

import { AppGlobal } from './app-global';
import { MyServiceService } from './my-service.service';

import { LocalStorageModule } from 'angular-2-local-storage';

//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { FilterPipe } from './pipes/filter.pipe';
import { AboutComponent } from './pages/about/about.component';
import { LeftComponent } from './pages/left/left.component';
import { RightComponent } from './pages/right/right.component';
import { StoreComponent } from './pages/store/store.component';
import { StaffComponent } from './pages/staff/staff.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LicenseComponent } from './pages/license/license.component';
import { SettingComponent } from './pages/setting/setting.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    IndexComponent,
    FilterPipe,
    AboutComponent,
    LeftComponent,
    RightComponent,
    StoreComponent,
    StaffComponent,
    CustomerComponent,
    LicenseComponent,
    SettingComponent
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
   
    RouterModule.forRoot(routes,{ useHash: true }), // <-- installs Router routes, components and servicesRouterModule.forRoot(ROUTES ,{ useHash: true }),]
    LocalStorageModule.withConfig({
            prefix: '',
            storageType: 'localStorage'
      }) 
    
  ],
  providers: [AppGlobal, MyServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
