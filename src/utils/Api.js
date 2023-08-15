import { srvLoginData } from './constants.js'
export class Api {
//#serverLogin; #serverToken;
//#userDir;
constructor (loginData) {
  this._serverLogin = (dir) => loginData.login (dir);
  this._serverToken = loginData.token;
  this._userDir = loginData.userDir;
}

  autorize(dir = this._userDir, handler = this._retPromiseResponse, request = 'GET') {
    return fetch(this._serverLogin(dir), {method: request
      , headers: {authorization: this._serverToken}
    }).then((res, msg = `${dir} autorize ${request} `) => handler(res, msg));
  }

  _retPromiseResponse(res, errMsg = '', theOnlyMsg_flag = false) {
    if (res.ok) return res.json();
    return Promise.reject(theOnlyMsg_flag ? errMsg : `Api ${errMsg}promise error: ${res.status}`);
  }

  getInitialCards(handler = this._retPromiseResponse) {
    return this.autorize('cards', handler)
  }

  updateProfile(userData, dir = this._userDir, handler = this._retPromiseResponse, request = 'PATCH') {
    return fetch(this._serverLogin(dir), {method: request
      , headers: {authorization: this._serverToken
      , 'Content-Type': 'application/json'
      }
      , body: JSON.stringify(userData)
    }).then((res, msg = `${dir} update profile ${request} `) => handler(res, msg));
  }

  updateAvatar(avatar, dir = `${this._userDir}/avatar`, handler  = this._retPromiseResponse) {
    return this.updateProfile({avatar}, dir, handler);
  }

  addCard(cardData, dir = 'cards', handler = this._retPromiseResponse, request = 'POST') {
    return this.updateProfile(cardData, dir, handler, request);
  }

  deleteCard(cardID, dir = `cards/${cardID}`, handler = this._retPromiseResponse, request = 'DELETE') {
    return this.autorize(dir, handler, request);
  }

  addLike(cardID, dir = `cards/${cardID}/likes`, handler = this._retPromiseResponse, request = 'PUT') {
    return this.autorize(dir, handler, request)
  }

  deleteLike(cardID, dir = `cards/${cardID}/likes`, handler = this._retPromiseResponse, request = 'DELETE') {
    return this.autorize(dir, handler, request)
  }

  changeLikeStatus(cardID, fromLiked, dir = `cards/${cardID}/likes`
    , handler = this._retPromiseResponse, request = fromLiked ? 'DELETE' : 'PUT'
  ) {
    return this.autorize(dir, handler, request)
  }
}

export const mestApi = new Api(srvLoginData);