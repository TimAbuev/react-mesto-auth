import React from "react";
import { Link } from "react-router-dom";
import '../components/styles/Register.css';

function Register() {
  return (
    <div className="register">

      <h2 className="register__header">Регистрация</h2>
      <input className="register__input" type="text" minLength="2" maxLength="40" placeholder="Email"
        required />
      {/* <span className="error input-name-error"></span> */}

      <input className="register__input" type="password" placeholder="Пароль"
        required />
      {/* <span class="error input-link-error"></span> */}

      <button className="register__button" type="submit">Зарегистрироваться</button>
      <p className="register__capture">Уже зарегистрированы? 
        <Link to="/sign-in" className="register__btn-enter"> Войти</Link>
      </p>
      
    </div>

  );
}

export default Register;