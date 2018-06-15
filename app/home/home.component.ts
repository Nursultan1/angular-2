import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { User } from '../shared/user'
import { UserService } from '../shared/user.service'
import { ActivatedRoute } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'home', 
    providers: [UserService],                      // Селектор, который определяет какой элемент DOM дерева будет представлять компонент.
    templateUrl: 'home.component.html',
    styleUrls: ['home.component.css']
})


export class HomeComponent implements OnInit {
    id:number;

    constructor(private fb: FormBuilder,
                private service: UserService,
                private activateRoute: ActivatedRoute){

        this.id = activateRoute.snapshot.params['id'];
    }

    errorMess:string ="";
    showingModalWindow:boolean=false;
    editPassword:boolean=false;
    editData:boolean=false;

    editForm: FormGroup;
    editPasswordForm: FormGroup;
    currentUser: User = new User();

    // Объект с ошибками, которые будут выведены в пользовательском интерфейсе
    formErrors = {
        "name": "",
        "last_name": "",
        "email": "",
        "password": "",
        "password1": "",
        "password2": "",
    };

    // Объект с сообщениями ошибок
    validationMessages = {
        "name": {
            "required": "Имя не может быть пустым.",
            "minlength": "Значение должно быть не менее 4х символов.",
        },
        "last_name": {
            "required": "Фамилия не может быть пустым",
            "minlength": "Значение должно быть не менее 3х символов.",
        },
        "email": {
            "required": "Email не может быть пустым",
            "pattern": "Не правильный формат email адреса.",
        },
        "password": {
            "required": "Пароль не может быть пустым.",
            "minlength": "Значение должно быть не менее 6 символов.",
        },
        "password1": {
            "required": "Пароль не может быть пустым.",
            "minlength": "Значение должно быть не менее 6 символов.",
        },
        "password2": {
            "notEquivalent":"Пароли не совпадают.",
        },
    };

    ngOnInit(){
        this.service.getUserById(this.id).subscribe(
            response => this.chekResponse(response),
            error =>console.log(error)
        );
    }
    buldForm(){
        this.editForm=this.fb.group({
            "name":[this.currentUser.name,[
                Validators.required,
                Validators.minLength(4)
            ]],
            "last_name": [this.currentUser.last_name,[
                Validators.required,
                Validators.minLength(3),
            ]],
            "email": [this.currentUser.email, [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}")
            ]]
        });
        this.editForm.valueChanges
            .subscribe(data => this.onValueChange(data));

        this.onValueChange();



        //форма для изменения пароля

        this.editPasswordForm=this.fb.group({
            "password": [this.currentUser.password, [
                Validators.required,
                Validators.minLength(6),
            ]],
            "password1": [this.currentUser.password1, [
                Validators.required,
                Validators.minLength(6),
            ]],
            "password2": [this.currentUser.password2, [
                Validators.required,
                Validators.minLength(6),
            ]]
        },{validator: this.checkIfMatchingPasswords('password1', 'password2')});

        this.editPasswordForm.valueChanges
            .subscribe(data => this.onValueChangePassword(data));

        this.onValueChangePassword();
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
        this.errorMess="";
        if (!this.editForm) return;
        let form = this.editForm;

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
    onValueChangePassword(data?: any) {
        this.errorMess="";
        if (!this.editPasswordForm) return;
        let form = this.editPasswordForm;

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

    onSubmitPassword(){
        console.log(this.editPasswordForm.value);

        this.service.updatePassword(this.editPasswordForm.value, this.id).subscribe(
            response => {
                let res=response.json();
                //console.log(res)
                if(res.error){
                    this.errorMess=res.errorMess
                }
                else{
                    this.showingModalWindow=false;
                    this.editPassword=false;
                    for(let key in this.editPasswordForm.value){
                        this.editPasswordForm.value[key]="";
                        this.currentUser[key]="";
                    }

                }
            },
            error =>console.log(error)
        );
    }

    onSubmit() {
        this.service.update(this.editForm.value, this.id).subscribe(
                response => {
                    let res=response.json();
                    console.log(res)
                    if(res.error){
                        this.errorMess=res.errorMess
                    }
                    else{
                        this.currentUser=this.editForm.value;
                        this.showingModalWindow=false;
                        this.editData=false;
                    }
                },
                error =>console.log(error)
            );
    }

    private chekResponse(response: any){
        let res=response.json();
        //console.log("res:");
        //console.log(res);
        if(res.error){
            this.errorMess=res.errorMess
        }
        else{
            for(let key in res.user){
                this.currentUser[key]=res.user[key]
            }
            // this.currentUser.id=res.user.id;
            // this.currentUser.name=res.user.name;
            // this.currentUser.last_name=res.user.last_name;
            // this.currentUser.email=res.user.email;

            this.buldForm();
        }
    }


} 