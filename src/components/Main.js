import React, { useState, useEffect } from 'react';
import {mestApi} from '../utils/Api.js'
import Card from './Card.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import { errMsg4GetCardsInfo } from '../utils/constants.js'
function Main({clickHandlers, formName, onClose, cards, onCardLike, onCardDelete}) {
  const {name, about, avatar, _id, cohort} = React.useContext(CurrentUserContext);
  const userName = name; const userDescription = about; const userAvatar = avatar;

  return (
    <main className="content">
      <section className="cousteau" onKeyDown={onClose}>
        <div className="cousteau__item">
          <button type="button" className="cousteau__avedit" form={formName.avatar} onClick={clickHandlers.onEditAvatar}></button>
          <img src={userAvatar} className="cousteau__image cousteau__area-photo" alt={userName} />
          <h1 className="cousteau__title cousteau__area-title">{userName}</h1>
          <button type="button" className="cousteau__box cousteau__area-box" form={formName.profile}
            onClick={clickHandlers.onEditProfile}>
          </button>
          <p className="cousteau__subtitle cousteau__area-subtitle">{userDescription}</p>
        </div>
        <button type="button" className="cousteau__button" form={formName.card} onClick={clickHandlers.onAddPlace}></button>
      </section>
      <section className="places" aria-label="три колонки">
        <ul className="table">{createCardItems(cards)}</ul>
      </section>
    </main>
  );
  
  function createCardItems (cards) { 
    return cards.map((card, i) => (
      <Card key={`card_${card._id}`} card={card} onCardClick={clickHandlers.onCardClick}
        onCardLike={onCardLike} onCardDelete={onCardDelete}
      />
    ));
  }
}

export default Main;