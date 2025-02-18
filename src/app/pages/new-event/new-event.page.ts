import { Component } from '@angular/core';
import { AlertController, NavController, ToastController } from '@ionic/angular';
import { event } from 'src/app/core/interfaces/event';
import { emptyParticipant } from 'src/app/core/interfaces/participant';
import { EventsService } from 'src/app/core/services/events.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.page.html',
  styleUrls: ['./new-event.page.scss'],
  standalone: false
})
export class NewEventPage {

  today: string;

  constructor(
    private navCtrl: NavController,
    private es: EventsService,
    private ts: ToastService,
    private alertController: AlertController
  ) {
    this.today = new Date().toISOString()
  }

  currentEvent: event = {
    title: "",
    participants: [{...emptyParticipant}, {...emptyParticipant}, {...emptyParticipant}],
    date: new Date(),
  }

  discard() {
    this.navCtrl.navigateRoot("");
  }

  changeDate(dateStr: any) {
    this.currentEvent.date = new Date(dateStr.detail.value);
  }
  
  async saveForm() {
    const realParticipants = this.currentEvent.participants.filter(participant => participant.name !== "");
    if(realParticipants.length < 3) return this.alertMissingParticipants();
    const raffledEvent = this.es.drawEvent(this.currentEvent)
    const idEvent = await this.es.setNewEvent(raffledEvent)
    this.ts.defaultToast("Event added!");
    this.navCtrl.navigateForward(['events', idEvent])
  }

  async alertMissingParticipants() {
    const alert = await this.alertController.create({
      header: 'Missing participants',
      message: 'An event needs at least three participants',
      buttons: ['OK'],
    });

    await alert.present();
  }

  addParticipantSpace() {
    this.currentEvent.participants.push({...emptyParticipant})
  }

  deleteParticipantSpace(i: number) {
    const newParticipants = Array.from(this.currentEvent.participants);
    newParticipants.splice(i, 1);
    this.currentEvent.participants = newParticipants
  }


}
