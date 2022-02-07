interface FormError {
  [key: string]: string;
}

export const formErrors: FormError = {
  required: 'El campo es requerido',
  email: 'El correo es inválido',
};
