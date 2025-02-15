import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { event } from '../core/interfaces/event';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {

  constructor() {}

  events: event[] = [
    {
      title: "Event N1",
      participants: ["Ricky", "Joss"],
      date: new Date,
    },
    {
      title: "Event N2",
      participants: ["Joss"],
      date: new Date,
    },
    {
      title: "Event N3",
      participants: ["Ricky", "Joss", "Elian"],
      date: new Date,
    },
  ]

}
