import React, { useState, useContext } from 'react';
import { css } from '@emotion/react';
import Router, { useRouter } from 'next/router';
import Layout from '../components/layout/Layout';
import {
  Form,
  Field,
  InputSubmit,
  Error,
  ErrorSubmit,
} from '../components/ui/Form';

import FileUploader from 'react-firebase-file-uploader';

import { FirebaseContext } from '../firebase';

import useValidation from '../hooks/useValidation';
import validateNewProduct from '../validation/validateNewCourse';

const INITIAL_STATE = {
  name: '',
  brand: '',
  //image: '',
  url: '',
  description: '',
};

export default function NewProduct() {
  const [error, setError] = useState(false);

  const [imageName, setImageName] = useState('');
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState('');

  const { values, errors, handleChange, handleSubmit, handleBlur } =
    useValidation(INITIAL_STATE, validateNewProduct, newProduct);

  const { name, image, url, description } = values;

  const router = useRouter();

  const { user, firebase } = useContext(FirebaseContext);

  async function newProduct() {
    if (!user) {
      return router.push('/login');
    }

    const course = {
      name,
      url,
      imageUrl,
      description,
      votes: 0,
      comments: [],
      created: Date.now(),
    };

    firebase.db.collection('courses').add(course);
    return router.push('/');
  }

  const handleUploadStart = () => {
    setProgress(0);
    setUploading(true);
  };

  const handleProgress = (progress) => {
    setProgress({ progress });
  };

  const handleUploadError = (error) => {
    setUploading(error);
    console.error(error);
  };

  const handleUploadSuccess = (name) => {
    setProgress(100);
    setUploading(false);
    setImageName(name);
    firebase.storage
      .ref('products')
      .child(name)
      .getDownloadURL()
      .then((url) => {
        console.log(url);
        setImageUrl(url);
      });
  };

  return (
    <div>
      <Layout>
        <>
          <h1
            css={css`
              text-align: center;
              margin-top: 5rem;
            `}
          >
            Agregar Curso
          </h1>
          <Form onSubmit={handleSubmit} noValidate>
            <fieldset>
              {errors.name && <Error>{errors.name}</Error>}
              <Field>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  id="name"
                  placeholder="Nombre del curso"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>

              <Field>
                <label htmlFor="image">Imagen</label>
                <FileUploader
                  accept="image/*"
                  id="image"
                  name="image"
                  randomizeFileName
                  storageRef={firebase.storage.ref('products')}
                  onUploadStart={handleUploadStart}
                  onUploadError={handleUploadError}
                  onUploadSuccess={handleUploadSuccess}
                  onProgress={handleProgress}
                />
              </Field>

              {errors.url && <Error>{errors.url}</Error>}
              <Field>
                <label htmlFor="url">URL</label>
                <input
                  type="url"
                  id="url"
                  placeholder="Product URL"
                  name="url"
                  value={url}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
            </fieldset>

            <fieldset>
              <legend>Sobre tu curso</legend>

              {errors.description && <Error>{errors.description}</Error>}
              <Field>
                <label htmlFor="description">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Field>
            </fieldset>

            <InputSubmit type="submit" value="Agregar Curso" />
            {error && <ErrorSubmit>{error}</ErrorSubmit>}
          </Form>
        </>
      </Layout>
    </div>
  );
}
