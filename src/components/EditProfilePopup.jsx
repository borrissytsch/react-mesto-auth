import React, { useState, useEffect, useContext } from 'react';
import PopupWithForm from './PopupWithForm.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {profileProp} from '../utils/constants.js';
export default function EditProfilePopup ({isOpen, onClose, onUpdateUser, ...frmFields}) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name);
  const [about, setAbout] = useState(currentUser.about);
  useEffect(() => {
    setName(currentUser.name); setAbout(currentUser.about);
  }, [currentUser, isOpen]);
  return (
    <PopupWithForm name={profileProp} title="Редактировать профиль" isOpen={isOpen} onClose={onClose}
      onSubmit={evt => onUpdateUser(evt, {name: name, about: about})} btnCaption={frmFields.btnCaption}>
      <input value={name} onChange={evt => setName(evt.target.value)}
        className="popup__input popup__input_validated" type="text" name="profilename"
        placeholder="Имя" minLength="2" maxLength="40" required
      />
      <span className="popup__error-msg popup__error-msg_type_profilename"></span>
      <input value={about} onChange={evt => setAbout(evt.target.value)}
        className="popup__input popup__input_validated" type="text" name="profilabout"
        placeholder="О себе" minLength="2" maxLength="200" required 
      />
      <span className="popup__error-msg popup__error-msg_type_profilabout"></span>
    </PopupWithForm>
  )
}