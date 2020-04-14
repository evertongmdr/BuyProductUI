import React, { useState } from "react";
import "./index.css";
import { Button, ListItem, List, TextField } from "@material-ui/core";

import { Formik, useField, FieldAttributes, Form } from "formik";

import * as yup from "yup";

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  type = "text",
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      autoComplete="off"
      type={type}
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
      fullWidth
    />
  );
};

const validationSchema = yup.object({
  firstName: yup
    .string()
    .required("Fist Name is Required")
    .min(1, "Too short!")
    .max(50, "Too long!"),
  lastName: yup
    .string()
    .required("Last name is Required")
    .min(1, "Too short!")
    .max(50, "Too long!"),
  email: yup.string().required(" ").email("Set a email valid please!"),
  password: yup
    .string()
    .required(" ")
    .min(6, "Password must have at least 6 character")
    .max(50, "Password must not exceed 50 character"),
  confirmPassword: yup
    .string()
    .required(" ")
    .oneOf([yup.ref("password"), null], "A senha devem ser iguais"),
});

interface User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const SignUp: React.FC = () => {
  const initialValues: User = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const getUserStorate = ()=> {
    let users = Array();

    if (localStorage.getItem("users")) {
      // ! garante que nunca vai retornar um valornulo
      users = JSON.parse(localStorage.getItem("users")!);
    }
    return users;
  }
  

  const onSave = (user: User) => {
    const users = getUserStorate();

    users.push(user);

    localStorage.setItem("users",JSON.stringify(users));
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={user => {
          onSave(user);
        }}
      >
        {({ errors }) => (
          <Form>
            <List>
              <ListItem>
                <MyTextField placeholder="Fist Name" name="firstName" />
              </ListItem>

              <ListItem>
                <MyTextField placeholder="Last Name" name="lastName" />
              </ListItem>

              <ListItem>
                <MyTextField placeholder="E-mail" name="email" />
              </ListItem>

              <ListItem>
                <MyTextField
                  type="password"
                  placeholder="Password"
                  name="password"
                />
              </ListItem>

              <ListItem>
                <MyTextField
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                />
              </ListItem>
              <ListItem>
                <Button
                  disabled={Object.keys(errors).length!=0}
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
