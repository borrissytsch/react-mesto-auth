import {popupActiveClass} from '../utils/constants.js'
function PopupWithForm({name, title, isOpen, onClose, onSubmit, ...frmFields}) {
  return (
    <div className={`popup popup_type_form popup_type_${name} ${isOpen ? popupActiveClass : ''}`} onClick={onClose}>
      <div className="popup__container popup__container_type_form" onKeyDown={onClose}>
        <button type="button" className="popup__close" form={name} onClick={onClose}></button>
        <div className="popup__form">
          <h2 className="popup__title">{title}</h2>
          <form className="popup__items" onSubmit={onSubmit} id={name} name={`${name}_frm`} noValidate>
            {frmFields.children}
            <button type="submit" className="popup__save">{frmFields.btnCaption}</button>
          </form>
        </div>
      </div>
    </div>    
  );
}

export default PopupWithForm;