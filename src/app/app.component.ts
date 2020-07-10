import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private auth:AuthService){}
  loadedFeature = 'recipe';

  ngOnInit(){
    this.auth.autoLogin()
  }

  onNavigate(feature: string) {
    this.loadedFeature = feature;
  }
}
