import { useSelector } from "react-redux";
import { useJwt } from "react-jwt";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from "react";
import SweetAlert from "../SweetAlert/SweetAlert";
import { BiEditAlt, BiCamera } from "react-icons/bi";
import { updateUser } from "../../services/usersService";
import { useDispatch } from "react-redux";
import { deleteTokenFromCookie } from "../../features/slices/token";
const Settings = () => {
    const [newImage, setNewImage] = useState("");
    const [mouseInImage, setMouseInImage] = useState(false);
    const token = useSelector(state => state.getToken);
    const {decodedToken} = useJwt(token);
    const dispatch = useDispatch();
    const VALIDATION = {
        name: /^[a-zA-Z\s]{3,}$/,
    }

    const changeImage = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);
        setNewImage(url);
    }
    return (
        <section className="container--settings">
            {decodedToken === null ? 
                <h1>No hay configuracion que mostrar</h1> 
                : 
                <div className="container--settings-form">
                    <h1 className="settings--title">Ajustes de perfil</h1>
                    <Formik initialValues={{
                        name: decodedToken.name.name,
                        image: ""
                    }}
                        validate={(values) => {
                            let errors = {};
                            if (!VALIDATION.name.test(values.name)) {
                                errors.name = "Este campo debe contener solo letras, y un mínimo de 3 caracteres."
                            }
                            return errors;
                        }}
                        onSubmit={async (values) => {
                            try {
                                if (values.name === decodedToken.name.name && values.image === "") return SweetAlert("Error!", "No hay cambios para hacer en su perfil", "error", "Ok")
                                if (values.image === "") {
                                    const formData = new FormData();
                                    formData.append('name', values.name);
                                    await updateUser(formData, token);
                                } else {
                                    const typeImage = values.image.type.split("/");
                                    const format_image = typeImage[typeImage.length-1];
                                    if (format_image === "jpeg" || format_image === "png" || format_image === "jpg") {
                                        const formData = new FormData();
                                        formData.append('name', values.name)
                                        formData.append('image', values.image);
                                        await updateUser(formData, token);
                                    }                             
                                }
                                return dispatch(deleteTokenFromCookie());   
                            } catch (error) {
                                SweetAlert("Error!", "No se pudo actualizar su perfil", "error", "Ok");
                            }
                        }}
                    >
                        {({errors, setFieldValue, values}) => (
                            <Form className="settings--container-form">
                                <label htmlFor="file-input" className="container--img" onMouseEnter={() => setMouseInImage(true)} onMouseLeave={() => setMouseInImage(false)}>
                                    <img className={mouseInImage ? "settings--form-img settings--img-hover" : "settings--form-img"} src={newImage ? newImage : decodedToken.name.image} alt="foto-perfil"/>
                                    {mouseInImage ? 
                                        <div className="container--change-image">
                                            <BiCamera />
                                            <p>Cambiar foto de perfil</p>
                                        </div> : null
                                    }
                                </label>
                                <input className="no--show" id="file-input" type="file"  name='image' accept=".jpg, .png, .jpeg" onChange={(e) => (setFieldValue("image", e.target.files[0]), changeImage(e))}/>
                                <label className="settings--input-label" htmlFor="name">Nombre: </label>
                                <div className="container--settings-input-edit">
                                    <Field className="settings--input-edit" id="name" name="name" type="text" value={values.name} />
                                    <BiEditAlt className="settings--icon-edit" />
                                </div>
                                <ErrorMessage name="name" component={() => <p className='input--error-msj'>{errors.name}</p>}/>
                                <label className="settings--input-label">Email:</label>
                                <Field className="settings--input" type="email" value={decodedToken.name.email} readOnly />
                                <button className="settings--button" type="submit">Enviar</button> 
                            </Form>
                        )}
                    </Formik>
                </div>
            }
        </section>
    )
}

export default Settings;