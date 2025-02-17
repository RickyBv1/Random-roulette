import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { event } from '../core/interfaces/event';
import { EventsService } from '../core/services/events.service';
import { ViewWillEnter } from '@ionic/angular';
import { howLongFromPastDate } from '../core/helpers/time';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements ViewWillEnter {

  events?: event[];
  filter: "active" | "ended" | "all" = "active"

  constructor(
    private es: EventsService
  ) {}
  
  ionViewWillEnter(): void {
    this.getEvents();
  }

  getEvents() {
    this.es.getEvents(this.filter).then(events => {
      this.events = events ? events : [];
    })
  }

  getDaysUntilEvent(eventDate: Date) {
    return howLongFromPastDate(eventDate)
  }

}
