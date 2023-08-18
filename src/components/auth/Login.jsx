import React, { useState, useEffect, useContext } from 'react';
import {useNavigate} from 'react-router-dom';
import Header from '../Header';
import RegForm from './RegForm';
import InfoTooltip from './InfoTooltip';
import { mestAuth } from '../../utils/Auth';
import {CurrentUserContext} from '../../contexts/CurrentUserContext.js';
import {signPageCaptions, authRoutes, authFormIds, userAuthData, srvAuthData, confirmProp} from '../../utils/constants';

export function Login ({loggedIn, startApp}) {
  const [isToolTipOpen, setToolTipOpen] = useState(false);
  const [isToolTipOk, setToolTipOk] = useState(false);
  const navigate = useNavigate();
  const {inTitle, regTitle: regCaption, btnEnterCaption, tooltipErrCaption, tooltipErrMsg} = signPageCaptions;
  const {app, signup} = authRoutes; const {signin: formId} = authFormIds;

  useEffect(() => {
    if (isToolTipOpen) document.addEventListener('keydown', closeToolTip);
  }, [isToolTipOpen]);
  if (loggedIn) navigate(`/${app}`);

  return (
    <>
      <Header routeLink={`/${signup}`} signCaption={regCaption} />
      <RegForm frmId={formId} frmTitle={inTitle} btnCaption={btnEnterCaption} handleRegForm={handleRegForm} />
      <InfoTooltip title={`${isToolTipOk ? tooltipErrMsg : tooltipErrCaption}`}
          isOpen={isToolTipOpen} isOk={isToolTipOk} onClose={closeToolTip} onEscPress={closeToolTip}
      />
    </>
  );

  function handleRegForm (evt, {email , password}) {
    evt.preventDefault();
    mestAuth.authorize({email, password}, srvAuthData.signin).then(result => {
      if (result.token) {
            localStorage.setItem('token', result.token);
        return result.token;
      } else {
        console.log(`Token has not been received from server, result keys are: ${Object.keys(result).join('/')}`); // alert(`token has not been received from server, result keys are: ${Object.keys(result).join('/')}`)
      }
    }).then(token => mestAuth.checkToken(token).then(result => {
      startApp(result);
      navigate(`/${app}`)
    })
    ).catch(err => {setToolTipOpen(true); console.log(`Login err: ${err}`); alert(`Login err: ${err}`)
  }); }

  function closeToolTip(evt, forceClose_flag = false) {
    evt.preventDefault();
    if ((evt.target === evt.currentTarget) || evt.key === "Escape" || forceClose_flag) {
      document.removeEventListener('keydown', closeToolTip);
      setToolTipOpen(false);
    }
  }
}