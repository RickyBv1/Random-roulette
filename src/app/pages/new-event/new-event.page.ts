import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { event } from 'src/app/core/interfaces/event';
import { emptyParticipant } from 'src/app/core/interfaces/participant';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
  standalone: false,
})
export class NewEventPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  ) { }

  currentEvent: event = {
    title: "",
    participants: [emptyParticipant, emptyParticipant, emptyParticipant],
    date: new Date(),
  }

  today = new Date().toISOString();

  ngOnInit() {
  }

  discard() {
    this.navCtrl.navigateBack("");
  }

  save() {

  }

}
