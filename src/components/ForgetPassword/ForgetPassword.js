import { Formik, Form, Field, ErrorMessage } from 'formik';
import { forgetPassword } from "../../services/usersService";
import RecoveryPassword from './RecoveryPassword';
import { useState } from 'react';
const ForgetPassword = () => {
  const [render, setRender] = useState(false);
  const [email, setEmail] = useState("")
  const VALIDATION = {
    email: /^([0-9a-z_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
  }
  return (
    render ? <RecoveryPassword email={email}/> : 
    <main className='container--login'>
      <div className='login'>
        <h1 className='login-title'>Ingrese su email para recuperar su contraseña</h1>
        <Formik
          initialValues={{
            "email": ""
          }}
          validate={(values) => {
            let errors = {}
            if (!values.email) {
              errors.email = "Ingrese una dirección de correo electronico"
            } else if (!VALIDATION.email.test(values.email)) {
              errors.email = "Formato inválido. Ejemplo de formato válido: correo@gmail.com"
            } 
            return errors;
          }}
          onSubmit= {async (values) => {
            const response = await forgetPassword(values.email);
            if (response < 400) {
              setEmail(values.email);
              setRender(true);
            }
          }}
        >
          {({ errors }) => (
            <Form>
              <div className='container-input'>
                <label id="labelemail" className='input-label'>Email <br /></label>
                <Field id="labelemail" className="input" name="email" type="email" placeholder="Su email" />
                <ErrorMessage name="email" component={() => <p className='input--error-msj'>{errors.email}</p>} />
              </div>
              <div className='container--button-submit'>
                <button className="button-submit" type="submit">Enviar</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  )
}

export default ForgetPassword;