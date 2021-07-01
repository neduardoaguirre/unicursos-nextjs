import React from 'react';
import { css } from '@emotion/react';

const NotAvailable = ({ message }) => {
  return (
    <h1
      css={css`
        margin-top: 5rem;
        text-align: center;
      `}
    >
      {message}
    </h1>
  );
};

export default NotAvailable;
