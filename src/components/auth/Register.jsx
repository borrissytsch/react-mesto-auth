import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import RegForm from './RegForm';
import { mestAuth } from '../../utils/Auth';
import {signPageCaptions, authRoutes, authFormIds, userAuthData, srvAuthData} from '../../utils/constants';

export function Register ({handleToolTipOpen}) {
  const navigate = useNavigate();
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

  function handleRegForm (evt, {email, password}) {
    evt.preventDefault();
    mestAuth.authorize({email, password}, srvAuthData.signup).then(result => {
      // alert(`Reg res ${result}: ${result.data} is: ${result.data._id} ${result.data.email} `)
      handleToolTipOpen(true);
    }).catch(err => {handleToolTipOpen(false); console.log(`Register: ${err}`)
  }); }
}