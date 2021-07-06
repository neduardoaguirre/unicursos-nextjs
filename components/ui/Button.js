import styled from '@emotion/styled';

const Button = styled.a`
  display: block;
  font-weight: 700;
  border: 1px solid #d1d1d1;
  margin: 2rem 0rem;
  text-align: center;
  border-radius: 0.5rem;
  padding: 0.8rem 2rem;
  background-color: ${(props) => (props.bgColor ? '#0D9716' : '#ffffff')};
  color: ${(props) => (props.bgColor ? '#ffffff' : '#000000')};
  &:last-of-type {
    margin-right: 0;
  }
  &:hover {
    cursor: pointer;
  }
`;

export default Button;
