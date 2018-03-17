import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { FilterSortService } from './../../core/filter-sort.service';
import { Subscription } from 'rxjs/Subscription';
import { EventModel } from './../../core/models/event.model';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit ,OnDestroy {
  pageTitle = 'User-List';
  userListSub: Subscription;
  userList: EventModel[];
  loading: boolean;
  error: boolean;


  constructor(
    private title: Title,
    public utils: UtilsService,
    private api: ApiService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this._getEventList();
  }
  
  private _getEventList() {
    this.loading = true;
    // Get event created by user
    this.userListSub = this.api
      .getUserList$()
      .subscribe(
        res => {
          this.userList = res;
          this.loading = false;
        },
        err => {
          this.loading = false;
          this.error = true;
        }
      );
  }

   ngOnDestroy() {
    this.userListSub.unsubscribe();
  }
}
