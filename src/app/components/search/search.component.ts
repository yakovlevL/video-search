import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchQuery: string;
  visible: boolean = false;
  gridCard: boolean = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  getVideo(searchQuery): void {
    console.log(searchQuery);
  }

  clickMe(): void {
    this.visible = false;
  }

}
