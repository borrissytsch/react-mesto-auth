import React, { useContext } from 'react';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {cardSettings} from '../utils/constants.js';
export default function Card({card, onCardClick, onCardLike, onCardDelete}) {
  const {name, about, avatar, _id, cohort} = React.useContext(CurrentUserContext);
  const {trashActiveClass: trashActive
    , likeIconClass: likeIcon, likenActiveClass: likenActive
  } = cardSettings;
  const isOwn = card.owner._id === _id;
  const isLiked = card.likes.some(i => i._id === _id);
  return (
    <li className="table__cell" onClick={handleClick}>
      <button type="button" className={`table__trash ${isOwn ? trashActive : ""}`}
        onClick={evt => onCardDelete(evt, card)}>
      </button>
      <img className="table__image table__area-image" src={card.link} alt={card.name} />
      <h2 className="table__title table__area-title">{card.name}</h2>
      <div className="table__like table__area-like">
        <button type="button" className={`table__icon ${isLiked ? likeIcon : ""}`}
          onClick={evt => onCardLike(evt, card)}>
        </button>
        <p className={`table__liken ${card.likes.length > 0 ? likenActive : ""}`}>{card.likes.length}</p>
      </div>
    </li>
  );

  function handleClick(evt) {
    onCardClick(evt, undefined, card);
  }
}
