import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { event } from 'src/app/core/interfaces/event';
import { emptyParticipant } from 'src/app/core/interfaces/participant';
import { EventsService } from 'src/app/core/services/events.service';
import { ToastService } from 'src/app/core/services/toast.service';

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
    private ts: ToastService,
    private alertController: AlertController
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
    const realParticipants = this.currentEvent.participants.filter(participant => participant.name !== "")
    if(realParticipants.length < 3) return this.alertMissingParticipants();
    const raffledEvent = this.es.drawEvent(this.currentEvent)
    await this.es.setNewEvent(raffledEvent);
    this.ts.presentToast("Event created successfully")
    this.navCtrl.navigateBack("");
  }

  addParticipantSpace() {
    this.currentEvent.participants.push({...emptyParticipant})
  }

  deleteParticipantSpace(i: number) {
    this.currentEvent.participants.splice(i, 1);
  }

  async alertMissingParticipants() {
    const alert = await this.alertController.create({
      header: 'Missing participants',
      message: 'An event needs at least three participants',
      buttons: ['OK'],
    });

    await alert.present();
  }

}
