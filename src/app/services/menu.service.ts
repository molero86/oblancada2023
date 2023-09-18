import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  private currentTab : Tabs = 0;

  constructor() { }

  getCurrentTab(): Tabs
  {
    return this.currentTab;
  }

  setCurrentTab(tab : Tabs)
  {
    this.currentTab = tab;
  }

}

export enum Tabs
{
  Home = 0,
  Newsletter=1,
  Users = 2,
  About = 3,
  OnePhoto = 4,
}
