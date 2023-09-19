import { HttpClient } from '@angular/common/http';
import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NewsletterEvent } from 'src/app/components/newsletter-event/newsletter-event.component';
import { AssetsService } from 'src/app/services/assets.service';
import { LoginService } from 'src/app/services/login.service';
import { MenuService, Tabs } from 'src/app/services/menu.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent implements OnInit {

  events : NewsletterEvent[] = [];
  todayEvents : NewsletterEvent[] = [];
  selectedDay: number = 29;

  constructor(private injector: Injector, private loginService: LoginService, private route: Router, private menuService: MenuService,
              private assetsService: AssetsService) {
    this.menuService.setCurrentTab(Tabs.Newsletter);

    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});
   }

  ngOnInit(): void {

    if(!this.loginService.isLogged())
    {
      this.route.navigate(['/']);
    }

    this.loadEvents().then(res =>
      {
        this.changeDate(29);
      });
  }

  loadEvents() {
    let http = this.injector.get(HttpClient);
    return http.get(this.assetsService.buildAssetsPath('configuration/events.json'))
    .toPromise()
    .then((data:any) => {
      if(data != undefined)
      {  
          data.events.forEach((event:NewsletterEvent) => {
          event.isShown = (event.info != undefined && event.info !== []) && event.users.find(user => user.toLowerCase() == this.loginService.currentName?.toLowerCase()) != undefined;
          this.events.push(event);
        });
      }
    })
  }

  changeDate(day: number){
    this.selectedDay = day;
    this.todayEvents = this.events.filter(event => event.day == this.selectedDay);

    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
});

  } 

}
