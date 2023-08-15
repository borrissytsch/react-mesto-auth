import React, { useRef, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm.js'
import {cardProp} from '../utils/constants.js';
export default function AddPlacePopup ({isOpen, onClose, onAddPlace, ...frmFields}) {
  const refName = useRef('');
  const refLink = useRef('');
  const [name, setName] = useState('');
  const [link, setLink] = useState('');
  useEffect(() => {setName(''); setLink('')}, [isOpen]);
  return (
    <PopupWithForm name={cardProp} title="Новое место" isOpen={isOpen} onClose={onClose}
      onSubmit={evt => onAddPlace(evt, {name: refName.current.value, link: refLink.current.value})}
      btnCaption={frmFields.btnCaption}>
      <input ref={refName} value={name} onChange={evt => setName(evt.target.value)}
        className="popup__input popup__input_validated" type="text" name="cardname"
        placeholder="Название" minLength="2" maxLength="30" required
      />
      <span className="popup__error-msg popup__error-msg_type_cardname"></span>
      <input ref={refLink} value={link} onChange={evt => setLink(evt.target.value)}
        className="popup__input popup__input_validated" type="url" name="cardlink"
        placeholder="Ссылка на картиннку" required
      />
      <span className="popup__error-msg popup__error-msg_type_cardlink"></span>
    </PopupWithForm>
  )
}