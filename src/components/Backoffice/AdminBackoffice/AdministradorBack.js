import { Formik, Form, Field, ErrorMessage } from 'formik'
import React from 'react'
import { useSelector } from 'react-redux'
import { userToAdmin } from "../../../services/usersService"
const AdministradorBack = () => {
  const token = useSelector(state => state.getToken);
  const VALIDATION = {
    email: /^([0-9a-z_\.\+-]+)@(gmail.com)$/,
  }
  return (
    <main>
      <h1>Convertir un usuario a administrador</h1>
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
            return console.log("ERROR")
          }
        }}
      >
        {({ errors }) => (
          <Form>
            <div className='container-input'>
              <Field className="input" name="email" type="email" placeholder="Ingrese su email" />
              <ErrorMessage name="email" component={() => <p className='input--error-msj'>{errors.email}</p>} />
            </div>
            <div>
              <input type="submit" value="Enviar" />
            </div>
          </Form>
        )}
      </Formik>
    </main>
  )
}

export default AdministradorBack