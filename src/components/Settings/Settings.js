import { useSelector } from "react-redux";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useEffect, useState } from "react";
import SweetAlert from "../SweetAlert/SweetAlert";
import { BiEditAlt, BiCamera } from "react-icons/bi";
import { getDataUser, updateUser } from "../../services/user_services";
import Cookies from "universal-cookie";
const Settings = () => {
    const [dataUser, setDataUser] = useState([]);
    const [newImage, setNewImage] = useState("");
    const [mouseInImage, setMouseInImage] = useState(false);
    const token = useSelector(state => state.getToken);
    const VALIDATION = {
        name: /^[a-zA-Z\s]{3,}$/,
    }
    const cookie = new Cookies();
    useEffect(async () => {
        const token = cookie.get("token");
        if (token !== undefined) {
            setDataUser(await getDataUser(token));
        }    
    }, [])

    const changeImage = (e) => {
        const url = URL.createObjectURL(e.target.files[0]);
        setNewImage(url);
    }
    return (
        <section className="container--settings">
            {dataUser.length === 0 ? 
                <h1>No hay configuracion que mostrar</h1> 
                : 
                <div className="container--settings-form">
                    <h1 className="settings--title">Ajustes de perfil</h1>
                    <Formik initialValues={{
                        name: dataUser.name,
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
                                if (values.name === dataUser.name && values.image === "") return SweetAlert("Error!", "No hay cambios para hacer en su perfil", "error", "Ok")
                                if (values.image === "") {
                                    const response = await updateUser({name: values.name}, token);
                                    console.log(response)
                                } else {
                                    const formData = new FormData();
                                    const typeImage = values.image.type.split("/");
                                    const format_image = typeImage[typeImage.length-1];
                                    if (format_image === "jpeg" || format_image === "png" || format_image === "jpg") {
                                        formData.append('name', values.name);
                                        formData.append('image', values.image);
                                        const response = await updateUser(formData, token);
                                        console.log(response)
                                    }                             
                                }
                            } catch (error) {
                                SweetAlert("Error!", "No se pudo actualizar su perfil", "error", "Ok");
                            }
                        }}
                    >
                        {({errors, setFieldValue, values}) => (
                            <Form className="settings--container-form">
                                <label htmlFor="file-input" className="container--img" onMouseEnter={() => setMouseInImage(true)} onMouseLeave={() => setMouseInImage(false)}>
                                    <img className={mouseInImage ? "settings--form-img settings--img-hover" : "settings--form-img"} src={newImage ? newImage : dataUser.imageUrl} alt="foto-perfil"/>
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
                                    <Field className="settings--input-edit" id='name' name='name' type="text" value={values.name} />
                                    <BiEditAlt className="settings--icon-edit" />
                                </div>
                                <ErrorMessage name="name" component={() => <p className='input--error-msj'>{errors.name}</p>}/>
                                <label className="settings--input-label">Email:</label>
                                <Field className="settings--input" type="email" value={dataUser.email} readOnly />
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