import { Formik, Form, Field, ErrorMessage } from 'formik';
import { loginUser } from "../../services/usersService";
import { useDispatch } from 'react-redux';
import { getTokenFromCookie } from "../../features/slices/token"
const Login = (params) => {
    const dispatch = useDispatch();
    const VALIDATION = {
        email: /^[0-9a-zA-Z\._-]+@[0-9a-zA-Z\._-]+\.[a-z\.]{2,6}$/,
        password: /^[0-9a-zA-Z\s]{3,}$/,
    }

    return (
        <main className='container--login'>
            <div className='login'>
                <h1 className='login-title'>Hola! Ingresa tus datos para iniciar sesion</h1>
                    <Formik className='login--container-form' initialValues={{
                        email: "",
                        password: ""
                    }}
                        validate={(values) => {
                            let errors = {};
                            if (!values.email) {
                                errors.email = "Debe ingresar su nombre"
                            } else if (!VALIDATION.email.test(values.email)) {
                                errors.email = "Formato inválido. Ejemplo de formato válido: correo@correo.com"
                            }
                            if (!values.password) {
                                errors.password = 'Ingrese una dirección de correo'
                            } else if (!VALIDATION.password.test(values.password)) {
                                errors.password = "Este campo debe contener solo letras, y un mínimo de 3 caracteres."
                            }
                            return errors;
                        }}
                        onSubmit={async (values) => {
                            const DATA = {
                                email: values.email,
                                password: values.password,
                            }
                            const response = await loginUser(DATA);
                            if (typeof (response) === "string") {
                                params.history.push("/");
                                dispatch(getTokenFromCookie());
                            }
                        }}
                    >
                        {({ errors }) => (
                            <Form encType='multipart/form-data' className='container--inputs'>
                                <div className='container-input'>
                                    <label id="labelemail" className='input-label'>Email <br /></label>
                                    <Field id="labelemail" className="input" name="email" type="email" placeholder="Su nombre" />
                                    <ErrorMessage name="email" component={() => <p className='input--error-msj'>{errors.email}</p>} />
                                </div>
                                <div className='container-input'>
                                    <label id="labelpassword" className='input-label'>Contraseña <br /></label>
                                    <Field id="labelpassword" className="input" name="password" type="password" placeholder="Su password" />
                                    <ErrorMessage name="password" component={() => <p className='input--error-msj'>{errors.password}</p>} />
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

export default Login