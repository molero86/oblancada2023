import { Component, OnInit } from '@angular/core';
import { LoginService, User } from 'src/app/services/login.service';
import { MenuService, Tabs } from 'src/app/services/menu.service';
declare var $: any

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : User[][] = [];

  constructor(private loginService: LoginService, private menuService: MenuService) {
    this.menuService.setCurrentTab(Tabs.Users);

    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});
   }

  ngOnInit(): void {

    let counter = 0;
    let userArray: User[] = [];

    let usersSorted = this.loginService.users.sort((n1,n2) => {
        if (n1.name > n2.name) {
            return 1;
        }

        if (n1.name < n2.name) {
            return -1;
        }

        return 0;
    });

    usersSorted.forEach((user: User) =>
      {
        userArray.push(user);
        counter++;

        if((counter != 0 && counter % 3 == 0) || counter == this.loginService.users.length)
        {
          this.users.push(userArray);
          userArray = [];
        }
      });
  }

  toggleModal(id : string){
    $('#'+id).modal('toggle');
  }

}
