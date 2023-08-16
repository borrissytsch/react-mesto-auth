import { srvAuthData, userAuthData } from './constants.js'
export default class Auth {
#srvAuth;
#srvSigninDir; #srvSignupDir; #userDir;
  constructor({auth, signin: signinDir, signup: signupDir, userDir} = srvAuthData) {
    this.#srvAuth = (dir) => auth (dir);
    this.#srvSigninDir = signinDir; this.#srvSignupDir = signupDir;
    this.#userDir = userDir;
    // alert(`constructor signin: ${this.#srvSigninDir} & up: ${this.#srvSignupDir} / ${userAuthData.signinMail} ${userAuthData.signinPsw}`)
  }

  authorize (email = userAuthData.signupMail, password = userAuthData.signupPsw
    , dir = this.#srvSigninDir) {
    //alert(`fetch data: ${password} / ${email} / ${dir} + ${this.#srvAuth(dir)}`);
    return fetch(this.#srvAuth(dir), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({password, email})
    }).then((result) => {
      //alert(`1st res ${result.status} : ${result.ok} : ${result.token}`)
      if (result.status === 200){
        return result.json();
      }
    }).catch((err) => {alert(`1st err: ${err}`); console.log(`1st err: ${err}`)});
  };
  
}

export const mestAuth = new Auth();