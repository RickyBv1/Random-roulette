import { Injectable } from '@angular/core';
import { event } from "../interfaces/event";

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  getEvents(): event[] {
    return this.defaultEvents;
  }

  getEvent(id: number) {
    return this.defaultEvents.find(event => event.id == id)
  }

  defaultEvents: event[] = [
      {
        id: 1,
        title: "Event N1",
        participants: [
          {
            name: "Ricky",
          },
          {
            name: "Joss",
            show: true,
            gives: "Ricky"
          }
        ],
        date: new Date(),
      },
      {
        id: 2,
        title: "Event N2",
        participants: [
          {
            name: "Joss"
          }
        ],
        date: new Date(),
      },
      {
        id: 3,
        title: "Event N3",
        participants: [
          {
            name: "Ricky"
          },
          {
            name:  "Joss"
          },
          {
            name:  "Elian"
          },
        ],
        date: new Date(),
      },
    ]

}
