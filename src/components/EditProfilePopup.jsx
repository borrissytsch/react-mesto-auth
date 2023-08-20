import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm';
import useFormInputs from '../hooks/useFormInputs';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import {profileProp} from '../utils/constants';
export default function EditProfilePopup ({isOpen, onClose, onUpdateUser, ...frmFields}) {
  const currentUser = useContext(CurrentUserContext);
  const {values, handleChange, setValues} = useFormInputs({profilename: currentUser.name, profilabout: currentUser.about});
  useEffect(() => {
    setValues({profilename: currentUser.name, profilabout: currentUser.about});
  }, [currentUser, isOpen]);
  return (
    <PopupWithForm name={profileProp} title="Редактировать профиль" isOpen={isOpen} onClose={onClose}
      onSubmit={evt => onUpdateUser(evt, {name: values.profilename, about: values.profilabout})} btnCaption={frmFields.btnCaption}>
      <input value={values.profilename} onChange={evt => handleChange(evt)}
        className="popup__input popup__input_validated" type="text" name="profilename"
        placeholder="Имя" minLength="2" maxLength="40" required
      />
      <span className="popup__error-msg popup__error-msg_type_profilename"></span>
      <input value={values.profilabout} onChange={evt => handleChange(evt)}
        className="popup__input popup__input_validated" type="text" name="profilabout"
        placeholder="О себе" minLength="2" maxLength="200" required 
      />
      <span className="popup__error-msg popup__error-msg_type_profilabout"></span>
    </PopupWithForm>
  )
}