import { Component,} from '@angular/core';
import { EventsService } from '../../core/services/events.service';
import { ViewWillEnter } from '@ionic/angular';
import { howLongFromPastDate } from '../../core/helpers/time';
import { StorageService } from '../../core/services/storage.service';
import { eventsList } from 'src/assets/fakeData';
import { event, defaultEvent } from '../../core/interfaces/event';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements ViewWillEnter {
  filter: "active" | "ended" | "all" = "active"

  constructor(
    private storage:StorageService,
    private es: EventsService
  ) {}
  
  ionViewWillEnter(): void {
    this.getEvents(this.filter);
  }

  async getEvents(filter: "active" | "ended" | "all" = "active") {
    const events: event[] = await this.es.getEvents(filter)
    this.events =events
  }

  events:event[] = eventsList;

  // rtf = new Intl.RelativeTimeFormat("en", {
  //   localeMatcher: 'best fit',
  //   numeric: 'always',
  //   style: 'long'
  // })

  getDaysUntilEvent(eventDate: Date) {
    return howLongFromPastDate(eventDate);
    // const today = new Date().getTime()
    // const betweenDays = (eventDate.getTime() - today)/(1000 * 60 * 24);
    // if(Math.abs(betweenDays) > 1) {
    //   return this.rtf.format(betweenDays, "days")
    // } else {
    //   return "today"
    // }
  }

}
