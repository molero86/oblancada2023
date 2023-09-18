import { Component, HostListener, Input, OnInit } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.css']
})
export class ImageModalComponent implements OnInit {

  @Input() id: string ='';
  @Input() imageUrl : string = '';

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    $('#'+this.id).modal('hide');
    event.stopPropagation();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
