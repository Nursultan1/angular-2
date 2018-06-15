import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from "@angular/router";

import { User } from '../shared/user'

import { UserService } from '../shared/user.service'




@Component({
    moduleId: module.id,
    selector: 'register',
    providers: [UserService],
    templateUrl: 'register.component.html',
    styleUrls: ['register.component.css']
})


export class RegisterComponent implements OnInit {

    constructor(private fb: FormBuilder, 
        private service:UserService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ){ }

    registerForm:FormGroup;
    user: User=new User();

    // Объект с ошибками, которые будут выведены в пользовательском интерфейсе
    formErrors = {
        "name": "",
        "last_name": "",
        "email": "",
        "password1": "",
        "password2": ""
    };

    // Объект с сообщениями ошибок
    validationMessages = {
        "name": {
            "required": "Обязательное поле.",
            "minlength": "Значение должно быть не менее 4х символов.",
            "maxlength": "Значение не должно быть больше 20 символов."
        },
        "last_name": {
            "required": "Обязательное поле.",
            "minlength": "Значение должно быть не менее 3х символов.",
        },
        "email": {
            "required": "Обязательное поле.",
            "pattern": "Не правильный формат email адреса.",
            "email": "Пользователь с таким Email адресом уже существует"
        },
        "password1": {
            "required": "Пароль не может быть пустым.",
            "minlength": "Значение должно быть не менее 6х символов.",
        },
        "password2": {
            "notEquivalent":"Пароли не совпадают.",
        },
    };

    ngOnInit(){
        this.buldForm();
    }
    buldForm(){
        this.registerForm=this.fb.group({
            "name":[this.user.name,[
                Validators.required,
                Validators.maxLength(20),
                Validators.minLength(4)
            ]],
            "last_name": [this.user.last_name,[
                Validators.required,
                Validators.minLength(3),
            ]],
            "email": [this.user.email, [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}")
            ]],
            "password1": [this.user.password1, [
                Validators.required,
                Validators.minLength(6),
            ]],
            "password2": [this.user.password2, [
                Validators.required,
                Validators.minLength(6),
            ]]
            
        },{validator: this.checkIfMatchingPasswords('password1', 'password2')});

        this.registerForm.valueChanges
            .subscribe(data => this.onValueChange(data));

        this.onValueChange();
    }
    checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
        return (group: FormGroup) => {
          let passwordInput = group.controls[passwordKey],
              passwordConfirmationInput = group.controls[passwordConfirmationKey];
          if (passwordInput.value !== passwordConfirmationInput.value) {
            return passwordConfirmationInput.setErrors({notEquivalent: true})
          }
          else {
              return passwordConfirmationInput.setErrors(null);
          }
        }
    }

    onValueChange(data?: any) {
        if (!this.registerForm) return;
        let form = this.registerForm;

        for (let field in this.formErrors) {
            this.formErrors[field] = "";
            // form.get - получение элемента управления
            let control = form.get(field);

            if (control && control.dirty && !control.valid) {
                let message = this.validationMessages[field];
                for (let key in control.errors) {
                    // console.log(field+":"+key);
                    this.formErrors[field] += message[key] + " ";
                }
            }
        }
    }


    onSubmit() {
        // console.log("submitted");
        // console.log(this.registerForm.value);
        this.service.register(this.registerForm.value).subscribe(
                response => this.chekResponse(response),
                error =>console.log(error)
            );
    }

    public goLogin() {
        this.router.navigate(["/login"]);
    }

    private chekResponse(response: any){
        let res=response.json();
        if(res.error){
            for(let key in res["errorMess"]){
                this.formErrors[key] += res.errorMess[key] + " ";
            }
        }
        else{
            alert('Вы успешно зарегистрированы');
            this.goLogin();
        }
    }
} 