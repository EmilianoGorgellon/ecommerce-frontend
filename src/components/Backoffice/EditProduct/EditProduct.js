import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllProducts } from "../../../services/product_services";
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { BiImageAdd } from "react-icons/bi";
import SweetAlert from '../../SweetAlert/SweetAlert';
const EditProduct = () => {
    const [product, setProduct] = useState([]);
    const [firstNewImage, setFirstNewImage] = useState(false);
    const [secondNewImage, setSecondNewImage] = useState(false);
    const [thirdNewImage, setThirdNewImage] = useState(false);
    const token = useSelector(state => state.getToken);
    
    let get_url = window.location.href;
    get_url = get_url.split("/");
    const product_id = get_url[get_url.length - 1].replace(/%20/g," ");
    useEffect(async () => {
        const data = await getAllProducts();
        const filterData = data.filter(dato => dato._id === product_id);
        setProduct(filterData);
    }, [product_id])
    console.log(product);
    const VALIDATION = {
        name: /^[0-9a-zA-Z\s]{3,}$/,
        description: /^[0-9a-zA-ZÀ-ÿ\u00f1\u00d1\s\.\,]{1,250}$/,
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

    const filterImageByType = (data) => {
        return data.map(dato => {
            const typeImage = dato.type.split("/");
            const format_image = typeImage[typeImage.length-1];
            if (!(format_image === "png" || format_image === "jpg" || format_image === "jpeg")) throw new Error("Error en formato de imagen");
        })
    }
    return (
        <main className='container--add-product'>
            <section className='add-product'>
                <h1 className='add--product-title'>Editar producto</h1>
                <Formik 
                    initialValues={{  
                        name: "",
                        description: "",
                        price: "",
                        images: [],
                        category: "",
                        stock: ""
                    }}
                    
                    validate={(values) => {
                        let errors = {};
                        console.log(values.description.length);
                        if (!VALIDATION.name.test(values.name)) errors.name = `El nombre del producto solo puede tener letras, numeros y debe ser minimo a 3 caracteres`;
                        if (!VALIDATION.description.test(values.description)) errors.description = `La descripcion del producto no debe contener caracteres especiales y ser mayor a 120 caracteres`;
                        if (!VALIDATION.price.test(values.price)) errors.price = `El precio solo acepta numeros`;
                        if (!VALIDATION.category.test(values.category)) errors.category = `La categoria solo debe ser entre las opciones mostradas`;
                        if (!VALIDATION.stock.test(values.stock)) errors.stock = `El stock solo acepta numeros`;
                        return errors;
                    }}
                    
                    onSubmit = {async (values) => {
                        try {
                            filterImageByType(values.images);
                            const form_data = new FormData();

                            values.images.map(data => form_data.append('images', data))
                            form_data.append('name', values.name);
                            form_data.append('description', values.description);
                            form_data.append('price', values.price);
                            form_data.append('category', values.category);
                            form_data.append('stock', values.stock);
                        } catch (error) {
                            SweetAlert("Error!", "El formato de la imagen debe ser png, jpg o jpeg", "error", "Ok!");
                            return window.location.reload()
                        }
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
                                <input accept='.jpg,.png,.jpeg' className='no--show' type="file" name="images" id='first-image' onChange={(e) => (e.target.files[0] ? values.images.push(e.target.files[0]) : null , changeImage(e, 1))}/>
                                <label className='label--product-image' htmlFor='second-image'>
                                    {secondNewImage ? 
                                        <img className='add--image-product' src={`${secondNewImage}`} alt="second-image" />
                                        :
                                        <BiImageAdd className='add--image-icon' />
                                    }
                                </label>
                                <input accept='.jpg,.png,.jpeg' className='no--show' type="file" name="images" id='second-image' onChange={(e) => (e.target.files[0] ? values.images.push(e.target.files[0]) : null , changeImage(e, 2))}/>
                                <label className='label--product-image' htmlFor='third-image'>
                                    {thirdNewImage ? 
                                        <img className='add--image-product' src={`${thirdNewImage}`} alt="third-image" />
                                        :
                                        <BiImageAdd className='add--image-icon' />
                                    }
                                </label>
                                <input accept='.jpg,.png,.jpeg' className='no--show' type="file" name="images" id='third-image' onChange={(e) => (e.target.files[0] ? values.images.push(e.target.files[0]) : null , changeImage(e, 3))}/>
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

export default EditProduct;