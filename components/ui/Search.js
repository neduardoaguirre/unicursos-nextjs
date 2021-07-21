import React, { useState } from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { FaSearch } from 'react-icons/fa';
import router from 'next/router';

const Button = styled.button`
  height: 3rem;
  width: 3rem;
  display: block;
  position: absolute;
  right: 1rem;
  top: 1.5px;
  background-color: #ffffff;
  border: none;
  text-indent: -9999px;

  &:hover {
    cursor: pointer;
  }
`;

const InputText = styled.input`
  padding: 1rem;
  min-width: 260px;
  @media (max-width: 768px) {
    min-width: 180px;
  }
`;

const Search = () => {
  const [search, setSearch] = useState('');
  const [emptySearch, setEmptySearch] = useState(false);

  const placeholderText = emptySearch
    ? 'Agrega un texto a tu búsqueda'
    : 'Buscar Cursos';
  const color = emptySearch && 'var(--red)';
  const border = emptySearch
    ? '1px solid var(--red)'
    : '1px solid var(--grey3)';

  const iconStyle = {
    position: 'absolute',
    right: '1rem',
    top: '11px',
    color: color,
  };

  const searchCourse = (e) => {
    e.preventDefault();
    if (search.trim() === '') {
      setEmptySearch(true);
    } else {
      console.log(search);
      router.push({
        pathname: '/search',
        query: { q: search },
      });
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
    setEmptySearch(false);
  };

  const handleOnKeyDown = (e) => {
    if (e.key === 'Enter') {
      searchCourse(e);
    }
  };

  return (
    <form
      css={css`
        position: relative;
      `}
      onSubmit={searchCourse}
      onKeyDown={handleOnKeyDown}
    >
      <InputText
        css={css`
          border: ${border};
          ::placeholder {
            color: ${color};
          }
        `}
        type="text"
        placeholder={placeholderText}
        onChange={handleChange}
      />
      <Button type="submit">
        <FaSearch style={iconStyle} />
      </Button>
    </form>
  );
};

export default Search;
