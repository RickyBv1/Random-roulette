import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { event } from 'src/app/core/interfaces/event';
import { emptyParticipant } from 'src/app/core/interfaces/participant';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
  standalone: false,
})
export class NewEventPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private es: EventsService,
  ) { }

  currentEvent: event = {
    title: "",
    participants: [{...emptyParticipant}, {...emptyParticipant}, {...emptyParticipant}],
    date: new Date(),
  }

  today = new Date().toISOString();

  ngOnInit() {
  }

  discard() {
    this.navCtrl.navigateBack("");
  }

  changeDate(dateEvent: any) {
    this.currentEvent.date = new Date(dateEvent.detail.value);
  }
  
  async save() {
    await this.es.setNewEvent(this.currentEvent);
    this.navCtrl.navigateBack("");
  }

}
