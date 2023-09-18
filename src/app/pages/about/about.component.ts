import { Component, OnInit } from '@angular/core';
import { MenuService, Tabs } from 'src/app/services/menu.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private menuService: MenuService) {
    this.menuService.setCurrentTab(Tabs.About);
   }

  ngOnInit(): void {
  }

}
