import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit{
  userSub:Subscription
  isAuth = false
  name = 'Manage'
  constructor(private auth:AuthService,
    private dataStorageService:DataStorageService,
    private ShoppingListService:ShoppingListService) {}
  ngOnInit(){
    this.auth.user.subscribe(user=>{
      this.isAuth = !user ? false : true
      if(user){
        this.name = user.email.substr(0,user.email.indexOf('@'))
      }
    })
  }

  onLogOut(){
    this.auth.logOut()
  }

  get ingCount(){
    return this.ShoppingListService.ingredients.length
  }
}
