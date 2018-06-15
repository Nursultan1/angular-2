import { Injectable } from "@angular/core";
import { Http,Headers, Response, RequestOptions} from "@angular/http";
import { User } from "./user";
import { URLSearchParams } from "@angular/http"

import { Observable } from "rxjs/Observable"

@Injectable()
export class UserService{

    private urlRegister="http://angular/api/register.php";
    private urlLogin="http://angular/api/login.php";
    private urlGetUser="http://angular/api/get-current-user.php?id=";
    private urlUpdateData="http://angular/api/update.php";
    private urlUpdatePassvord="http://angular/api/update.password.php";

    constructor(private http:Http){}

    public register(user: User) {
        // console.log("user");
        // console.log(user);

        let data = new URLSearchParams();
        data.append('name', user.name);
        data.append('last_name', user.last_name);
        data.append('email', user.email);
        data.append('password1', user.password1);
        data.append('password2', user.password2);

        return this.http.post(this.urlRegister, data).catch(this.handleError);
        
    }

    
    private handleError(error: any, cought: Observable<any>): any {
        let message = "";

        if (error instanceof Response) {
            let errorData = error.json().error || JSON.stringify(error.json());
            message = `${error.status} - ${error.statusText || ''} ${errorData}`
        } else {
            message = error.message ? error.message : error.toString();
        }

        console.error(message);

        return Observable.throw(message);
    }


    public login(user: User){

        console.log("user");
        console.log(user)

        let data = new URLSearchParams();
        data.append('email', user.email);
        data.append('password', user.password);

        return this.http.post(this.urlLogin, data).catch(this.handleError);
    }

    public getUserById(id:number){
        return this.http.get(this.urlGetUser+id).catch(this.handleError);
    }

    public update(user: User, id:number){

        //console.log(user);
        let data = new URLSearchParams();
        for(let key in user){
            data.append(key, user[key]);
        }
        data.append('id', id.toString());
        //console.log("data");
        //console.log(data);

        return this.http.post(this.urlUpdateData, data).catch(this.handleError);
    }
    public updatePassword(user: User, id:number){

        //console.log(user);
        let data = new URLSearchParams();
        for(let key in user){
            data.append(key, user[key]);
        }
        data.append('id', id.toString());
        console.log(data);

        return this.http.post(this.urlUpdatePassvord, data).catch(this.handleError);
    }
}