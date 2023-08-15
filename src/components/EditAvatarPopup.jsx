import React, { useRef, useContext, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {avatarProp} from '../utils/constants.js';
export default function EditAvatarPopup ({isOpen, onClose, onUpdateAvatar, ...frmFields}) {
  const currentUser = useContext(CurrentUserContext);
  const refAvatar = useRef(currentUser.avatar);
  const [link, setLink] = useState('');
  useEffect(() => setLink(''), [isOpen]);
  return (
    <PopupWithForm name={avatarProp} title="Обновить аватар" isOpen={isOpen} onClose={onClose}
      onSubmit={evt => onUpdateAvatar(evt, refAvatar.current.value)} btnCaption={frmFields.btnCaption}>
      <input ref={refAvatar} value={link} onChange={evt => setLink(evt.target.value)}
        className="popup__input popup__input_validated" type="url" name="avatarlink"
        placeholder="Ссылка на аватар" required
      />
      <span className="popup__error-msg popup__error-msg_type_avatarlink"></span>
    </PopupWithForm>
  )
}