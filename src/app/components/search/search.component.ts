import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  search: string;
  res: any;
  loading = false;

  constructor(private api: ApiService) {
  }

  ngOnInit(): void {
  }

  getSearch(event: Event): void {
    this.loading = true;
    this.api.getVideo(this.search)
      .subscribe(res => {
        this.res = res.items;
        this.loading = false;
      });
  }
}
