import styled from '@emotion/styled';

export const Form = styled.form`
  max-width: 600px;
  width: 90%;
  margin: 5rem auto;

  fieldset {
    margin: 2rem 0;
    border: 1px solid #e1e1e1;
    font-size: 2rem;
    padding: 2rem;
  }
`;

export const Field = styled.div`
  margin-bottom: 2rem;
  display: flex;
  align-items: center;
  label {
    flex: 0 0 100px;
    font-size: 1.8rem;
  }

  input {
    flex: 1;
    padding: 1rem;
  }

  textarea {
    flex: 1;
    height: 300px;
  }
`;

export const InputSubmit = styled.input`
  background-color: var(--green);
  width: 100%;
  padding: 1.5rem;
  text-align: center;
  color: #ffffff;
  font-size: 1.8rem;
  text-transform: uppercase;
  border: none;
  border-radius: 0.5rem;
  font-family: 'PT Sans', sans-serif;
  font-weight: 700;
  &:hover {
    cursor: pointer;
  }
`;

export const Error = styled.p`
  font-family: 'PT Sans', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: #ff0000;
  text-align: center;
  text-transform: uppercase;
  margin: 0.5rem 0;
`;

export const ErrorSubmit = styled.p`
  background-color: red;
  padding: 1rem;
  font-family: 'PT Sans', sans-serif;
  font-weight: 700;
  font-size: 1.4rem;
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  margin: 2rem 0;
`;
