import { Injectable } from '@angular/core';
import { event } from "../interfaces/event";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(
    private storage: StorageService
  ) { }

  async getEvents(): Promise<event[]> {
    return await this.storage.get("events");
  }

  getEvent(id: number) {
    return this.defaultEvents.find(event => event.id == id)
  }

  async setNewEvent(event: event) {
    const newEvent: event = event;
    let events = await this.getEvents();
    console.log(events)
    if(!events || events.length === 0) {
      newEvent.id = 1;
    } else {
      newEvent.id = events[events.length-1].id!+1
    }
    events.push(event);
    this.storage.set("event", events);
    return newEvent.id
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
