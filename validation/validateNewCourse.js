export default function validateNewProduct(values) {
  let errors = {};

  if (!values.name) {
    errors.name = 'El nombre es obligatorio';
  }

  if (!values.url) {
    errors.url = 'La URL es obligatoria';
  } else if (!/^(ftp|http|https):\/\/[^ "]+$/.test(values.url)) {
    errors.url = 'Ingrese una URL válida';
  }

  if (!values.description) {
    errors.description = 'La descripción es obligatoria';
  }

  return errors;
}
