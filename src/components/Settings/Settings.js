import { useSelector } from "react-redux";
import { useJwt } from "react-jwt";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState } from "react";
import SweetAlert from "../SweetAlert/SweetAlert";
const Settings = () => {
    const token = useSelector(state => state.getToken);
    const {decodedToken} = useJwt(token);
    const VALIDATION = {
        name: /^[a-zA-Z\s]{3,}$/,
    }
    
    return (
        <section className="container--settings-data">
            {decodedToken === null ? 
                <h1>No hay configuracion que mostrar</h1> 
                : 
                <>
                    <h1>Muestro formulario bro</h1>
                    <Formik initialValues={{
                        name: decodedToken.name.name,
                        image: "",
                        // "public_id": decodedToken.name.public_id
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
                                console.log(values)
                                const typeImage = values.image.type.split("/");
                                const format_image = typeImage[typeImage.length-1];
                                console.log(format_image)
                                if (format_image === "jpeg" || format_image === "png" || format_image === "jpg") {
                                    const formData = new FormData();
                                    formData.append('name', values.name)
                                    formData.append('image', values.image);
                                    return "devuelvo algo";
                                    // return await updateUser(formData);
                                }
                                // return setFileImageMsj(true);   
                                return "xd";
                            } catch (error) {
                                SweetAlert("Error!", "No se pudo actualizar su perfil", "error", "Ok")
                            }
                        }}
                    >
                        {({errors, setFieldValue, values}) => (
                            <Form className="settings--container-form">
                         
                                <label htmlFor="file-input">
                                    <img src={decodedToken.name.image} alt="foto-perfil"/>
                                </label>
                                <input id="file-input" type="file"  name='image' accept=".jpg, .png, .jpeg" onChange={(e) => setFieldValue("image", e.target.files[0])}/>
                            
                                <Field name="name" type="text" value={values.name} />
                                <ErrorMessage name="name" component={() => <p className='input--error-msj'>{errors.name}</p>}/>

                                <Field type="email" value={decodedToken.name.email} />
                            
                                <button type="submit">Enviar</button>
                             
                            </Form>
                        )}
                    </Formik>
                </>
            }
        </section>
    )
}

export default Settings;