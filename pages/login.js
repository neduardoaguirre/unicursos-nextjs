import React, { useState } from 'react';
import { css } from '@emotion/react';
import router from 'next/router';
import Layout from '../components/layout/Layout';
import {
  Form,
  Field,
  InputSubmit,
  Error,
  ErrorSubmit,
} from '../components/ui/Form';

import firebase from '../firebase';

import useValidation from '../hooks/useValidation';
import validateLogin from '../validation/validateLogin';

const INITIAL_STATE = {
  email: '',
  password: '',
};

export default function Login() {
  const [error, setError] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, validateLogin, login);

  const { email, password } = values;

  async function login() {
    try {
      await firebase.login(email, password);
      router.push('/');
    } catch (error) {
      console.error('Oops, Something went wrong', error.message);
      setError(error.message);
    }
  }

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Iniciar Sesión
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
            {errors.email && <Error>{errors.email}</Error>}
            <Field>
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                placeholder="Tu email"
                name="email"
                value={email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
            {errors.password && <Error>{errors.password}</Error>}
            <Field>
              <label htmlFor="email">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="Tu contraseña"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>

            <InputSubmit type="submit" value="Iniciar Sesión" />
            {error && <ErrorSubmit>{error}</ErrorSubmit>}
          </Form>
        </>
      </Layout>
    </div>
  );
}
