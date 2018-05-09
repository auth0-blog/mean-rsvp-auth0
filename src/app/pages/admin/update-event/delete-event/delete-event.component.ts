import { Component, OnDestroy, Input } from '@angular/core';
import { EventModel } from './../../../../core/models/event.model';
import { Subscription } from 'rxjs';
import { ApiService } from './../../../../core/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event.component.html',
  styleUrls: ['./delete-event.component.scss']
})
export class DeleteEventComponent implements OnDestroy {
  @Input() event: EventModel;
  confirmDelete: string;
  deleteSub: Subscription;
  submitting: boolean;
  error: boolean;

  constructor(
    private api: ApiService,
    private router: Router
  ) { }

  removeEvent() {
    this.submitting = true;
    // DELETE event by ID
    this.deleteSub = this.api
      .deleteEvent$(this.event._id)
      .subscribe(
        res => {
          this.submitting = false;
          this.error = false;
          console.log(res.message);
          // If successfully deleted event, redirect to Admin
          this.router.navigate(['/admin']);
        },
        err => {
          console.error(err);
          this.submitting = false;
          this.error = true;
        }
      );
  }

  ngOnDestroy() {
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }

}
