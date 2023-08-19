/* External config data: !!before webpack building add export prefix to all consts!! */
 export const initialCards = [{name: 'Архыз'
    , link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    , _id:   null
    , owner: null
    , likes: [0, 0, 0, 0]
  },{ name: 'Челябинская область'
    , link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    , _id:   null
    , owner: null
    , likes: [0]
  },{ name: 'Иваново'
    , link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    , _id:   null
    , owner: null
    , likes: [0, 0]
  },{ name: 'Камчатка'
    , link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    , _id:   null
    , owner: null
    , likes: [0, 0, 0]
  },{ name: 'Холмогорский район'
    , link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    , _id:   null
    , owner: null
    , likes: []
  },{ name: 'Байкал'
    , link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    , _id:   null
    , owner: null
    , likes: []
}];

/* Authentification & routes react config */
export const authRoutes = {signin: "sign-in", signup: "sign-up", app: "app"};
export const authFormIds = {signin: "inform", signup: "regform"};
export const signPageCaptions = {inTitle: "Вход", regTitle: "Регистрация", btnEnterCaption: "Войти"
  , btnRegCaption: "Зарегистрироваться", outCaption: "Выйти", tooltipErrCaption: "Что-то пошло не так! Попробуйте ещё раз."
  , tooltipOkMsg: "Вы успешно зарегистрировались"
};

/* Servers' data config */
export const srvAuthData = {auth: (dir) =>`https://auth.nomoreparties.co/${dir}`, signin: 'signin',  signup: 'signup'
  , userDir: 'users/me'
};
export const srvLoginData = {login: (dir) =>`https://mesto.nomoreparties.co/v1/cohort-69/${dir}`, token: '2820c2c8-dbab-4884-b269-611968f0327e'
  , userDir: 'users/me'
};
export const userAuthData = {signupPsw: 'somepassword', signupMail: 'email@yandex.ru', signinPsw: 'dsfsdfsdfsdf'
  , signinMail: 'email@email.ru', userDir: 'users/me'
};

/* React config vars */
export const avatarProp = 'avataredit';                                       // added as element names' base & form ids 4 react props
export const profileProp = 'profiledit';                                      // added as element names' base & form ids 4 react props
export const cardProp = 'cardadd';                                            // added as element names' base & form ids 4 react props
export const confirmProp = 'confirm';                                         // added as element names' base & form ids 4 react props
export const avatarInputs = [ {num: `${avatarProp}_01`, type: "url", name: "avatarlink", placeholder: "Ссылка на аватар"} ];
export const profileInputs = [ {num: `${profileProp}_01`
    , type: "text", name: "profilename", placeholder: "Имя", minlen: "2", maxlen: "40"
  } , {num: `${profileProp}_02`
    , type: "text", name: "profilabout", placeholder: "О себе", minlen: "2", maxlen: "200"
  }
];
export const cardInputs = [ {num: `${cardProp}_01`
    , type: "text", name: "cardname", placeholder: "Название", minlen: "2", maxlen: "30"
  } , {num: `${cardProp}_02`
    , type: "url", name: "cardlink", placeholder: "Ссылка на картиннку"
  }
];

/* Internal classes' config vars */
export const avatarSelector = `.popup.popup_type_${avatarProp}`;              // изменено для React PopupWithFormInput с avatar на avataredit
export const profileSelector = `.popup.popup_type_${profileProp}`;            // изменено для React PopupWithFormInput с profile на profiledit
export const cardSelector = `.popup.popup_type_${cardProp}`;                  // изменено для React PopupWithFormInput с card на cardadd
export const confirmSelector = `.popup.popup_type_${confirmProp}`;
export const formSelector = '.popup__items';
export const inputSelector = '.popup__input';
export const pictureSelector = '.popup.popup_type_picture';
export const pictureImageSelector = '.popup__image';
export const pictureCaptionSelector = '.popup__caption';
export const buttonCloseSelector = '.popup__close';
export const buttonSubmitSelector = '.popup__save';
export const userNameSelector = '.cousteau__title';
export const userAboutSelector = '.cousteau__subtitle';
export const userAvatarSelector = '.cousteau__image';
export const cardContainerSelector = '.table';
export const avatarEditButtonSelector = '.cousteau__avedit';
export const profileEditButtonSelector = '.cousteau__box';
export const cardAddButtonSelector = '.cousteau__button';
export const popupActiveClass = 'popup_opened';
export const validationSettings = { inputSelector: '.popup__input'
  , submitButtonSelector: buttonSubmitSelector
  , errorMsgSelector: '.popup__error-msg_type_'
  , inactiveButtonClass: 'popup__save_disabled'
  , inputErrorClass: 'popup__input_misfilled'
  , errorClass: 'popup__error-msg_visible'
};
export const cardSettings = {templateSelector: '.card-template'
  , containerSelector: '.table__cell'
  , imageSelector: '.table__image'
  , iconSelector: '.table__icon'
  , likenSelector: '.table__liken'
  , titleSelector: '.table__title'
  , trashSelector: '.table__trash'
  , trashActiveClass: 'table__trash_active'
  , likeIconClass: 'table__icon_like'
  , likenActiveClass: 'table__liken_active'
};

/* Miscellaneous messaging/captions' consts */
export const msgSubmitButtonWait = 'Сохранение ...';
export const captionProfileButton = 'Сохранить';
export const captionCardButton = 'Создать';
export const captionConfirmButton = 'Да';
export const errMsg4AvatarForm = (err) => `Avatar form: ${err}`;
export const errMsg4ProfileForm = (err) => `Edit form: ${err}`;
export const errMsg4AddCardForm = (err) => `Add card form: ${err}`;
export const errMsg4CardLikeAdd = (err) => `Card add like: ${err}`;
export const errMsg4CardLikeDel = (err) => `Card delete like: ${err}`;
export const errMsg4TrashCardDel = (err) => `Trash card delete: ${err}`;
export const errMsg4GetCardsInfo = (err) => `Get initial cards/user info: ${err}`;