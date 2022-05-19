import { useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BiImageAdd } from "react-icons/bi"
const AddProductBackoffice = () => {
    const [firstNewImage, setFirstNewImage] = useState(false);
    const [secondNewImage, setSecondNewImage] = useState(false);
    const [thirdNewImage, setThirdNewImage] = useState(false);
    const VALIDATION = {
        name: /^[0-9a-zA-Z\s]{3,}$/,
        description: /^[0-9a-zA-Z\s]{1,120}$/,
        price: /^[0-9\.\,]{1,}$/,
        category:  /^(vinos|bebida blanca|aperitivos|cervezas)$/,
        stock: /^[0-9]{1,}$/
    };

    const changeImage = (e, numberImage) => {
        const url = URL.createObjectURL(e.target.files[0]);
        if (numberImage === 1) return setFirstNewImage(url);
        if (numberImage === 2) return setSecondNewImage(url);
        if (numberImage === 3) return setThirdNewImage(url);
    }
  return (
    <main className='container--add-product'>
        <section className='add-product'>
            <h1 className='add--product-title'>Agregar un producto</h1>
            <Formik 
                initialValues={{  
                    name: "",
                    description: "",
                    price: "",
                    image: [],
                    category: "",
                    stock: ""
                }}
                
                validate={(values) => {
                    let errors = {};
                    if (!VALIDATION.name.test(values.name)) errors.name = `El nombre del producto solo puede tener letras, numeros y debe ser minimo a 3 caracteres`;
                    if (!VALIDATION.description.test(values.description)) errors.description = `La descripcion del producto no debe contener caracteres especiales y ser mayor a 120 caracteres`;
                    if (!VALIDATION.price.test(values.price)) errors.price = `El precio solo acepta numeros`;
                    if (!VALIDATION.category.test(values.category)) errors.category = `La categoria solo debe ser entre las opciones mostradas`;
                    if (!VALIDATION.stock.test(values.stock)) errors.stock = `El stock solo acepta numeros`;
                    return errors;
                }}
                
                onSubmit = {async (values) => {
                    console.log(values)
                    console.log("LO MANDO")
                }}
            >
                {({ errors, values }) => (
                    <Form className='add--product-form'>
                        La imagen principal sera la primera que se suba
                        <div className='container--product-images'>
                            <label className='label--product-image' htmlFor='first-image'>
                                {firstNewImage ? 
                                    <img className='add--image-product' src={`${firstNewImage}`} alt="first-image" />
                                    :
                                    <BiImageAdd className='add--image-icon' />
                                }
                            </label>
                            <input className='no--show' type="file" name="image" id='first-image' onChange={(e) => (values.image.push(e.target.files[0]), changeImage(e, 1))}/>
                            <label className='label--product-image' htmlFor='second-image'>
                                {secondNewImage ? 
                                    <img className='add--image-product' src={`${secondNewImage}`} alt="second-image" />
                                    :
                                    <BiImageAdd className='add--image-icon' />
                                }
                            </label>
                            <input className='no--show' type="file" name="image" id='second-image' onChange={(e) => (values.image.push(e.target.files[0]), changeImage(e, 2))}/>
                            <label className='label--product-image' htmlFor='third-image'>
                                {thirdNewImage ? 
                                    <img className='add--image-product' src={`${thirdNewImage}`} alt="third-image" />
                                    :
                                    <BiImageAdd className='add--image-icon' />
                                }
                            </label>
                            <input className='no--show' type="file" name="image" id='third-image' onChange={(e) => (values.image.push(e.target.files[0]), changeImage(e, 3))}/>
                        </div>
                        <Field className="add--product-input" name="name" type="text" placeholder="Nombre del producto" />
                        <ErrorMessage name="name" component={() => <p className='input--error-msj'>{errors.name}</p>} />
                        <Field className="add--product-input input-textarea" name="description" as="textarea" placeholder="Descripcion del producto" />
                        <ErrorMessage name="description" component={() => <p className='input--error-msj'>{errors.description}</p>} />
                        <Field className="add--product-input" name="price" type="number" placeholder="Precio del producto" />
                        <ErrorMessage name="price" component={() => <p className='input--error-msj'>{errors.price}</p>} />
                        <Field className="add--product-input" name="category" as="select">
                            <option>Seleccione una opcion</option>
                            <option value="vinos">Vino</option>
                            <option value="bebida blanca">Bebida blanca</option>
                            <option value="aperitivos">Aperitivos</option>
                            <option value="cervezas">Cerveza</option>
                        </Field>
                        <Field className="add--product-input" name="stock" type="number" placeholder="Stock del producto" />
                        <ErrorMessage name="stock" component={() => <p className='input--error-msj'>{errors.stock}</p>} />
                        <button className='button-submit' type="submit">Enviar</button>
                    </Form>
                )}
            </Formik>
        </section>
    </main>
  )
}

export default AddProductBackoffice;