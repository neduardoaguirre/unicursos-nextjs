import React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';

const InputText = styled.input`
  border: 1px solid var(--grey3);
  padding: 1rem;
  min-width: 300px;
`;

const Button = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  background-size: 4rem;
  background-image: url('/static/img/search.png');
  background-repeat: no-repeat;
  position: absolute;
  right: 1rem;
  top: 1.5px;
  background-color: #ffffff;
  border: none;
  text-indent: -9999px;

  &hover {
    cursor: pointer;
  }
`;

const Search = () => {
  return (
    <form
      css={css`
        position: relative;
      `}
    >
      <InputText type="text" placeholder="Buscar Cursos" />
      <Button type="submit">Buscar</Button>
    </form>
  );
};

export default Search;
