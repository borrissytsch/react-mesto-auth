import React, { useRef } from 'react';
export default function RegForm ({frmId, frmTitle, btnCaption, handleRegForm, ...frmFields}) {
  const refMail = useRef('');   const refPass = useRef('');

  return (
    <div className="regform">
      <h2 className="regform__title">{frmTitle}</h2>
      <form className="regform__items" onSubmit={evt => handleRegForm(evt, {email: refMail.current.value, password: refPass.current.value})}
        id={frmId} name={`${frmId}_frm`} noValidate>
        <input ref={refMail} className="regform__input" type="email" name={`${frmId}_email`} placeholder="email" required />
        <input ref={refPass} className="regform__input" type="password" name={`${frmId}_pass`} placeholder="Пароль" minLength="6" maxLength="200" required />
        <button type="submit" className="regform__button">{btnCaption}</button>
        {frmFields.children}
      </form>
    </div>
  );
}