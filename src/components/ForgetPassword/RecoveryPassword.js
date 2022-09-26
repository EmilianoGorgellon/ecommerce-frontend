import { Formik, Form, Field, ErrorMessage } from 'formik';
import {useState} from 'react'
import { recovery_password } from "../../services/usersService";
import {BiUser} from "react-icons/bi";
const RecoveryPassword = (props) => {
    const [repeatPassword, setRepeatPassword] = useState("");
    const VALIDATION = {
        password: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,16}/,
        code: /^[0-9]{6}$/
    }
    return (
        <main className='container--login'>
            <div className='login'>
                <h1 className='login-title'>Ingrese su nueva contraseña</h1>
                <Formik
                    initialValues={{
                        "code": "",
                        "new_password": "",
                        "repeat_new_password": ""
                    }}
                    validate={(values) => {
                        let errors = {}
                        if (!values.code) {
                            errors.code= "Ingrese el codigo de 6 digitos";
                        } else if (!VALIDATION.code.test(values.code)) {
                            errors.code= "Este campo solo debe contener 6 digitos";
                        }
                        if (!values.new_password) {
                            errors.password = "Ingrese una contraseña";
                        } else if (!VALIDATION.password.test(values.new_password)) {
                            errors.password = "Este campo debe contener 8 a 16 caracteres y una letra minuscula, una mayuscula, un numero y un caracter especial";
                        } 
                        return errors;
                    }}
                    onSubmit= {async (values) => {
                        if (values.new_password !== values.repeat_new_password) return setRepeatPassword("Contraseñas no coinciden");
                        return await recovery_password(props.email, values.code, values.new_password);
                    }}
                >
                    {({ errors }) => (
                        <Form>
                            <div className='container--email'>
                                <p className='email'><BiUser />{props.email}</p>
                            </div>
                            <div className='container-input'>
                                <label id="label-code" >Ingrese su codigo de 6 digitos<br /></label>
                                <Field id="label-code" className="input" name="code" type="number" placeholder="Su codigo" />
                                <ErrorMessage name="code" component={() => <p className='input--error-msj'>{errors.code}</p>} />
                            </div>
                            <div className='container-input'>
                                <label id="label-pw" >Ingrese su nueva contraseña <br /></label>
                                <Field id="label-pw" className="input" name="new_password" type="password" placeholder="Su nueva contraseña" />
                                <ErrorMessage name="new_password" component={() => <p className='input--error-msj'>{errors.password}</p>} />
                            </div>
                            <div className='container-input'>
                                <label id="label-new-pw">Repita su nueva contraseña <br /></label>
                                <Field id="label-new-pw" className='input' name="repeat_new_password" type="password" placeholder="Repita su nueva contraseña" />
                                <p className="input--error-msj">{repeatPassword}</p>
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

export default RecoveryPassword;