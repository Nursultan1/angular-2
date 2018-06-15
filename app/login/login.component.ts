import { Component } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from "@angular/router";


import { User } from '../shared/user'
import { UserService } from '../shared/user.service'

@Component({
    moduleId: module.id,
    selector: 'login', 
    providers: [UserService],                      // Селектор, который определяет какой элемент DOM дерева будет представлять компонент.
    templateUrl: 'login.component.html',
    styleUrls: ['login.component.css']
})


export class LoginComponent {

    errorMess:string ="";

    constructor(private fb: FormBuilder,
                private service: UserService,
                private router: Router
    ){ }

    loginForm: FormGroup;
    user: User = new User();

    // Объект с ошибками, которые будут выведены в пользовательском интерфейсе
    formErrors = {
        "email": "",
        "password": "",
    };

    // Объект с сообщениями ошибок
    validationMessages = {
        "email": {
            "required": "Введите Email",
            "pattern": "Не правильный формат email адреса.",
        },
        "password": {
            "required": "Введите пароль"
        },
    };

    ngOnInit(){
        this.buldForm();
    }
    buldForm(){
        this.loginForm=this.fb.group({
            "email": [this.user.email, [
                Validators.required,
                Validators.pattern("[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}")
            ]],
            "password": [this.user.password1, [
                Validators.required,
            ]]
            
        });

        this.loginForm.valueChanges
            .subscribe(data => this.onValueChange(data));

        this.onValueChange();
    }


    onValueChange(data?: any) {
        this.errorMess="";
        if (!this.loginForm) return;
        let form = this.loginForm;

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
        this.service.login(this.loginForm.value).subscribe(
                response => this.chekResponse(response),
                error =>console.log(error)
            );
    }


    private chekResponse(response: any){
        let res=response.json();
        console.log(res);
        if(res.error){
            this.errorMess=res.errorMess
        }
        else{
            alert('Вы успешно авторизованы');
            this.router.navigate(["/home", res.user ]);
        }
    }
};