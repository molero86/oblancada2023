import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './services/login.service';
import { MenuService } from './services/menu.service';
import { Tabs } from './services/menu.service';
declare var $: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'oblancada2023';

  constructor(public loginService: LoginService, public menuService: MenuService, private route: Router) {
  }

  deferredInstallPrompt: any; // Store the beforeinstallprompt event


  ngOnInit(): void {
    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (event) => {
      // Prevent the default behavior to prevent the browser's default installation prompt
      event.preventDefault();

      // Store the event for later use
      this.deferredInstallPrompt = event;
    });
  }

  logOut()
  {
    $('#userModal').modal('toggle');
    this.loginService.logout();
  }

  changeTab(tab: Tabs)
  {
    switch(tab)
    {
      case Tabs.Home:
        this.menuService.setCurrentTab(tab);
        this.route.navigate(['/home']);
        break;
      case Tabs.Newsletter:
        this.menuService.setCurrentTab(tab);
        this.route.navigate(['/newsletter']);
        break;
      case Tabs.About:
        this.menuService.setCurrentTab(tab);
        this.route.navigate(['/about']);
        break;
      case Tabs.Users:
        this.menuService.setCurrentTab(tab);
        this.route.navigate(['/users']);
        break;
      case Tabs.OnePhoto:
        this.menuService.setCurrentTab(tab);
        this.route.navigate(['/organization']);
        break;

    }
  }

  capitalize(text: string | null) {
    if(text != undefined)
    {
      return text.charAt(0).toUpperCase() + text.slice(1);
    }
    else
    {
      return '';
    }
  }
}
