import { Component, Input, OnInit } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-newsletter-event',
  templateUrl: './newsletter-event.component.html',
  styleUrls: ['./newsletter-event.component.css']
})
export class NewsletterEventComponent implements OnInit {

  constructor() { }

  @Input('events') events : NewsletterEvent[] = [];

  currentImageUrl = '';

  ngOnInit(): void {
  }

  showInfo(eventId: string){
      $('#info' + eventId).modal('toggle');
  }

  showImage(modalId: string, imageUrl: string)
  {
    this.currentImageUrl = imageUrl;
    $('#' + modalId).modal('toggle');
  }

}

export class NewsletterEvent
{
  id: number = 0;
  hour: string = '';
  day: number = 0;
  title: string = '';
  description: string = '';
  imageUrl: string = '';
  info: string[] = [];
  users: string[] = [];
  isShown: boolean = false;
}
