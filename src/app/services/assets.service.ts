import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {

  private isProduction: boolean = true;

  constructor() { }

  public getAssetsPath(){
    return this.isProduction ? "/oblancada2023/assets/" : "/assets/";
  }

  public buildAssetsPath(path: string){  
    return this.getAssetsPath() + path;
  }

}
