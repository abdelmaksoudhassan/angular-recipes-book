export class User{
    constructor(
        public email:string,
        public id:string,
        private _token:string,
        private _expDate:Date
    ){}

    get token(){
        if(!this._expDate || new Date() > this._expDate){
            return null
        }
        return this._token
    }
}