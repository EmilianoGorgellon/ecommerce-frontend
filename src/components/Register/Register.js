import {useState, useEffect} from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { saveUser } from '../../services/usersService';
import SweetAlert from '../SweetAlert/SweetAlert';
import { BiCamera } from 'react-icons/bi';
const Register = () => {
    const [repeatPassword, setRepeatPassword] = useState("");
    const [fileImageMsj, setFileImageMsj] = useState(false);
    const [mouseInImage, setMouseInImage] = useState(false);
    const [newImage, setNewImage] = useState("https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_960_720.png")
    const VALIDATION = {
        name: /^[a-zA-Z\s]{3,}$/,
        // email: /^([0-9a-z_\.\+-]+)@(gmail.com||hotmail.com)$/,
        email: /^([0-9a-z_\.\+-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/,
        password: /(?=(.*[0-9]))(?=.*[\!@#$%^&*()\\[\]{}\-_+=|:;"'<>,./?])(?=.*[a-z])(?=(.*[A-Z]))(?=(.*)).{8,16}/
    }
    useEffect(() => {
        setTimeout(() => setFileImageMsj(false), 1500)
    }, [fileImageMsj])

    useEffect(() => {
        setTimeout(() => setRepeatPassword(""), 1500)
    }, [repeatPassword])

    const changeImage = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);
        setNewImage(url);
    }
    return (
        <main className='container--register'>
            <div className='register'>
                <h1 className='register-title'>Hola! Registrate para acceder a distintos beneficios</h1>
                <Formik className="container--form-register" initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    repeatPassword: "",
                    image:"",
                }}
                    validate={(values) => {
                        let errors = {};
                        if (!values.name) {
                            errors.name = "Debe ingresar su nombre"
                        } else if (!VALIDATION.name.test(values.name)) {
                            errors.name = "Este campo debe contener solo letras, y un mínimo de 3 caracteres."
                        }
                        if (!values.email) {
                            errors.email = "Debe ingresar su email"
                        } else if (!VALIDATION.email.test(values.email)) {
                            errors.email = "Solo se acepta gmail. Ejemplo correo@gmail.com"
                        }
                        if (!values.password) {
                            errors.password = 'Ingrese una contraseña'
                        } else if (!VALIDATION.password.test(values.password)) {
                            errors.password = "Este campo debe contener 8 a 16 caracteres y una letra minuscula, una mayuscula, un numero y un caracter especial"
                        }
                        return errors;
                    }}
                    onSubmit={async (values) => {
                        try {
                            if (values.repeatPassword !== values.password) return setRepeatPassword("Contraseñas no coinciden");
                            const typeImage = values.image.type.split("/");
                            const format_image = typeImage[typeImage.length-1];
                            if (format_image === "jpeg" || format_image === "png" || format_image === "jpg") {
                                const formData = new FormData();
                                formData.append('name', values.name)
                                formData.append('email', values.email);
                                formData.append('password', values.password);
                                formData.append('image', values.image);
                                return await saveUser(formData);
                            }
                            return setFileImageMsj(true);   
                        } catch (error) {
                            SweetAlert("Error!", "Es obligatorio completar todos los campos", "error", "Ok")
                        }
                    }}
                >
                    {({ errors, setFieldValue }) => (
                        <Form className='container--inputs'>
                            <label htmlFor="file-input" className="container--img" onMouseEnter={() => setMouseInImage(true)} onMouseLeave={() => setMouseInImage(false)}>
                                <img className={mouseInImage ? "settings--form-img settings--img-hover" : "settings--form-img"} src={newImage} alt="foto-perfil"/>
                                {mouseInImage ? 
                                    <div className="container--change-image">
                                        <BiCamera />
                                        <p>Cambie foto de perfil</p>
                                    </div> : null
                                }
                            </label>
                            <input className="no--show" id='file-input' type="file" accept='.jpg,.png,.jpeg' name='image' onChange={(e) => (setFieldValue("image", e.target.files[0]), changeImage(e))} />
                            <p className='input--error-msj'>{fileImageMsj ? "El formato del archivo debe ser JPG, JPEG o PNG" : null}</p>
                            <div className='container-input'>
                                <Field name="name" className="input" type="Text" placeholder="Ingrese su nombre" />
                                <ErrorMessage name="name" component={() => <p className='input--error-msj'>{errors.name}</p>}/>
                            </div>
                            <div className='container-input'>
                                <Field id="labelemail" className="input" name="email" type="email" placeholder="Ingrese su email" />
                                <ErrorMessage name="email" component={() => <p className='input--error-msj'>{errors.email}</p>} />
                            </div>
                            <div className='container-input'>
                                <Field name="password" className="input" type="password" placeholder="Ingrese su contraseña" />
                                <ErrorMessage name="password" component={() => <p className='input--error-msj'>{errors.password}</p>} />
                            </div>
                            <div className='container-input'>
                                <Field name="repeatPassword" className="input" type="password" placeholder="Repita contraseña" />
                                <p className='input--error-msj'>{repeatPassword}</p>
                            </div>
                            <div className='container--button-submit'>
                                <button className='button-submit' type="submit">Enviar</button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </main>
    )
}

export default Register;