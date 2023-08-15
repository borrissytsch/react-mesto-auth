import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Header from '../Header';
import RegForm from './RegForm';
import { mestAuth } from '../../utils/Auth';
import {signPageCaptions, authRoutes, authFormIds, userAuthData, srvAuthData} from '../../utils/constants';

export function Register () {
  const {regTitle, btnEnterCaption: regEnterCaption, btnRegCaption} = signPageCaptions;
  const {signin} = authRoutes; const {signup: formId} = authFormIds;
  return (
    <>
      <Header routeLink={`/${signin}`} signCaption={regEnterCaption} />
      <RegForm frmId={formId} frmTitle={regTitle} btnCaption={btnRegCaption} handleRegForm={handleRegForm}>
        <Link to={`/${signin}`} className="register">Уже зарегистрированы? Войти</Link>
      </RegForm>
    </>
  );

  function handleRegForm (evt, {mail: regMail, pass: regPass}) {
    evt.preventDefault();
    alert(`Regs form ${srvAuthData.signup}: ${regMail = regMail ? regMail : userAuthData.signupMail} & ${regPass = regPass ? regPass :  userAuthData.signupPsw}`);
    mestAuth.authorize(regMail, regPass, srvAuthData.signup).then(result => {alert(`Reg res ${result}: ${result.data} is: ${result.data._id} ${result.data.email} `)
  }).catch(err => alert(`Err: ${err}`))
  }
}