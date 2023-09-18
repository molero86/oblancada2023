import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs';

@Component({
  selector: 'app-prompt-slide',
  templateUrl: './prompt-slide.component.html',
  styleUrls: ['./prompt-slide.component.css']
})
export class PromptSlideComponent implements OnInit {

  @Input() Icon : string = 'fas fa-ban';
  @Input() Text : string = '';
  @Input() IsLast : boolean = false;

  showButton : boolean = false;

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  ngAfterViewChecked(): void {
    this.showButton = this.IsLast;
  }

  goLogin(){
    this.route.navigate(['/login']);
  }

}
