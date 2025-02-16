import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { event } from '../core/interfaces/event';
import { EventsService } from '../core/services/events.service';
import { ViewWillEnter } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage implements ViewWillEnter {

  events?: event[];

  constructor(
    private es: EventsService
  ) {}
  ionViewWillEnter(): void {
    this.es.getEvents().then(events => {
      this.events = events ? events : [];
    })
  }



}
