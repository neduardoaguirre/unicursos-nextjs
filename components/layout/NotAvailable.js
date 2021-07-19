import React from 'react';
import { css } from '@emotion/react';
import { FaExclamationCircle } from 'react-icons/fa';

const NotAvailable = ({ message }) => {
  return (
    <h1
      css={css`
        margin-top: 5rem;
        text-align: center;
      `}
    >
      <FaExclamationCircle
        css={css`
          color: var(--red);
        `}
      />{' '}
      {message}
    </h1>
  );
};

export default NotAvailable;
