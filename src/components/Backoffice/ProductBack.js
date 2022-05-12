import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
const ProductBack = () => {
    const VALIDATION = {
        name: /^[0-9a-zA-Z\s]{3,}$/,
        description: /^[0-9a-zA-Z\s]{0, 120}$/,
        price: /^[0-9\.\,]{1,}$/,
        category:  /^[a-zA-Z]{1,10}$/,
        stock: /^[0-9]{1,}$/
    }
  return (
    <main>
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
                if (!VALIDATION.name.test(values.name)) {
                    errors.name = `El nombre del producto puede tener letras, numeros y debe ser minimo a 3 caracteres` 
                }
                if (!VALIDATION.description.test(values.description)) {
                    errors.description = `La descripcion del producto no puede ser mayor a 150 caracteres`
                }
                if (!VALIDATION.price.test(values.price)) {
                    errors.price = `El precio solo acepta numeros`;
                }
                if (!VALIDATION.category.test(values.category)) {
                    errors.category = `La categoria solo debe ser entre las opciones mostradas`
                }
                if (!VALIDATION.stock.test(values.stock)) errors.stock = `Solo se acepta numeros`
            }}
            
            
        >
            <Form>

            </Form>
        </Formik>
    </main>
  )
}

export default ProductBack