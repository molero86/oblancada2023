import { Component, OnInit } from '@angular/core';
import { AssetsService } from 'src/app/services/assets.service';
import { LoginService } from 'src/app/services/login.service';
import { MenuService, Tabs } from 'src/app/services/menu.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public loginService: LoginService, private menuService: MenuService, public assetsService: AssetsService) { 
    this.menuService.setCurrentTab(Tabs.Home);
  }

  ngOnInit(): void {
  }

}
