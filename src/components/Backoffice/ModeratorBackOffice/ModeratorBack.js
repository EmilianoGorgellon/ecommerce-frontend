import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { userToModerator } from "../../../services/user_services";
import SweetAlert from '../../SweetAlert/SweetAlert';
const ModeratorBack = () => {
  const token = useSelector(state => state.getToken);
  if (token === "") return  window.location.pathname = "/";
  const VALIDATION = {
    email: /^([0-9a-z_\.\+-]+)@(gmail.com)$/,
  }
  return (
    <main className='container--moderator-back'>
      <section className='moderator--back'>
        <h1 className='moderator--back-title'>Convertir un usuario a moderador</h1>
        <Formik
          initialValues={{
            "email": ""
          }}
          validate={(values) => {
            let errors = {};
            if (!values.email) {
              errors.email = "Ingrese una dirección de correo electronico"
            } else if (!VALIDATION.email.test(values.email)) {
                errors.email = "Formato inválido. Ejemplo de formato válido: correo@gmail.com"
            }
            return errors;
          }}
          onSubmit = {async (values) => {
            try {
              await userToModerator(values, token)
            } catch (error) {
              return SweetAlert("Error!", "Error, asegurese de completar todos los campos", "error", "Exit")
            }
          }}
        >
          {({ errors }) => (
            <Form className='container--moderator-back-form'>
              <Field className="moderator--back-input" name="email" type="email" placeholder="Ingrese un email" />
              <ErrorMessage name="email" component={() => <p className='input--error-msj'>{errors.email}</p>} />
              <input className='moderator--back-button' type="submit" value="Enviar" />
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default ModeratorBack;