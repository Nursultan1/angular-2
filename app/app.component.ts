

// импорт декоратора Component из модуля @angular/core
import { Component } from '@angular/core';


import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';


@Component({
  moduleId: module.id,
  selector: 'my-app',                       
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent { } // Класс определяющий поведение компонента
