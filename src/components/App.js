import React from 'react';
import '../index.css';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Register from './Register';
import Login from './Login';
import api from '../utils/Api'
import ProtectedRoute from './ProtectedRoute';
import Footer from './Footer';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoTooltip from './InfoTooltip';
import * as mestoAuth from '../utils/mestoAuth';

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setAvatarPopupOpen] = React.useState(false);
  const [isPopupImageOpen, setPopupImageOpen] = React.useState(false);
  const [isLuckyInfoTooltipOpen, setLuckyInfoTooltipOpen] = React.useState(false);
  const [isUnluckyInfoTooltipOpen, setUnluckyInfoTooltipOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [userData, setUserData] = React.useState({});
  const navigate = useNavigate();
  const emailOnly = userData.email;

  React.useEffect(() => {
    checkToken();
  }, []);

  React.useEffect(() => {
    api.getCards()
      .then(function (res) {
        setCards(res);
      })
      .catch(function (err) {
        console.log('ошибка', err);
      })
  }, []);

  React.useEffect(() => {
    api.getProfile()
      .then(function (res) {
        setCurrentUser(res)
      })
      .catch(function (err) {
        console.log('ошибка', err);
      })

  }, []);

  const checkToken = () => {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        mestoAuth.getContent(jwt).then((res) => {
            const data = {
              id: res.data._id,
              email: res.data.email
            }
            setLoggedIn(true);
            setUserData(data);
            navigate('/', { replace: true });
        })
      }
    }
  }

  function handleEditAvatarClick() {
    setAvatarPopupOpen(!isEditAvatarPopupOpen);
  }
  function handleEditProfileClick() {
    setEditProfilePopupOpen(!isEditProfilePopupOpen);
  }
  function handleAddPlaceClick() {
    setPlacePopupOpen(!isAddPlacePopupOpen);
  }
  function handlePopupImgClick() {
    setPopupImageOpen(!isPopupImageOpen);
  }
  function handleLuckyInfoTooltip() {
    setLuckyInfoTooltipOpen(!isLuckyInfoTooltipOpen);
  }
  function handleUnLuckyInfoTooltip() {
    setUnluckyInfoTooltipOpen(!isUnluckyInfoTooltipOpen);
  }

  function handleLogin() {
    setLoggedIn(!loggedIn);
  }

  function closeAllPopups() {
    isEditProfilePopupOpen && handleEditProfileClick();
    isAddPlacePopupOpen && handleAddPlaceClick();
    isEditAvatarPopupOpen && handleEditAvatarClick();
    isPopupImageOpen && handlePopupImgClick();
    isLuckyInfoTooltipOpen && handleLuckyInfoTooltip();
    isUnluckyInfoTooltipOpen && handleUnLuckyInfoTooltip();
  }

  function handleUpdateUser(data) {
    api.editInfo(data)
      .then(function (res) {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch(function (err) {
        console.log('ошибка', err);
      })
  }

  function handleAddPlaceSubmit(data) {
    api.postCard(data)
      .then(function (res) {
        setCards([res, ...cards]);
        closeAllPopups();
      })
      .catch(function (err) {
        console.log('ошибка', err);
      })
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data)
      .then(function (res) {
        setCurrentUser(res)
        closeAllPopups();
      })
      .catch(function (err) {
        console.log('ошибка', err);
      })
  }

  function handleCardLike(card) {

    // Снова проверяем, есть ли уже лайк на этой карточке (поставленный нами)
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(function (err) {
        console.log('ошибка', err);
      })
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then((nc) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch(function (err) {
        console.log('ошибка', err);
      })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <div className="root">
          <Routes>
            <Route path="/sign-in"
              element={
                <Header
                  linkName="Регистрация"
                  linkTo="/sign-up"
                />
              } />
            <Route path="/sign-up"
              element={
                <Header
                  linkName="Войти"
                  linkTo="/sign-in"
                />
              } />
            <Route path="/"
              element={
                <Header
                  linkName="Выйти"
                  linkTo="/sign-in"
                  email={emailOnly}
                  handleLogin={handleLogin}
                  userData={userData}
                />
              } />

          </Routes>

          <div className="page">

            <Routes>
              <Route
                path='/'
                element={
                  <ProtectedRoute
                    loggedIn={loggedIn}
                    onEditAvatar={handleEditAvatarClick}
                    onEditProfile={handleEditProfileClick}
                    onAddPlace={handleAddPlaceClick}
                    onCardClick={handlePopupImgClick}
                    setSelectedCard={setSelectedCard}
                    onCardLike={handleCardLike}
                    onCardDelete={handleCardDelete}
                    cards={cards}
                    component={Main} />
                } />
              <Route path='/sign-up'
                element={
                  <Register
                    handleLucky={handleLuckyInfoTooltip}
                    handleUnLucky={handleUnLuckyInfoTooltip}
                  />
                } />
              <Route path='/sign-in'
                element={
                  <Login
                    handleLogin={handleLogin}
                    handleUnLucky={handleUnLuckyInfoTooltip}
                  />
                } />
            </Routes>

            <Footer />
            <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
            <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
            <ImagePopup close={closeAllPopups} isOpen={isPopupImageOpen}
              selectedCard={selectedCard} />
            {/* <PopupWithForm name="are-you-sure" headerName="Вы уверены?" btnName="Да" /> */}
            <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
            <InfoTooltip text="Вы успешно зарегистрировались!" isOpen={isLuckyInfoTooltipOpen} onClose={closeAllPopups}
              success="_lucky" />
            <InfoTooltip text="Что-то пошло не так! Попробуйте ещё раз." isOpen={isUnluckyInfoTooltipOpen} onClose={closeAllPopups}
              success="_unlucky" />
          </div>
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
