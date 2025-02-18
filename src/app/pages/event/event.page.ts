import { Component, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController, } from '@ionic/angular';
import { event } from 'src/app/core/interfaces/event';
import { EventsService } from 'src/app/core/services/events.service';
import { ToastService } from 'src/app/core/services/toast.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: false
})
export class EventPage {

  event?: event;
  result?: string;

  constructor(
    private ar: ActivatedRoute,
    private es: EventsService,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private ts: ToastService
  ) {

    ar.params.subscribe(param => {
      this.es.getEventById(param["id"]).then(event => this.event = event);
    })
  }

  async modalGives(id:number) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Who are you giving to',
      subHeader: 'Are you sure you want to see this information?',
      buttons: [
        {
          text: 'Show',
          role: 'change',
          data: {
            action: 'show',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2)
    if (result.role === "cancel") return;
    if (result.role === "change") {
      this.event!.participants[id].show = !this.event?.participants[id].show
    }
  }

  back() {
    this.navCtrl.navigateRoot("");
  }

  async modalDelete() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Deleting the event',
      subHeader: 'Are you sure you want to delete the event?',
      buttons: [
        {
          text: 'Delete',
          role: 'delete',
          data: {
            action: 'delete',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2)
    if (result.role === "cancel") return;
    if (result.role === "delete") {
      this.es.deleteEvent(this.event!.id!);
    }
    this.back()
  }

  async modalReDraw() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Redrawing the event',
      subHeader: 'Are you sure you want to redraw the event?',
      buttons: [
        {
          text: 'Redraw',
          role: 'redraw',
          data: {
            action: 'redraw',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2)
    if (result.role === "cancel") return;
    if (result.role === "redraw") {
      const newEvent = this.es.drawEvent(this.event!);
      this.es.editEvent(newEvent);
    }
    this.ts.defaultToast("Event redrawn successfully")
  }

  async modalEnd() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Changing the status of the event',
      subHeader: this.event!.ended ? 'Do you want to restore the event?' : 'Do you want to end and block this event?',
      buttons: [
        {
          text: this.event!.ended ? 'Restore the event' : 'End the event',
          role: 'change',
          data: {
            action: 'change',
          },
        },
        {
          text: 'Cancel',
          role: 'cancel',
          data: {
            action: 'cancel',
          },
        },
      ],
    });

    await actionSheet.present();

    const result = await actionSheet.onDidDismiss();
    this.result = JSON.stringify(result, null, 2)
    if (result.role === "cancel") return;
    if (result.role === "change") {
      this.event!.ended = !this.event!.ended
      this.es.editEvent(this.event!);
    }
    this.ts.defaultToast(this.event!.ended ? "Event ended successfully" : "Event reopened successfully")
    if(this.event!.ended) this.back()
  }

}
