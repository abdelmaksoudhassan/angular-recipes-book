import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http' 
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../user.model';
import { Router } from '@angular/router';

export interface authRes{
  kind:string;
  idToken:string;
  email:string;
  refreshToken:string;
  expiresIn:string;
  localId:string;
  registered?:boolean;
}


@Injectable({
  providedIn: 'root'
})

export class AuthService {
  user= new BehaviorSubject<User>(null)
  constructor(private http:HttpClient,private router:Router) { }
  signUp(email:string,password:string){
    return this.http.post<authRes>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCQD5NWWdEeRfbDfTk6_F-EUVSD6VnyDXQ',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handErr),tap(res=>{
      this.handUser(res.email,res.localId,res.expiresIn,res.idToken)
    }))
  }
  signIn(email:string,password:string){
    return this.http.post<authRes>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCQD5NWWdEeRfbDfTk6_F-EUVSD6VnyDXQ',{
      email:email,
      password:password,
      returnSecureToken:true
    }).pipe(catchError(this.handErr),tap(res=>{
      this.handUser(res.email,res.localId,res.expiresIn,res.idToken)
    }))
  }
  logOut(){
    this.user.next(null)
    this.router.navigate(['/auth'])
    localStorage.removeItem('userData')
  }
  autoLogin(){
    const user =JSON.parse(localStorage.getItem('userData'))
    if(!user){
      return
    }
    const loadedUser= new User(user.email,user.id,user._token,user._expDate)
    if(loadedUser.token){
      this.user.next(user)
    }
  }

  private handUser(email,localId,expiresIn,idToken){
    const expDateFromNow = new Date( (+expiresIn*1000) + new Date().getTime() )
      const user = new User(email,localId,idToken,expDateFromNow)
      this.user.next(user)
      localStorage.setItem('userData',JSON.stringify(user))
  }

  private handErr(err:HttpErrorResponse){
    let error = 'unknown error !'
    if(!err.error || !err.error.error ){
      return throwError(error)
    }
    switch(err.error.error.message){
      case('EMAIL_EXISTS'):{
        error = 'The email address is already in use by another account'
        break;
      }
      case('OPERATION_NOT_ALLOWED'):{
        error = 'Password sign-in is disabled for this project'
        break;
      }
      case('TOO_MANY_ATTEMPTS_TRY_LATER'):{
        error = 'We have blocked all requests from this device due to unusual activity. Try again later'
        break;
      }
      case('EMAIL_NOT_FOUND'):{
        error = 'There is no user record corresponding to this identifier. The user may have been deleted.'
        break;
      }
      case('INVALID_PASSWORD'):{
        error = 'The password is invalid or the user does not have a password.'
        break;
      }
      case('USER_DISABLED'):{
        error = 'The user account has been disabled by an administrator.'
        break;
      }
      default:{
        error = 'internal error !'
        break;
      }
    }
    return throwError(error)
  }
}
