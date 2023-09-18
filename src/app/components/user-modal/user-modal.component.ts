import { Component, HostListener, Input, OnInit } from '@angular/core';
import { LoginService, User } from 'src/app/services/login.service';
declare var $: any

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.css']
})
export class UserModalComponent implements OnInit {

  @Input() user : User | undefined;
  @Input() id: string = 'noId';
  @Input() isProfileModal: boolean = false;

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    $('#'+this.id).modal('hide');
    event.stopPropagation();
  }
  
  showConfidentialInfo = false;

  constructor(private loginService: LoginService) { 
    this.user = new User();
  }

  ngOnInit(): void {
  }

  closeSession(){
    this.closeModal();
    this.loginService.logout();
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

  closeModal()
  {
    $('#'+this.id).modal('toggle');
  }

  showOrHideConfidentialInfo()
  {
    this.showConfidentialInfo = !this.showConfidentialInfo;
  }
  

}
