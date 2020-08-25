import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Practice-Recipe-App';
  loadedFeature = 'recipe';

  public ngOnInit() {
    firebase.initializeApp(environment.firebase);
  }

  public onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
