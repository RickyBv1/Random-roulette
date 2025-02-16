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
    return await (this.storage.get("events")) || [];
  }

  async getEvent(id: number) {
    const events = await this.getEvents();
    return events.find(event => event.id == id)
  }

  async setNewEvent(event: event) {
    const newEvent: event = event;
    let events = await this.getEvents();
    console.log(events)
    if(events.length === 0) {
      newEvent.id = 1;
    } else {
      newEvent.id = events[events.length-1].id!+1
    }
    events.push(event);
    this.storage.set("event", events);
    return newEvent.id
  }

  drawEvent(event: event):event {
    const newEvent = event;

    let availableParticipants:string[] = [];
    event.participants.forEach((participant, i) => {
      if (participant.name === "") {
        newEvent.participants.splice(i, 1);
        availableParticipants.push(event.participants[i].name)
      } else {
        availableParticipants.push(participant.name)
      }

      let randomPosition:number;
      do{
        randomPosition = Math.floor(Math.random() * availableParticipants.length)
      }
      while(participant.name === availableParticipants[randomPosition]);
      participant.gives = availableParticipants[randomPosition]
    })
  }

}
