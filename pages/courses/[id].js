import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import Error404 from '../../components/layout/Error404';
import Layout from '../../components/layout/Layout';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { InputSubmit, Field } from '../../components/ui/Form';
import Button from '../../components/ui/Button';

const CourseContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const Course = () => {
  const [course, setCourse] = useState({});
  const [error, setError] = useState(false);
  const router = useRouter();
  const {
    query: { id },
  } = router;

  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    if (id) {
      const getCourse = async () => {
        const courseQuery = await firebase.db.collection('courses').doc(id);
        const course = await courseQuery.get();
        if (course.exists) {
          setCourse(course.data());
        } else {
          setError(true);
        }
      };
      getCourse();
    }
  }, [id]);

  const loading = Object.keys(course).length;

  const { comments, created, description, name, url, imageUrl, votes, owner } =
    course;

  return (
    <Layout>
      <>
        {loading === 0 && !error ? (
          'Cargando...'
        ) : error ? (
          <Error404 message="Curso inexistente" />
        ) : (
          <div className="container">
            <h1
              css={css`
                text-align: center;
                margin-top: 2rem;
              `}
            >
              {name}
            </h1>
            <CourseContainer>
              <div>
                <p>
                  Publicado hace{' '}
                  {formatDistanceToNow(new Date(created), { locale: es })}
                </p>
                <p>Instructor: {owner.name}</p>
                <img src={imageUrl} />
                <p>{description}</p>
                {user && (
                  <>
                    <h2>Agregá tu comentario</h2>
                    <form>
                      <Field>
                        <input type="text" name="message" />
                      </Field>
                      <InputSubmit type="submit" value="Enviar" />
                    </form>
                  </>
                )}
                <h2
                  css={css`
                    margin: 2rem 0;
                  `}
                >
                  Comentarios
                </h2>
                {comments.map((comment) => (
                  <li>
                    <p>{comment.name}</p>
                    <p>Escrito por: {comment.userName}</p>
                  </li>
                ))}
              </div>
              <aside>
                <Button target="_blank" bgColor="true" href={url}>
                  Ver Curso
                </Button>
                <div
                  css={css`
                    margin-top: 5rem;
                  `}
                >
                  <p
                    css={css`
                      text-align: center;
                    `}
                  >
                    {votes} Votos
                  </p>
                  {user && <Button>Votar</Button>}
                </div>
              </aside>
            </CourseContainer>
          </div>
        )}
      </>
    </Layout>
  );
};

export default Course;
