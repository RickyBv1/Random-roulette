import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { event } from '../core/interfaces/event';
import { EventsService } from '../core/services/events.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {

  events: event[];

  constructor(private es: EventsService) {
    this.events = es.getEvents();
  }



}
