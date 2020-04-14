import React from "react";
import {
  TextField,
  Button,
  Typography,
  Link,
  ListItem,
  List,
} from "@material-ui/core";
import "./index.css";

import { Formik, useField, FieldAttributes, Form } from "formik";
import * as yup from "yup";
const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder, type = 'text',
  ...props
}) => {
  const [field, meta] = useField<{}>(props);
  const errorText = meta.error && meta.touched ? meta.error : "";
  return (
    <TextField
      type={type}
      fullWidth
      placeholder={placeholder}
      {...field}
      helperText={errorText}
      error={!!errorText}
    />
  );
};

const validationSchema = yup.object({
  email: yup.string().required(' ').email(),
  password: yup
    .string()
    .required(' ')
    .min(6, 'Password is at least 6 character').max(50,'Password must not exceed 50 character')
});
const signIn: React.FC = () => {
  return (
    <div className="container">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          console.log('submit',data);
        }}
      >
        {({errors }) => {  console.log(errors); return (
          
          <Form>
            <List>
              <ListItem>
                <div style={{ width: "100%" }}>
                  <Typography variant="h6" align="center">
                    Make your login
                  </Typography>
                </div>
              </ListItem>

              <ListItem>
                <MyTextField placeholder="E-mail" name="email" />
              </ListItem>

              <ListItem>
                <MyTextField  type="password" placeholder="Password" name="password" />
              </ListItem>

              <ListItem>
                <Button
                 disabled={Object.keys(errors).length !== 0}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  Login
                </Button>
              </ListItem>

              <ListItem>
                <div>
                  <Link
                    href="#"
                    color="primary"
                    underline="none"
                    component="button"
                  >
                    Sign Up
                  </Link>
                </div>
              </ListItem>
            </List>
          </Form>
        )}}
      </Formik>
    </div>
  );
};

export default signIn;
