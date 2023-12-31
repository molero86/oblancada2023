import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from './assets.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  isPromptPage: boolean  = false;

  validNames: string[] = [];
  password: string = '';
  users: User[] = [];

  currentName: string | null = null;
  currentPassword: string | null = null;
  currentUser: User | undefined = undefined;
  currentDescription : string | undefined = undefined;
  currentRole : string | undefined = undefined;
  currentImage: string | undefined = undefined;
  currentRoute: string | undefined = undefined;
  currentConfidentialInfo: string | undefined = undefined;
  sessionTimeMilliseconds: number = 7200000; // 120 * 60 * 1000 = 7200000

  private localStorageUserKey = 'Palencia2022UserName';
  private localStoragePasswordKey = 'Palencia2022Password';
  private localStorageWrongEnters = 'localStorageWrongEnters'; 
  private localStorageCurrentUserKey = 'Palencia2022User';
  private localStorageSessionValidUntilKey = 'Palencia2022SessionValidUntil';


  constructor(private injector: Injector, private route: Router, private http: HttpClient,
              private assetsService: AssetsService) { 
    this.loadConfiguration();
  }

  isLogged(){

    let sessionUntil = localStorage.getItem(this.localStorageSessionValidUntilKey);
    if(sessionUntil == undefined || +sessionUntil < new Date().getTime())
    {
      this.logout(true);
    }

    return this.currentName != null && this.currentPassword != null;
  }

  logout(withoutNavigation: boolean = false){
    localStorage.removeItem(this.localStorageUserKey);
    localStorage.removeItem(this.localStoragePasswordKey);
    localStorage.removeItem(this.localStorageCurrentUserKey);
    localStorage.removeItem(this.localStorageSessionValidUntilKey);

    this.currentName = null;
    this.currentPassword = null;
    this.currentDescription = undefined;
    this.currentImage = undefined;
    this.currentRole = undefined;
    this.currentRoute = undefined;
    this.currentConfidentialInfo = undefined;

    if(!withoutNavigation)
    {
      this.route.navigate(['/']);
    }
  }


  login(userName: string, password: string, ) : LoginResult{
    if(this.validNames.find(name => userName.toLowerCase() == name.toLowerCase()) == undefined)
    {
      //Wrong userName
      this.SetWrongEnters(userName, password);
      return LoginResult.WRONG_NAME;
    }
    if(password.toLowerCase() != this.password.toLowerCase())
    {
      //Wrong password
      this.SetWrongEnters(userName, password);
      return LoginResult.WRONG_PASSWORD;
    }
    else
    {
      localStorage.setItem(this.localStorageUserKey, userName);
      localStorage.setItem(this.localStoragePasswordKey, password);
      this.currentName = userName;
      this.currentPassword = password;
      this.currentUser = this.users.find(user => user.name.toLowerCase() == userName.toLowerCase());
      this.currentDescription = this.users.find(user => user.name.toLowerCase() == userName.toLowerCase())?.description;
      this.currentRole = this.users.find(user => user.name.toLowerCase() == userName.toLowerCase())?.role;
      this.currentImage = this.users.find(user => user.name.toLowerCase() == userName.toLowerCase())?.image;
      this.currentRoute = this.users.find(user => user.name.toLowerCase() == userName.toLowerCase())?.route;
      this.currentConfidentialInfo = this.users.find(user => user.name.toLowerCase() == userName.toLowerCase())?.confidentialInfo;
      localStorage.setItem(this.localStorageCurrentUserKey, JSON.stringify(this.currentUser));
      localStorage.setItem(this.localStorageSessionValidUntilKey, (new Date().getTime() + this.sessionTimeMilliseconds).toString());

      this.sendWrongPasswordsAuditEmail();

      return LoginResult.OK;
    }
  }

  private SetWrongEnters(userName: string, password: string) {
    var wrongEnters: any[] = [];
    var wrongEntersValue = localStorage.getItem(this.localStorageWrongEnters);

    if (wrongEntersValue != null) {
      wrongEnters = JSON.parse(wrongEntersValue);
    }

    wrongEnters.push({ 'name': userName, 'password': password , 'date': new Date()});
    localStorage.setItem(this.localStorageWrongEnters, JSON.stringify(wrongEnters));
  }

  loadConfiguration() {
    
    this.currentName = localStorage.getItem(this.localStorageUserKey);
    this.currentPassword = localStorage.getItem(this.localStoragePasswordKey);

    let http = this.injector.get(HttpClient);
    let loginConfigName = ''; 
    if(this.assetsService.isProduction)
    {
      loginConfigName = 'configuration/loginConfigProd.json';
    }
    else{
      loginConfigName = 'configuration/loginConfig.json';
    }
    return http.get(this.assetsService.buildAssetsPath(loginConfigName))
    .toPromise()
    .then((data:any) => {
      if(data != undefined)
      { 
        this.password = data.password; 
        data.validNames.forEach((name:string) => {
          this.validNames.push(name);
        });
        data.users.forEach((user:User) => {
          this.users.push(user);
        });

        if(this.currentName != null)
        {
                this.currentUser = this.users.find(user => user.name?.toLowerCase() == this.currentName?.toLowerCase());
                this.currentDescription = this.users.find(user => user.name?.toLowerCase() == this.currentName?.toLowerCase())?.description;
                this.currentRole = this.users.find(user => user.name?.toLowerCase() == this.currentName?.toLowerCase())?.role;
                this.currentImage = this.users.find(user => user.name?.toLowerCase() == this.currentName?.toLowerCase())?.image;
                this.currentRoute = this.users.find(user => user.name?.toLowerCase() == this.currentName?.toLowerCase())?.route;
                this.currentConfidentialInfo = this.users.find(user => user.name?.toLowerCase() == this.currentName?.toLowerCase())?.confidentialInfo;
        }
      }
    });
  }

  sendWrongPasswordsAuditEmail() {
    var message = localStorage.getItem(this.localStorageWrongEnters);

    if(message == undefined)
    {
      message = this.currentName + ' ha entrado con la contraseña correcta a la primera';
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http.post('https://formspree.io/f/xleypola',
      { email: 'molero3089@gmail.com', message: message },
      { 'headers': headers }).subscribe(
        response => {
          
        }
      );

    localStorage.removeItem(this.localStorageWrongEnters);
  }

}

export enum LoginResult {
  OK = 0,
  WRONG_NAME = 1,
  WRONG_PASSWORD = 2,
}

export class User {
  name: string = '';
  description: string = '';
  role: string = '';
  image: string = '';
  route: string = '';
  confidentialInfo: string = '';
}
