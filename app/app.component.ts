import {
  Component
} from '@angular/core';
import {
  RouteConfig
} from '@angular/router-deprecated';
import {
  NS_ROUTER_DIRECTIVES, 
  NS_ROUTER_PROVIDERS
} from "nativescript-angular/router";
import {
  LoginComponent
} from "./pages/login/login.component";
import {
  ListComponent
} from './pages/list/list.component';
import {
  WindchimeComponent
} from './pages/windchime/windchime.component';
import {
  DocklayoutComponent
} from './pages/docklayout/docklayout.component';
import {
  GridComponent
} from './pages/gridlayout/gridlayout.component';
import {HTTP_PROVIDERS} from "@angular/http";

@Component({
  selector:'main',
  directives:[NS_ROUTER_DIRECTIVES],
  providers:[NS_ROUTER_PROVIDERS, HTTP_PROVIDERS],
  template: "<page-router-outlet></page-router-outlet>"
})
@RouteConfig([
  { path: "/Login", component: LoginComponent, name: "Login" },
  {path:'/List',component: ListComponent,name:'List'},
  {path:'/Windchime',component: WindchimeComponent,name:'Windchime'},
  {path:'/Docklayout',component: DocklayoutComponent,name:'Docklayout'},
  {path:'/Gridlayout',component: GridComponent,name:'Gridlayout',useAsDefault: true}
])
export class AppComponent {}