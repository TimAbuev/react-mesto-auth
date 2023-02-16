import React from "react";
import '../components/styles/Login.css'

function Login() {
  return (
    <div className="login">
      <form>
        <h2 className="login__header">Вход</h2>
        <input className="login__input" type="text" minLength="2" maxLength="40" placeholder="Email"
          required />
        {/* <span className="error input-name-error"></span> */}

        <input className="login__input" type="password" placeholder="Пароль"
          required />
        {/* <span class="error input-link-error"></span> */}

        <button className="login__button" type="submit">Войти</button>
      </form>
    </div>
  );
}

export default Login;