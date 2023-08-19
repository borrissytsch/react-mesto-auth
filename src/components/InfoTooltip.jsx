//import React from 'react';
import {popupActiveClass} from '../utils/constants';
export default function InfoTooltip({title, isOpen, isOk, onClose, onEscPress, ...frmFields}) {
  return (
    <div className={`popup popup_type_form ${isOpen ? popupActiveClass : ''}`} onKeyDown={onEscPress} onClick={onClose}>
      <div className="popup__container popup__container_type_form" onKeyDown={onEscPress}>
        <button type="button" className="popup__close" onClick={onClose}></button>
        <div className={`popup__form popup__form_type_tooltip ${isOk ? "popup__form_type_toolok" : "popup__form_type_toolerr"}`}>
          <h2 className="popup__title popup__title_type_tooltip">{title}</h2>
        </div>
      </div>
    </div>    
  );
}