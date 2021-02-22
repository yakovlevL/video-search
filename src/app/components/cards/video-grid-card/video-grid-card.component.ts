import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-video-grid-card',
  templateUrl: './video-grid-card.component.html',
  styleUrls: ['./video-grid-card.component.scss']
})
export class VideoGridCardComponent implements OnInit {

  @Input() item;
  @Input() loading;
  constructor() { }

  ngOnInit(): void {
  }

}
