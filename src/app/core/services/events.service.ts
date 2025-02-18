import { Injectable } from '@angular/core';
import { eventsList } from 'src/assets/fakeData';
import { event } from "../interfaces/event";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor(private storage: StorageService) { }

  async getEvents(filter: "active" | "ended" | "all" = "all"): Promise<event[]> {
    const events = await this.storage.get("events") || [];
    switch(filter) {
      case "all": 
        return events;
      case "active": 
        return events.filter((event:event) => event.ended !== true);
      case "ended": 
        return events.filter((event:event) => event.ended === true);
    }
  }

  async getEventById(id: number) : Promise<event | undefined> {
    const events = await this.getEvents("all");
    const selectedEvent = events.find(event => event.id == id)
    return selectedEvent;
  }

  async setNewEvent(event: event): Promise<number> {
    const newEvent = event;
    let currentEvents: event[] = await this.getEvents("all");
    if(!currentEvents || currentEvents.length === 0) {
      currentEvents = []
      newEvent.id = 1;
    } else {
      newEvent.id = currentEvents[currentEvents.length-1].id!+1
    }
    currentEvents.push(newEvent);
    this.storage.set("events", currentEvents);
    return newEvent.id
  }


  async editEvent(editEvent: event) {
    const events:event[] = await this.storage.get("events");
    const newEvents: event[] = events.filter((event: event) => event.id != editEvent.id);
    events.forEach(event => {
      event.participants.forEach(participant => participant.show = false)
    });
    newEvents.push(editEvent);
    newEvents.sort((a, b) => a.id! - b.id!)
    this.storage.set("events", newEvents);
    return
  }

  async deleteEvent(id: number) {
    const events = await this.storage.get("events");
    const newEvents = events.filter((event:event) => event.id != id);
    this.storage.set("events", newEvents);
  }

  drawEvent(event: event):event {
    const newEvent = event;
    let availableParticipants:string[] = [];
    
    event.participants.forEach((participant, i) => {
      if (participant.name === "") {
        event.participants.splice(i, 1);
        availableParticipants.push(event.participants[i].name)
      } else {
        availableParticipants.push(participant.name)
      }
    })

    newEvent.participants.forEach((participant) => {
      let randomPosition:number | undefined;
      do{
        randomPosition = Math.floor(Math.random() * availableParticipants.length)
      }
      while(participant.name === availableParticipants[randomPosition]);
      participant.gives = availableParticipants[randomPosition]
      availableParticipants.splice(randomPosition, 1);
    })
    return newEvent;
  }

}
