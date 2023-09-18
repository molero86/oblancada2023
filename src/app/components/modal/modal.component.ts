import { Component, HostListener, Input, OnInit } from '@angular/core';
declare var $: any

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input('id') modalId : string = '';
  @Input('title') modalTitle : string = '';
  @Input('body') modalBody : string[] = [];

  @HostListener('window:popstate', ['$event'])
  onPopState(event: any) {
    $('#'+this.modalId).modal('hide');
    event.stopPropagation();
  }

  constructor() { }

  ngOnInit(): void {
  }

}
