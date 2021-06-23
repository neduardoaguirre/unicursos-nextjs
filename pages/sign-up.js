import React, { useState } from 'react';
import { css } from '@emotion/react';
import Router from 'next/router';
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
import validateSignUp from '../validation/validateSignUp';

export default function SignUp() {
  const INITIAL_STATE = {
    name: '',
    email: '',
    password: '',
  };

  const [error, setError] = useState(false);

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, validateSignUp, signUp);

  const { name, email, password } = values;

  async function signUp() {
    try {
      await firebase.userRegistration(name, email, password);
      Router.push('/');
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
            Registrarse
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
            {errors.name && <Error>{errors.name}</Error>}
            <Field>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                id="name"
                placeholder="Tu nombre"
                name="name"
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>
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
                placeholder="Tu Contraseña"
                name="password"
                value={password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Field>

            <InputSubmit type="submit" value="Registrarse" />
            {error && <ErrorSubmit>{error}</ErrorSubmit>}
          </Form>
        </>
      </Layout>
    </div>
  );
}
