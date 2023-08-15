function ImagePopup({card, onClose, openClass}) {
  return (
    <div className={`popup popup_type_picture ${card ? openClass : ''}`} onClick={onClose}>
      <div className="popup__container popup__container_type_picture">
        <button type="button" className="popup__close" onClick={onClose}></button>
        <div className="popup__picture">
          <img className="popup__image" src={card ? card.link : ''} alt={card ? card.name : ''} />
          <p className="popup__caption">{card ? card.name : ''}</p>
        </div>
      </div>
    </div>
  );
}
  
export default ImagePopup;