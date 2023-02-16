import React from "react";
import { Link, useNavigate } from "react-router-dom";
import '../components/styles/Register.css';
import * as mestoAuth from '../utils/mestoAuth.js'

function Register() {
  // const [formValue, setFormValue] = React.useState({
  //   email: '',
  //   password: '',
  // });
  // const navigate = useNavigate();
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   //console.log(e.target.value);
  //   setFormValue({
  //     ...formValue,
  //     [name]: value
  //   })
  // }
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const { password, email } = formValue;
  //   mestoAuth.register(password, email).then((res) => {
  //     if (res.statusCode !== 400) {
  //       navigate('/sign-in', { replace: true });
  //     } else {
  //       console.log("400 - некорректно заполнено одно из полей");
  //     }
  //   })
  // }

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }
  function handleChangePassword(e) {
    setPassword(e.target.value);
  }
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();

    mestoAuth.register(password, email)
      .then((res) => {
        if (res.statusCode !== 400) {
          navigate('/sign-in', { replace: true });
        } else {
          console.log("400 - некорректно заполнено одно из полей");
        }
      })
  }

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <h2 className="register__header">Регистрация</h2>
        <input name="email" className="register__input" type="text" minLength="2" maxLength="40" placeholder="Email"
          onChange={handleChangeEmail} value={email} />
        {/* <span className="error input-name-error"></span> */}

        <input name="password" className="register__input" type="password" placeholder="Пароль"
          onChange={handleChangePassword} value={password} />
        {/* <span class="error input-link-error"></span> */}

        <button className="register__button" type="submit">Зарегистрироваться</button>
        <p className="register__capture">Уже зарегистрированы?
          <Link to="/sign-in" className="register__btn-enter"> Войти</Link>
        </p>
      </form>
    </div>

  );
}

export default Register;