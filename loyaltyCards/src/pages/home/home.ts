import {Component} from '@angular/core';
import {AlertController, NavController, Platform} from 'ionic-angular';
import {SocialSharing} from '@ionic-native/social-sharing';
import {NativeStorage} from '@ionic-native/native-storage';
import {BarcodeScanner} from "@ionic-native/barcode-scanner";
import {Toast} from '@ionic-native/toast';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public cards: any = [];
  public searchCards: any = [];
  dark: boolean;

  constructor(public navCtrl: NavController, public alertCtrl: AlertController, private nativeStorage: NativeStorage,
              public platform: Platform, private barcodeScanner: BarcodeScanner, private socialSharing: SocialSharing,
              private toast: Toast) {
    platform.ready().then(() => {
      this.nativeStorage.getItem('dark_theme')
        .then(
          data => {
            this.dark = data;
            // alert(this.dark);
          },
          error => alert(error)
        );
      // this.cards.push({'card_name': 'Makro', 'card_number': 116812351});
      this.load();
    });
  }

  public add() {
    let prompt = this.alertCtrl.create({
      title: 'Add a Loyalty Card',
      message: "Enter in the card information",
      inputs: [
        {
          name: 'card_name',
          placeholder: 'Insert the name of the card here'
        },
        {
          name: 'card_number',
          placeholder: 'Insert your card number here'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            console.log(data);
            // alert(JSON.stringify(data));
            if (data['card_name'] != "" || data['card_number'] != "") {
              for (let c in this.cards) {
                if (c['card_name'] == data.card_name) {
                  this.show_message('Error', "Cards cannot have the same name. \nPlease choose a different name.");
                }
              }
              this.cards.push(data);
              this.nativeStorage.setItem('my_cards', this.cards)
                .then(
                  () => console.log('Stored item!'),
                  error => alert(error)
                );

            } else {
              this.show_message("Error!", "Please fill out all the fields");
            }
          }
        }
      ]
    });
    prompt.present();
  }

  public camera_add() {
    let card_name = "";
    const prompt = this.alertCtrl.create({
      title: 'Add a Loyalty Card',
      message: "Enter in the card information",
      cssClass: this.dark == true ? 'dark' : '',
      inputs: [
        {
          name: 'card_name',
          placeholder: 'Insert the name of the card here'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Next',
          handler: data => {
            console.log(data);
            if (data['card_name'] != "" || data['card_number'] != "") {
              card_name = data['card_name'];
              let options = {"showFlipCameraButton": true, "showTorchButton": true};
              this.barcodeScanner.scan(options).then(barcodeData => {
                console.log('Barcode data', barcodeData);
                // alert(JSON.stringify(barcodeData));
                if (!barcodeData.cancelled) {
                  this.cards.push({'card_name': card_name, 'card_number': barcodeData.text});
                  this.store();
                } else this.show_message("Error!", "Failed to add card\nBarcode scanning was cancelled.");
              }).catch(err => {
                console.log('Error', err);
              });
            } else {
              this.show_message("Error!", "Please fill out all the fields");
            }
          }
        }
      ]
    });
    prompt.present();

  }

  show_message(status, msg) {
    let alert = this.alertCtrl.create({
      title: status,
      subTitle: msg,
      buttons: ['OK']
    });
    alert.present();
  }

  load() {
    this.nativeStorage.getItem('my_cards')
      .then(
        data => {
          this.cards = data;
          this.searchCards = data;
        },
        error => alert(error)
      );
  }

  store() {
    this.searchCards = this.cards;
    this.nativeStorage.setItem('my_cards', this.cards)
      .then(
        data => {
        },
        error => alert(error)
      );
  }

  public search(ev) {
    // Reset items back to all of the items
    // this.load();
    this.cards = this.searchCards;
    // set val to the value of the ev target
    let val = ev.target.value;

    // if the value is an empty string don't filter the items
    if (val && val.trim() != '') {
      this.cards = this.cards.filter((item) => {
        // alert(item['card_name'].toLowerCase().includes(val.toLowerCase()));
        return (item['card_name'].toLowerCase().includes(val.toLowerCase()));
      })
    }
  }

  public delete(ev) {

    console.log(ev);
    const alert = this.alertCtrl.create({
      title: 'Delete',
      subTitle: 'Are you sure you want to delete <b>' + ev['card_name'] + '</b> card?',
      buttons: [
        {
          text: 'Yes',
          cssClass: 'red',
          handler: y => {
            this.cards = this.cards.filter((item) => {
              console.log(item['card_number']);
              console.log(ev['card_number'].toLowerCase());
              return (item['card_number'] !== ev['card_number']);
            });
            this.store();
          }
        }, {text: 'No', cssClass: 'blue'}]
    });
    alert.present();
  }

  public share(card) {
    let msg = "A Card was just shared with you from the Loyalty Cards App with the following information:\n\n" +
      "Card Name: " + card.card_name + "\nCard Number: " + card.card_number;
    this.socialSharing.share(msg, 'Shared Loyalty Card').then(() => {
      this.toast.show('Successfully shared ' + card.card_name + " card.", '5000', 'center')
    }).catch(() => {
      this.toast.show('Failed to share ' + card.card_name + " card.", '5000', 'center')
    });
  }

  public share_or_delete(card) {
    const prompt = this.alertCtrl.create({
      title: 'Please choose an option',
      message: "Do you want to share or delete " + card.card_name + " card?",
      buttons: [
        {
          text: 'Cancel',
          handler: data => {

          }
        },
        {
          text: 'Share',
          handler: () => {
            this.share(card);
          }
        },
        {
          text: 'Delete',
          handler: () => {
            this.delete(card);
          }
        }],
    });
    prompt.present();
  }

  public doRefresh(refresher) {
    console.log('Begin async operation', refresher);
    this.load();
    setTimeout(() => {

      refresher.complete();
    }, 1000);
  }

}
