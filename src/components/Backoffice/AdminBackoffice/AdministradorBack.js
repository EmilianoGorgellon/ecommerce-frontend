import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';
import { useSelector } from 'react-redux';
import { userToAdmin } from "../../../services/usersService";
import SweetAlert from '../../SweetAlert/SweetAlert';
const AdministradorBack = () => {
  const token = useSelector(state => state.getToken);
  const VALIDATION = {
    email: /^([0-9a-z_\.\+-]+)@(gmail.com)$/,
  }
  return (
    <main className='container--admin-back'>
      <section className='admin--back'>
        <h1 className='admin--back-title'>Convertir un usuario a administrador</h1>
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
              await userToAdmin(values, token)
            } catch (error) {
              return SweetAlert("Error!", "Error, asegurese de completar todos los campos", "error", "Exit")
            }
          }}
        >
          {({ errors }) => (
            <Form className='container--admin-back-form'>
              <Field className="admin--back-input" name="email" type="email" placeholder="Ingrese un email" />
              <ErrorMessage name="email" component={() => <p className='input--error-msj'>{errors.email}</p>} />
              <input className='admin--back-button' type="submit" value="Enviar" />
            </Form>
          )}
        </Formik>
      </section>
    </main>
  )
}

export default AdministradorBack