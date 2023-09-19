import { Component, OnInit } from '@angular/core';
import { AssetsService } from 'src/app/services/assets.service';

@Component({
  selector: 'app-one-photo',
  templateUrl: './one-photo.component.html',
  styleUrls: ['./one-photo.component.css']
})
export class OnePhotoComponent implements OnInit {

  constructor(public assetsService: AssetsService) { }

  ngOnInit(): void {
  }

}
