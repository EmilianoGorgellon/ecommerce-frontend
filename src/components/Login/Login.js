import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from "react-router-dom";
import { loginUser } from "../../services/auth_services";
import { useDispatch, useSelector } from 'react-redux';
import { getTokenFromCookie } from "../../features/slices/token";
const Login = (params) => {
    const dispatch = useDispatch();
    const VALIDATION = {
        email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
        password: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,16}/
    }
    const token = useSelector(state => state.getToken);
    dispatch(getTokenFromCookie());
    if (token !== undefined && token !== "") {
        params.history.push("/");
    }
    
    return (
        <main className='container--login'>
            <div className='login'>
                <h1 className='login-title'>Hola! Ingresa tus datos para iniciar sesion</h1>
                    <Formik initialValues={{
                        email: "",
                        password: ""
                    }}
                        validate={(values) => {
                            let errors = {};
                            if (!values.email) {
                                errors.email = "Ingrese una dirección de correo electronico"
                            } else if (!VALIDATION.email.test(values.email)) {
                                errors.email = "Formato inválido. Ejemplo de formato válido: correo@gmail.com"
                            }
                            if (!values.password) {
                                errors.password = 'Ingrese una contraseña'
                            } else if (!VALIDATION.password.test(values.password)) {
                                errors.password = "Este campo debe contener una letra minuscula, una mayuscula, un numero y un digito especial"
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
                                window.location.reload();
                            }
                        }}
                    >
                        {({ errors }) => (
                            <Form>
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
                                <div className='container-input'>
                                    <Link to="/forget-password">Has olvidado tu contraseña ?</Link>
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