import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Header';
import RegForm from './RegForm';
import InfoTooltip from './InfoTooltip';
import { mestAuth } from '../../utils/Auth';
import {signPageCaptions, authRoutes, authFormIds, userAuthData, srvAuthData} from '../../utils/constants';

export function Register () {
  const [isToolTipOpen, setToolTipOpen] = useState(false);
  const [isToolTipOk, setToolTipOk] = useState(false);
  const navigate = useNavigate();
  const {regTitle, btnEnterCaption: regEnterCaption, btnRegCaption, tooltipErrCaption} = signPageCaptions;
  const {signin} = authRoutes; const {signup: formId} = authFormIds;

  useEffect(() => {
    if (isToolTipOpen) {
      document.addEventListener('keydown', closeToolTip);
    } else {
      if (isToolTipOk) {setToolTipOk(false); navigate(`/${signin}`);}
    }
  }, [isToolTipOpen]);
  return (
    <>
      <Header routeLink={`/${signin}`} signCaption={regEnterCaption} />
      <RegForm frmId={formId} frmTitle={regTitle} btnCaption={btnRegCaption} handleRegForm={handleRegForm}>
        <Link to={`/${signin}`} className="register">Уже зарегистрированы? Войти</Link>
        <InfoTooltip title={`${isToolTipOk ? "Вы успешно зарегистрировались" : tooltipErrCaption}`}
          isOpen={isToolTipOpen} isOk={isToolTipOk} onClose={closeToolTip} onEscPress={closeToolTip}
        />
      </RegForm>
    </>
  );

  function handleRegForm (evt, {email, password}) {
    evt.preventDefault();
    mestAuth.authorize({email, password}, srvAuthData.signup).then(result => {
      // alert(`Reg res ${result}: ${result.data} is: ${result.data._id} ${result.data.email} `)
      setToolTipOk(true);
    }).catch(err => {setToolTipOk(false); console.log(`Register: ${err}`)
    }).finally(() => setToolTipOpen(true));
  }
  
  function closeToolTip(evt, forceClose_flag = false) {
    evt.preventDefault();
    if ((evt.target === evt.currentTarget) || evt.key === "Escape" || forceClose_flag) {
      document.removeEventListener('keydown', closeToolTip);
      setToolTipOpen(false);
    }
  }
}