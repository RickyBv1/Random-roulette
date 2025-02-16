import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, NavController } from '@ionic/angular';
import { event } from 'src/app/core/interfaces/event';
import { EventsService } from 'src/app/core/services/events.service';

@Component({
  selector: 'app-event',
  templateUrl: './event.page.html',
  styleUrls: ['./event.page.scss'],
  standalone: false
})
export class EventPage implements OnInit {

  event?: event;
  result?: string;

  constructor(
    private ar: ActivatedRoute,
    private es: EventsService,
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
  ) {

    ar.params.subscribe(param => {
      console.log(param["id"])
      this.event = this.es.getEvent(param["id"])
    })

  }

  ngOnInit() {
  }

  async modalGives(i:number) {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Who are you giving to',
      subHeader: 'Are you sure you want to see this information?',
      buttons: [
        {
          text: 'Show',
          role: 'show',
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
    if (result.role === "show") this.event!.participants[i].show = !this.event?.participants[i].show
  }

  back() {
    this.navCtrl.navigateBack("");
  }

}
