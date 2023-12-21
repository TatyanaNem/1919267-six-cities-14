import { FormEvent, useEffect, useState, useMemo } from 'react';
import Logo from '../../components/logo/logo';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { fetchFavoriteOffers, login } from '../../store/api-actions';
import { AppRoute, AuthorizationStatus, CityMap, RequestStatus } from '../../const';
import { selectAuthorizationStatus, selectSendingStatus } from '../../store/user-data/selectors';
import styles from './login-page.module.css';
import { getRandomArrayElement } from '../../utils/common';
import { setCurrentCity } from '../../store/offers-data/offers-data';
import { setSendingStatus } from '../../store/user-data/user-data';

function LoginPage(): JSX.Element {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isEmailFilled, setEmailFilled] = useState(false);
  const [isPasswordFilled, setPasswordFilled] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const checkPassword = /^(?=.*[A-Za-zА-Яа-я])(?=.*\d).+$/.test(password);
  const checkEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const EMAIL_ERROR_TEXT = 'Please enter a correct email address.';
  const PASSWORD_ERROR_TEXT =
  'Password must contain at least one letter and one digit. Please enter a correct password!';
  const isValid = checkEmail && checkPassword;

  const authorizationStatus = useAppSelector(selectAuthorizationStatus);
  const sendingStatus = useAppSelector(selectSendingStatus);
  const randomCity = useMemo(() => getRandomArrayElement(Object.values(CityMap)), []);

  function handleFormSubmit (evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
    if (!isValid) {
      return;
    }

    dispatch(login({email, password}))
      .then(() => dispatch(fetchFavoriteOffers()));
  }

  function onChangeEmailHandler (evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target instanceof HTMLInputElement) {
      const value = evt.target.value;
      setEmail(value);
    }
  }

  function onChangePasswordlHandler (evt: React.ChangeEvent<HTMLInputElement>) {
    if (evt.target instanceof HTMLInputElement) {
      const value = evt.target.value;
      setPassword(value);
    }
  }

  function onRandomCityClickHandler (evt: React.MouseEvent<HTMLAnchorElement>) {
    evt.preventDefault();
    dispatch(setCurrentCity(randomCity));
    navigate(AppRoute.Root);
  }

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      navigate(AppRoute.Root);
    }
  }, [authorizationStatus, navigate]);

  useEffect(() => {
    if (sendingStatus === RequestStatus.Success && email && password) {
      dispatch(setSendingStatus(RequestStatus.Idle));
      setEmail('');
      setPassword('');
      navigate(AppRoute.Root);
    }
  }, [dispatch, sendingStatus, email, password, navigate]);

  return (
    <div className="page page--gray page--login">
      <Helmet>
        <title>6 cities. Login page</title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <Logo />
            </div>
          </div>
        </div>
      </header>

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={handleFormSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  onChange={onChangeEmailHandler}
                  onBlur={() => setEmailFilled(true)}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  data-testid="emailElement"
                  placeholder="Email"
                  value={email}
                  required
                />
                {isEmailFilled && !checkEmail && (
                  <div className={styles.error}>{EMAIL_ERROR_TEXT}</div>
                )}
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  onChange={onChangePasswordlHandler}
                  onBlur={() => setPasswordFilled(true)}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  data-testid="passwordElement"
                  placeholder="Password"
                  value={password}
                  required
                />
                {isPasswordFilled && !checkPassword && (
                  <div className={styles.error}>{PASSWORD_ERROR_TEXT}</div>
                )}
              </div>
              <button
                className="login__submit form__submit button"
                type="submit" disabled={email === '' || password === '' || !checkPassword || !checkEmail}
              >
                {sendingStatus === RequestStatus.Loading
                  ? 'Logging in...'
                  : 'Sign in'}
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a
                href="#"
                className="locations__item-link"
                onClick={onRandomCityClickHandler}
              >
                <span>{randomCity.name}</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default LoginPage;
