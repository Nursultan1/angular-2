// Класс AppModule - точка входа в данное приложение 

import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {ReactiveFormsModule} from '@angular/forms';
import { HttpModule } from "@angular/http";


import { AppComponent }   from './app.component';

import { RegisterComponent }   from './register/register.component';
import { LoginComponent }   from './login/login.component';
import { HomeComponent }   from './home/home.component';
import { UserService }   from './shared/user.service';


@NgModule({
  imports:[ 
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot([

      { path: "home/:id", component: HomeComponent }, //маршруты
      { path: "register", component: RegisterComponent },
      { path: "login", component: LoginComponent },
      { path: "", redirectTo: "login", pathMatch: "full" }

    ]),
  
  ],
  declarations: [ AppComponent, RegisterComponent, LoginComponent, HomeComponent ], 
  bootstrap:    [ AppComponent ], 
  providers: [UserService]
})

export class AppModule { } 
