import React from 'react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';

const Course = styled.li`
  padding: 4rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e1e1e1;
`;

const Title = styled.a`
  font-weight: bold;
  font-size: 2rem;
  margin: 0;
  :hover {
    cursor: pointer;
  }
`;

const Description = styled.div`
  flex: 0 1 600px;
  display: grid;
  grid-template-columns: 1fr 3fr;
  column-gap: 2rem;
`;

const Text = styled.p`
  font-size: 1.6rem;
  margin: 0;
  color: #888888;
`;

const Comments = styled.div`
  margin-top: 2rem;
  display: flex;
  align-items: center;
  div {
    display: flex;
    align-items: center;
    border: 1px solid #e1e1e1;
    padding: 0.3rem 1rem;
    margin-right: 2rem;
  }
  img {
    width: 2rem;
    margin-right: 2rem;
  }
  p {
    font-size: 1.6rem;
    margin-right: 1rem;
    font-weight: 700;
    &:last-of-type {
      margin: 0;
    }
  }
`;

const Votes = styled.div`
  flex: 0 0 auto;
  text-align: center;
  border: 1px solid #e1e1e1;
  padding: 1rem 3rem;
  div {
    font-size: 2rem;
  }
  p {
    margin: 0;
    font-size: 2rem;
    font-weight: 700;
  }
`;
const Image = styled.img`
  width: 200px;
`;

const CoursePreview = ({ course }) => {
  const { id, comments, created, description, name, url, imageUrl, votes } =
    course;

  return (
    <Course>
      <Description>
        <div>
          <Image src={imageUrl} />
        </div>
        <div>
          <Title>{name}</Title>
          <Text>{description}</Text>
          <Comments>
            <div>
              <img src="/static/img/comment.png" />
              <p>{comments.length} Comentarios</p>
            </div>
          </Comments>
          <p>
            Publicado hace:{' '}
            {formatDistanceToNow(new Date(created), { locale: es })}
          </p>
        </div>
      </Description>
      <Votes>
        <div>&#9650;</div>
        <p>{votes}</p>
      </Votes>
    </Course>
  );
};

export default CoursePreview;
