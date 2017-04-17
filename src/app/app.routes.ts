
import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { AboutComponent } from './pages/about/about.component';
import { StoreComponent } from './pages/store/store.component';
import { StaffComponent } from './pages/staff/staff.component';
import { CustomerComponent } from './pages/customer/customer.component';
import { LicenseComponent } from './pages/license/license.component';
import { SettingComponent } from './pages/setting/setting.component';

export const routes: Routes = [
 { path: '', redirectTo: 'setting', pathMatch: 'full' },
 { path: 'setting', component: SettingComponent },
  { path: 'login', component: LoginComponent }
/*{path: '/setting/...', name: 'Home', component: HomeComponent}
{path: '/', redirectTo: ['']},
{path: '/user/...', name: 'User', component: UserComponent},
{path: '/404', name: 'NotFound', component: NotFoundComponent},

{path: '/*path', redirectTo: ['NotFound']}*/
 /*{ path: '', redirectTo: 'login', pathMatch: 'full' },*/
/*  {
    path: '', ,
    component: HomeComponent
  },*/
/*  { path: 'setting', component: SettingComponent },
  { path: 'login', component: LoginComponent },*/

 /* { path: 'about', component: AboutComponent },*/
  /*{ path: 'staff', component: StaffComponent },*/
  /*{ path: ':login', component: LoginComponent },
  { path: 'index', component: IndexComponent ,children: [
      { path: '', redirectTo: 'store', pathMatch: 'full' },
      { path: 'store', component: StoreComponent },
      { path: 'staff', component: StaffComponent},
      { path: 'customer', component:CustomerComponent},
      { path: 'license', component:LicenseComponent},

        
    ]},*/
//  { path: 'home', component: HomeComponent},
  //{ path: 'about', component: AboutComponent},
 /* { path: 'dogs', component: HomeComponent}*/
];
/* 
   import {ActivatedRoute} from "@angular/router";
   
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
   this.route.snapshot.params["id"]
https://plnkr.co/edit/gsJxf6ukOXd4kNjLLVR3?p=preview 路由实例
[routerLink]="['user', user.id, 'details']"
/user/:id/details
ngOnInit() {
  this.sub = this.router.routerState.parent(this.route).params.subscribe(params => {
    this.parentRouteId = +params["id"];
  });
 // 相当于window.location.href，界面跳转
        router.navigateByUrl('home')

 ngOnInit() {
    this.route.params.subscribe((values: {id: number}) => {
      this.currentvalue = values.id;
    })
  }
{ path: '**', component: PageNotFoundComponent }
  <h1>Angular Router</h1>
  <nav>
    <a routerLink="/crisis-center" routerLinkActive="active">Crisis Center</a>
    <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
  </nav>
  <router-outlet></router-outlet>


outlet: 'auxoutlet'{aux:'/auxRoute', name: 'AuxPath', component: SecondComponent}
import { ContactsListComponent } from './contacts-list';
import { ContactsDetailComponent } from './contacts-detail';
 callfirst() {
    this.value = 1;
    this.router.navigate(['/second', {outlets: {'secondchild': [this.value]}}]);
  }
 
callsecond() {
    this.value = 2;
    this.router.navigate(['/second', {outlets: {'secondchild': [this.value]}}]);
  }

<router-outlet name="firstchild"></router-outlet>
<router-outlet name="secondchild"></router-outlet>


 <li><a [routerLink]="['/second', {outlets: {firstchild: ['firstchildcomp'], secondchild: ['secondchildcomp']}}]">Secondscreen</a></li>
         this.router.navigate(['/second', {outlets: {'secondchild': [this.value]}}]);


export const ContactsAppRoutes = [
  { path: '', component: ContactsListComponent },
  { path: 'contacts/:id', component: ContactsDetailComponent }
];

3<button md-button
  [routerLink]="['/speakers', {outlets: {'list': ['speakersList'], 'bio': ['none']}}]">
  Speakers
</button>
4
5 {
    path: 'home',  // you can keep it empty if you do not want /home
    component: 'appComponent',
    children: [
        {
            path: '',
            component: childOneComponent,
            outlet: 'child1'
        },
        {
            path: '',
            component: childTwoComponent,
            outlet: 'child2'
        }
    ]
}
6
7<a [routerLink]="'/team/3(aux:/chat;open=true)'">Test</a>

<a [routerLink]="['/team/3', {outlets: {aux: 'chat'}}]">c</a>
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent }
];
const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'speakers', component: SpeakersComponent, children: [
    { path: 'speakersList', component: SpeakersListComponent, outlet: 'list' },
    { path: ':id', component: BioComponent, outlet: 'bio' }
  ] }
];
1.this.router.navigate(['user', 1]); 
以根路由为起点跳转

2.this.router.navigate(['user', 1],{relativeTo: route}); 
默认值为根路由，设置后相对当前路由跳转，route是ActivatedRoute的实例，使用需要导入ActivatedRoute

3.this.router.navigate(['user', 1],{ queryParams: { id: 1 } }); 
路由中传参数 /user/1?id=1

4.this.router.navigate(['view', 1], { preserveQueryParams: true }); 
默认值为false，设为true，保留之前路由中的查询参数/user?id=1 to /view?id=1

5.this.router.navigate(['user', 1],{ fragment: 'top' }); 
路由中锚点跳转 /user/1#top

6.this.router.navigate(['/view'], { preserveFragment: true }); 
默认值为false，设为true，保留之前路由中的锚点/user/1#top to /view#top

7.this.router.navigate(['/user',1], { skipLocationChange: true }); 
默认值为false，设为true路由跳转时浏览器中的url会保持不变，但是传入的参数依然有效

8.this.router.navigate(['/user',1], { replaceUrl: true }); 
未设置时默认为true，设置为false路由不会进行跳转
*/