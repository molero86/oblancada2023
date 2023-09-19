import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssetsService } from 'src/app/services/assets.service';
import { LoginResult, LoginService } from 'src/app/services/login.service';
import { MenuService, Tabs } from 'src/app/services/menu.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private injector: Injector, private route: Router, private loginService: LoginService, private menuService: MenuService,
              private assetsService: AssetsService) { }

  userName = '';
  userPassword='';
  userAcceptPolicies = false;
  wrongName = 0;
  wrongPassword=0;
  policyRead = false;
  showPolicyAdvertisment = false;
  showAcceptPolicyAdvertisment = false;

  policyTitle="Términos y condiciones (CSL reg)";
  policyText: string[] = [];


  ngOnInit(): void {

    this.loadPolicies();
    if(this.loginService.isLogged())
    {
      this.route.navigate(['/newsletter']);
    }

  }

  onSubmit()
  {
    var canPass = true;
    
    if(!this.policyRead)
    {
      this.showPolicyAdvertisment = true;
      canPass = false;
    }
    if(!this.userAcceptPolicies)
    {
      this.showAcceptPolicyAdvertisment = true;
      canPass = false;
    }

    if(canPass)
    {
      let loginResult = this.loginService.login(this.userName, this.userPassword)
      if(loginResult != LoginResult.OK)
      {
        if(loginResult == LoginResult.WRONG_NAME)
        {
          this.wrongName ++;
          canPass = false;
        }
        if(loginResult == LoginResult.WRONG_PASSWORD)
        {
          this.wrongName = 0;
          this.wrongPassword ++;
          canPass = false;
        }
      }
      else{
         //Navigate to other component
         this.menuService.setCurrentTab(Tabs.Home);
         this.route.navigate(['/home']);
      }
    }
  }

  modalClicked(){
    this.policyRead = true;
    this.showPolicyAdvertisment = false;
  }

  acceptPolicies()
  {
    this.showAcceptPolicyAdvertisment = this.userAcceptPolicies;
  }

  loadPolicies() {
    let http = this.injector.get(HttpClient);

    return http.get(this.assetsService.buildAssetsPath('configuration/privacyPolicy.json'))
    .toPromise()
    .then((data:any) => {
      if(data != undefined)
      {  
        data.policies.forEach((policy:any) => {
          this.policyText.push(policy);
        });
      }
    })
  }
}
