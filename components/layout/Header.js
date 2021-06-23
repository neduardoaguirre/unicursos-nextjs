import React from 'react';
import Link from 'next/link';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Search from '../ui/Search';
import Navigation from '../layout/Navigation';
import Button from '../ui/Button';

const HeaderContainer = styled.div`
  max-width: 1200px;
  width: 95%;
  margin: 0 auto;
  @media (min-width: 768px) {
    display: flex;
    justify-content: space-between;
  }
`;

const Logo = styled.p`
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
  const user = false;

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
            margin-right: 2rem;
            display: flex;
            align-items: center;
          `}
        >
          {user ? (
            <>
              <p
                css={css`
                  margin-right: 2rem;
                `}
              >
                Hello: Eduardo
              </p>
              <Button bgColor="true">Salir</Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button bgColor="true">Ingresar</Button>
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
