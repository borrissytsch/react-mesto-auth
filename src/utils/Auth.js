import { srvAuthData, userAuthData } from './constants.js'
export default class Auth {
// #srvAuth;
//#srvSigninDir; //#srvSignupDir; //#userDir;
  constructor({auth = srvAuthData.auth, signin: signinDir = srvAuthData.signin, signup: signupDir = srvAuthData.signup
    , userDir = srvAuthData.userDir
  } = srvAuthData) {
    this._srvAuth = (dir) => auth (dir);
    this._srvSigninDir = signinDir; this._srvSignupDir = signupDir;
    this._userDir = userDir;
  }

  authorize ({email, password} = {email: userAuthData.signinMail, password: userAuthData.signinPsw}
    , dir = this._srvSigninDir, handler = this._retPromiseResponse, request = 'POST'
  ) {
    return fetch(this._srvAuth(dir), { method: request, headers: {
        'Content-Type': 'application/json'
      }
      , body: JSON.stringify({password, email})
    }).then((res, msg = `${email} ${dir} autorize ${request}: `) => handler(res, msg));
  };
  
  _retPromiseResponse (res, errMsg = '', theOnlyMsg_flag = false) {
    // return Promise.resolve('Test resolve 2 open success reg form')
    if (res.status === 200) return res.json();
    return Promise.reject(res.ok ?  (theOnlyMsg_flag  
        ? res.toString() : `${errMsg}promise rejected, status ${res.status}`
      ) : (
        theOnlyMsg_flag  ? res : `Auth API ${errMsg}promise error, ${res}`
      )
    );
  }

  checkToken(token, dir = this._userDir, handler = this._retTokenResponse, request = 'GET') {
    return fetch(this._srvAuth(dir), { method: request, headers:
      { 'Content-Type': 'application/json'
      , 'Authorization': `Bearer ${token}`
      }
    }).then(res => handler(res));
  }

  _retTokenResponse(res) {
    if(res.ok) return res.json();
    return Promise.reject(`Wrong token reject promise ${res}`)
  }
}

export const mestAuth = new Auth();