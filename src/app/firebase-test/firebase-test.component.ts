import { Component, OnInit } from '@angular/core';
import {FirebaseListObservable, AngularFire} from "angularfire2";
import {Observable} from "rxjs";

@Component({
  selector: 'app-firebase-test',
  templateUrl: './firebase-test.component.html',
  styleUrls: ['./firebase-test.component.css']
})
export class FirebaseTestComponent implements OnInit {
  cuisines: FirebaseListObservable<any[]>;
  restaurants: Observable<any[]>;
  exists;

  constructor(private af: AngularFire) {
  }

  ngOnInit() {
    this.cuisines = this.af.database.list('/cuisines', {
      query: {
        orderByValue: true
      }
    });

    this.restaurants = this.af.database.list('/restaurants', {
      query: {
        orderByChild: 'rating',
        startAt: 5,
        limitToLast: 50
      }
    })
        .map(restaurants => {console.log(restaurants); return restaurants});

    this.exists = this.af.database.object('/restaurants/1/features/1');

    this.exists.take(1).subscribe(
        x => {
          if(x && x.$value) console.log('EXISTS');
          else console.log('NOT EXISTS');
        }
    );

    this.af.database.list('/restaurants').push({ name: ''})
        .then(x => {
          let restaurant = null;
          let update = {};
          update['restaurants/' + x.key] = restaurant;
          update['restaurants-by-city/camberwell/' + x.key] = restaurant;

          this.af.database.object('/').update(update);
        })
  }

}
