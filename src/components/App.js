// import './App.css';
import React, { useState, useEffect } from 'react';
import Header from './Header.js';
import Main from './Main.js';
import Footer from './Footer.js';
import PopupWithForm from './PopupWithForm.js';
import EditAvatarPopup from './EditAvatarPopup.jsx';
import EditProfilePopup from './EditProfilePopup.jsx';
import AddPlacePopup from './AddPlacePopup.jsx';
import ImagePopup from './ImagePopup.js';
import {mestApi} from '../utils/Api.js';
import {CurrentUserContext} from '../contexts/CurrentUserContext.js';
import {avatarProp, profileProp, cardProp, confirmProp, popupActiveClass
  , captionProfileButton, captionCardButton, msgSubmitButtonWait, captionConfirmButton, signPageCaptions, authRoutes
  , errMsg4AvatarForm, errMsg4ProfileForm, errMsg4AddCardForm, errMsg4GetCardsInfo
  , errMsg4CardLikeAdd, errMsg4CardLikeDel
} from '../utils/constants.js';
function App() {
  const [currentUser, setCurrentUser] = useState({name: "Жак-Ив Кусто"
    , about: "Исследователь океана"
    , avatar: "https://pictures.s3.yandex.net/frontend-developer/common/ava.jpg"
  });
  const [cards, setCards] = useState([]);
  const [isEditAvatarPopupOpen, setAvatarOpen] = useState(false);
  const [isEditProfilePopupOpen, setProfileOpen] = useState(false);
  const [isAddPlacePopupOpen, setAddCardOpen] = useState(false);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [selectedCard, setCardOpen] = useState(null);
  const [btnProfileCaption, setProfileCaption] = useState(captionProfileButton);
  const [btnCardCaption, setCardCaption] = useState(captionCardButton);
  const clickHandlers = {onEditAvatar: handleEditAvatarClick, onEditProfile: handleEditProfileClick
    , onConfirm: handleConfirm, onAddPlace: handleAddPlaceClick, onCardClick: handleCardClick
  };
  const formName = {avatar: avatarProp, profile: profileProp, card: cardProp, confirm: confirmProp};
  const {outCaption} = signPageCaptions;
  const {signin} = authRoutes;

  useEffect(() => {
    Promise.all([mestApi.autorize(), mestApi.getInitialCards()]).then(result => {
      setCurrentUser(result[0]); // , id: result[0]._id, cohort: result[0].cohort
      setCards(result[1]);
    }).catch(err => console.log(errMsg4GetCardsInfo(err)));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header routeLink={`/${signin}`} signCaption={outCaption} loggedIn={true}>
        <span>email@mail.com</span>
      </Header>
      <Main clickHandlers={clickHandlers} formName={formName} onClose={closeAllPopups} cards={cards}
        onCardLike={handleCardLike} onCardDelete={handleCardDelete}
      />
      <Footer />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups}
        onUpdateAvatar={handleUpdateAvatar} btnCaption={btnProfileCaption}
      />
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups}
        onUpdateUser={handleUpdateUser} btnCaption={btnProfileCaption}
      />
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups}
        onAddPlace={handleAddPlaceSubmit} btnCaption={btnCardCaption}
      />
      <PopupWithForm isOpen={isConfirmOpen} name={confirmProp} title="Вы уверены?" onClose={closeAllPopups}
        onSubmit={handleConfirm} btnCaption={captionConfirmButton} />
      <ImagePopup card={selectedCard} onClose={closeAllPopups} openClass={popupActiveClass} />
    </CurrentUserContext.Provider>
  );

  function handleEditAvatarClick(evt, setOpen_flag = true) {
    setAvatarOpen(setOpen_flag);
  }
  
  function handleUpdateAvatar (evt, refAvatar) {
    evt.preventDefault();
    setProfileCaption(msgSubmitButtonWait);
    mestApi.updateAvatar(refAvatar).then(result => {
      const newUser = currentUser; newUser.avatar = result.avatar;
      setCurrentUser(newUser);
      closeAllPopups(evt, true);
    }).catch(err => console.log(errMsg4AvatarForm(err))
    ).finally(() => setProfileCaption(captionProfileButton));
  }
  
  function handleEditProfileClick (evt, setOpen_flag = true) {
    setProfileOpen(setOpen_flag);
  }

  function handleUpdateUser (evt, userData) {
    evt.preventDefault();
    setProfileCaption(msgSubmitButtonWait);
    mestApi.updateProfile(userData).then(result => {
      const newUser = currentUser; newUser.name = result.name; newUser.about = result.about;
      setCurrentUser(newUser);
      closeAllPopups(evt, true);
    }).catch(err => console.log(errMsg4ProfileForm(err))
    ).finally(() => setProfileCaption(captionProfileButton));
  }

  function handleConfirm(evt, setOpen_flag = isConfirmOpen) {
    setConfirmOpen(false);
  }
  
  function handleAddPlaceClick (evt, setOpen_flag = true) {
    setAddCardOpen(setOpen_flag);
  }
  
  function handleAddPlaceSubmit (evt, card) {
    evt.preventDefault();
    setCardCaption(msgSubmitButtonWait);
    mestApi.addCard(card).then(result => {
      setCards([result, ...cards]);
      closeAllPopups(evt, true);
    }).catch(err => console.log(errMsg4AddCardForm(err))
    ).finally(() => setCardCaption(captionCardButton));
  }

  function handleCardClick(evt, setOpen_flag = true, card) {
    if (setOpen_flag) {
      document.addEventListener('keydown', closeAllPopups);
      setCardOpen(card);
    } else {
      setCardOpen(null);
      document.removeEventListener('keydown', closeAllPopups)
    }
  }
  
  function handleCardLike(evt, card) {
    evt.preventDefault(); evt.stopPropagation();
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    mestApi.changeLikeStatus(card._id, isLiked).then(result => {
      setCards(cards => cards.map(item => item._id === card._id ? result : item));
    }).catch(err => console.log(errMsg4CardLikeAdd(err)))
  }

  function handleCardDelete (evt, card) {
    evt.preventDefault(); evt.stopPropagation();
    mestApi.deleteCard(card._id).then(result => {
      setCards(cards => cards.filter(item => item._id !== card._id));
    }).catch(err => console.log(errMsg4CardLikeDel(err)))
  }

  function closeAllPopups(evt, forceClose_flag = false) {
    //alert(`Close all popups ${evt.target === evt.currentTarget}: ${evt.target} ${evt.currentTarget} ${evt.key}`);
    if ((evt.target === evt.currentTarget) || evt.key === "Escape" || forceClose_flag) Object.keys(
      clickHandlers).forEach(handler => clickHandlers[handler](evt, false, true)
    );
  }
}

export default App;
