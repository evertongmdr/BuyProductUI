import React from "react";
import "./index.css";
import { Button, ListItem, List, TextField } from "@material-ui/core"
import { Formik, useField, FieldAttributes, Form } from "formik";

import {IProduct} from '../../../models/Interfaces';

import * as yup from "yup";


interface MyAttibutes {
  multiline?: boolean;
  rows?: number;
}

// const currencyFormatter = function (value: string) {
    
//   const val = parseFloat(value);
  
//   const amount = new Intl.NumberFormat("pt-BR", {
//     style: "currency",
//     currency: "BRL",
//     minimumFractionDigits: 2
//   }).format(val / 100);
  
//   return amount
// }

const MyTextField: React.FC<FieldAttributes<MyAttibutes>> = ({
  placeholder,
  type = "text",
  multiline,
  rows,
  ...props
}) => {
  const [field, meta] = useField<MyAttibutes>(props);
  const errorText = meta.error && meta.touched ? meta.error : '';
  return (
    <TextField
      autoComplete="off"
      type={type}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      fullWidth
      multiline={multiline}
      rows={rows}
    />
  );
};


const validationSchema = yup.object({
  name: yup.string().required(" ").min(1, "Too short!").max(50, "Too long!"),
  descrition: yup.string().max(100, "Too long!"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must have a postive number"),
  price: yup
    .number()
    .required("Price is Required")
    .positive("Price must have a postive number"),
});

const SignUp: React.FC = () => {
  const initialValues: IProduct = {
    name: "",
    descrition: "",
    quantity: "",
    price: "",
  };

  const getProductStorate = () => {
    let products =  [];

    if (localStorage.getItem("products")) {
      // ! garante que nunca vai retornar um valornulo
      products = JSON.parse(localStorage.getItem("products")!);
    }
    return products;
  };

  const onSave = (product: IProduct) => {
    const products = getProductStorate();

    products.push(product);

    localStorage.setItem("products", JSON.stringify(products)!);
  };
  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(produtc) => {
          onSave(produtc);

          console.log(produtc);
        }}
      >
        {({ errors }) => (
          <Form>
            <List>
              <ListItem>
                <MyTextField placeholder="Name" name="name" />
              </ListItem>

              <ListItem>
                <MyTextField
                  multiline={true}
                  rows={4}
                  placeholder="Descrition"
                  name="descrition"
                />
              </ListItem>

              <ListItem>
                <MyTextField
                  type="number"
                  placeholder="Quantity"
                  name="quantity"
                />
              </ListItem>

              <ListItem>
                <MyTextField type="number" placeholder="Price" name="price" />
              </ListItem>

              <ListItem>
                <Button
                  disabled={Object.keys(errors).length !== 0}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  SIGN UP
                </Button>
              </ListItem>
            </List>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SignUp;