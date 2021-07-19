import React, { useEffect, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { FirebaseContext } from '../../firebase';
import NotAvailable from '../../components/layout/NotAvailable';
import Layout from '../../components/layout/Layout';
import { css } from '@emotion/react';
import styled from '@emotion/styled';
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import { es } from 'date-fns/locale';
import { InputSubmit, Field, Error } from '../../components/ui/Form';
import Button from '../../components/ui/Button';
import Spinner from '../../components/ui/Spinner';
import Swal from 'sweetalert2';
import { FaTrash, FaLink, FaVoteYea } from 'react-icons/fa';

const CourseContainer = styled.div`
  @media (min-width: 768px) {
    display: grid;
    grid-template-columns: 2fr 1fr;
    column-gap: 2rem;
  }
`;

const Owner = styled.p`
  padding: 0.5rem 2rem;
  border: 1px solid #d1d1d1;
  color: #000000;
  border-radius: 0.5rem;
  display: inline-block;
  font-weight: bold;
  text-align: center;
`;

const Course = () => {
  const [course, setCourse] = useState({});
  const [error, setError] = useState(false);
  const [duplicateVote, setDuplicateVote] = useState(false);
  const [comment, setComment] = useState({});
  const [queryDB, setQueryDB] = useState(true);
  const [emptyComment, setEmptyComment] = useState(false);
  const router = useRouter();
  const {
    query: { id },
  } = router;
  const { firebase, user } = useContext(FirebaseContext);

  useEffect(() => {
    if (id && queryDB) {
      const getCourse = async () => {
        const courseQuery = await firebase.db.collection('courses').doc(id);
        const course = await courseQuery.get();
        if (course.exists) {
          setCourse(course.data());
          setQueryDB(false);
        } else {
          setError(true);
          setQueryDB(false);
        }
      };
      getCourse();
    }
  }, [id, queryDB]);

  const loading = Object.keys(course).length;

  const {
    comments,
    created,
    description,
    name,
    url,
    imageUrl,
    votes,
    owner,
    voters,
  } = course;

  const voteCourse = () => {
    if (voters.includes(user.uid)) {
      setDuplicateVote(true);
    } else {
      const increaseVote = votes + 1;
      const newVoters = [...voters, user.uid];
      firebase.db
        .collection('courses')
        .doc(id)
        .update({ votes: increaseVote, voters: newVoters });
      setCourse({
        ...course,
        votes: increaseVote,
      });
      setQueryDB(true);
    }
  };

  const handleComment = (e) => {
    setComment({
      ...comment,
      [e.target.name]: e.target.value,
      userId: user.uid,
      userName: user.displayName,
    });
  };

  const isOwner = (id) => {
    if (owner.id === id) {
      return true;
    }
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    if (Object.keys(comment).length === 0) {
      setEmptyComment(true);
    } else {
      const updateComments = [...comments, comment];
      firebase.db.collection('courses').doc(id).update({
        comments: updateComments,
      });
      setCourse({
        ...course,
        comments: updateComments,
      });
      e.target.reset();
      setComment({});
      setQueryDB(true);
      setEmptyComment(false);
    }
  };

  const canDeleteCourse = () => {
    if (!user) return false;
    if (owner.id === user.uid) return true;
  };

  const deleteCourse = async () => {
    try {
      await firebase.db.collection('courses').doc(id).delete();
      Swal.fire('¡Eliminado!', 'El curso ha sido eliminado.', 'success');
      router.push('/');
    } catch (error) {
      console.error(error);
    }
  };

  const confirmDelete = () => {
    Swal.fire({
      title: '¿Desea eliminar este curso?',
      text: '¡No se podrá revertir esta acción!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCourse();
      }
    });
  };

  return (
    <Layout>
      <>
        {loading === 0 && !error ? (
          <Spinner />
        ) : error ? (
          <NotAvailable message="Curso inexistente" />
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
                <div
                  css={css`
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                  `}
                >
                  <div>
                    <p>
                      Publicado hace{' '}
                      {formatDistanceToNow(new Date(created), { locale: es })}
                    </p>
                    <p>Instructor: {owner.name}</p>
                  </div>
                  {canDeleteCourse() && (
                    <Button onClick={confirmDelete}>
                      <FaTrash
                        css={css`
                          color: red;
                        `}
                      />
                    </Button>
                  )}
                </div>
                <img src={imageUrl} />
                <p>{description}</p>
                {user && (
                  <>
                    <h2>Agregá tu comentario</h2>
                    <form onSubmit={handleSubmitComment}>
                      {emptyComment && (
                        <Error>Agrega un texto a tu comentario</Error>
                      )}
                      <Field>
                        <input
                          type="text"
                          name="message"
                          onChange={handleComment}
                        />
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
                {comments.length === 0 ? (
                  <p>Aún no hay commentarios. ¡Sé el primero en comentar!</p>
                ) : (
                  <ul>
                    {comments.map((comment, i) => (
                      <li
                        key={`${comment.userId}-${i}`}
                        css={css`
                          border: 1px solid #e1e1e1;
                          padding: 2rem;
                        `}
                      >
                        <p>{comment.message}</p>
                        <p
                          css={css`
                            font-weight: bold;
                          `}
                        >
                          {comment.userName}
                        </p>
                        {isOwner(comment.userId) && <Owner>Instructor</Owner>}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <aside
                css={css`
                  margin-top: 0.5rem;
                `}
              >
                <Button target="_blank" href={url}>
                  Link {''}
                  <FaLink />
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
                  {duplicateVote && <Error>Ya has votado este curso</Error>}
                  {user && user.uid !== owner.id ? (
                    <Button onClick={voteCourse}>
                      Votar {''}
                      <FaVoteYea />
                    </Button>
                  ) : null}
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
