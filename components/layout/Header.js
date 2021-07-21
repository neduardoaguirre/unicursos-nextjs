import React, { useContext } from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Search from '../ui/Search';
import Navigation from '../layout/Navigation';
import Button from '../ui/Button';
import Swal from 'sweetalert2';
import { FirebaseContext } from '../../firebase';

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
`;

const Logo = styled.a`
  color: var(--green);
  font-size: 4rem;
  line-height: 0;
  font-weight: 700;
  font-family: 'Roboto Slab', sans-serif;
  margin-right: 2rem;

  &:hover {
    cursor: pointer;
  }
`;

const Header = () => {
  const { user, firebase } = useContext(FirebaseContext);

  const logOut = () => {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Has cerrado sesión correctamente',
      showConfirmButton: false,
      timer: 1500,
    });
    firebase.logOut();
  };

  return (
    <header
      css={css`
        border-bottom: 2px solid var(--grey3);
        padding: 1rem 0;
      `}
    >
      <HeaderContainer>
        <div
          css={css`
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
          `}
        >
          <Link href="/">
            <Logo>UC</Logo>
          </Link>

          <Search />
          <Navigation />
        </div>
        <div
          css={css`
            display: flex;
            align-items: center;
            justify-content: center;
          `}
        >
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                ¡Hola {user.displayName}!
              </p>
              <Button bgColor="true" onClick={() => logOut()}>
                Salir
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button
                  bgColor="true"
                  css={css`
                    margin-right: 1rem;
                  `}
                >
                  Ingresar
                </Button>
              </Link>
              <Link href="/sign-up">
                <Button>Registrarse</Button>
              </Link>
            </>
          )}
        </div>
      </HeaderContainer>
    </header>
  );
};

export default Header;
