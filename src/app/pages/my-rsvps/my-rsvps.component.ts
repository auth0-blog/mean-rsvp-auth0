import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { AuthService } from './../../auth/auth.service';
import { ApiService } from './../../core/api.service';
import { UtilsService } from './../../core/utils.service';
import { FilterSortService } from './../../core/filter-sort.service';
import { Subscription } from 'rxjs/Subscription';
import { EventModel } from './../../core/models/event.model';

@Component({
  selector: 'app-my-rsvps',
  templateUrl: './my-rsvps.component.html',
  styleUrls: ['./my-rsvps.component.scss']
})
export class MyRsvpsComponent implements OnInit, OnDestroy {
  pageTitle = 'My RSVPs';
  eventListSub: Subscription;
  eventList: EventModel[];
  loading: boolean;
  error: boolean;
  userIdp: string;

  constructor(
    private title: Title,
    public auth: AuthService,
    private api: ApiService,
    public fs: FilterSortService,
    public utils: UtilsService) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
    this.userIdp = this._getIdp;
    this._getEventList();
  }

  private _getEventList() {
    this.loading = true;
    // Get events user has RSVPed to
    this.eventListSub = this.api
      .getUserEvents$(this.auth.userProfile.sub)
      .subscribe(
        res => {
          this.eventList = res;
          this.loading = false;
        },
        err => {
          console.error(err);
          this.loading = false;
          this.error = true;
        }
      );
  }

  private get _getIdp(): string {
    const sub = this.auth.userProfile.sub.split('|')[0];
    let idp = sub;

    if (sub === 'auth0') {
      idp = 'Username/Password';
    } else if (idp === 'google-oauth2') {
      idp = 'Google';
    } else {
      idp = this.utils.capitalize(sub);
    }
    return idp;
  }

  ngOnDestroy() {
    this.eventListSub.unsubscribe();
  }

}
