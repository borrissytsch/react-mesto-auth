import React from 'react';
import Header from '../Header';
import RegForm from './RegForm';
import { mestAuth } from '../../utils/Auth';
import {signPageCaptions, authRoutes, authFormIds, userAuthData, srvAuthData} from '../../utils/constants';

export function Login () {
  const {inTitle, regTitle: regCaption, btnEnterCaption} = signPageCaptions;
  const {signup} = authRoutes; const {signin: formId} = authFormIds;
  return (
    <>
      <Header routeLink={`/${signup}`} signCaption={regCaption} />
      <RegForm frmId={formId} frmTitle={inTitle} btnCaption={btnEnterCaption} handleRegForm={handleRegForm} />
    </>
  );

  function handleRegForm (evt, {mail: logMail, pass: logPass}) {
    evt.preventDefault();
    //alert(`Logs form ${srvAuthData.signin}: ${logMail = logMail ? logMail : userAuthData.signinMail} & ${logPass = logPass ? logPass :  userAuthData.signinPsw}`)
    mestAuth.authorize(logMail, logPass, srvAuthData.signin).then(result => {alert(`Login res: ${Object.keys(result).join('/')} entries: ${Object.entries(result).join(';')}`);
    }
    ).catch(err => {alert(`Login err: ${err}`)})
  }
}