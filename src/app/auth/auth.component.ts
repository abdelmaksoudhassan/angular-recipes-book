import { Component, OnInit, ComponentFactoryResolver, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, authRes } from './services/auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceHolderDirective } from '../place-holder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  subscriprton:Subscription
  // @ViewChild(PlaceHolderDirective) appPlaceHolder:PlaceHolderDirective
  err= null
  regMode = true 
  loading = false
  authObservable:Observable<authRes>
  constructor(private auth:AuthService,
    private router:Router,
    private resolver:ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  switchMode(){
    this.regMode = !this.regMode
  }

  onSubmit(event,f:NgForm){
    event.preventDefault()
    if(this.regMode){
      this.loading = true
      this.authObservable = this.auth.signUp(f.value.email,f.value.password)
    }else{
      this.loading = true
      this.authObservable = this.auth.signIn(f.value.email,f.value.password)
    }
    this.authObservable.subscribe(res=>{
      this.router.navigate(['/recipes'])
      this.loading = false
    },err=>{
      this.err = err
      // this.showAlert(this.err)
      this.loading = false
    })
    f.reset()
  }
  // private showAlert(msg:string){
  //   const component = this.resolver.resolveComponentFactory(AlertComponent)
  //   const alert = this.appPlaceHolder.ViewContainerRef
  //   alert.clear()
  //   const created = alert.createComponent(component)
  //   created.instance.error = msg
  // }
}
