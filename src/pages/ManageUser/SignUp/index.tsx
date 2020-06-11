import React, { useContext, useState } from "react";
import "./index.css";
import {
  Button,
  ListItem,
  List,
  TextField,
  CircularProgress,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";
import { Formik, useField, FieldAttributes, Form } from "formik";

import * as yup from "yup";
import { IUser } from "../../../models/Interfaces";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import api from "../../../services/api";

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
  const history = useHistory();
  const [isSubmiting, SetIsSubmiting] = useState(false);
  const [alertMessage, setAlertMessage] = useState<{
    show: boolean;
    submited: boolean;
  }>({
    show: false,
    submited: false,
  });

  const initialValues: User = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const onSave = (user: User) => {
    api
      .post("/users", user)
      .then((response) => {
        SetIsSubmiting(false);
        setAlertMessage({ show: true, submited: true });
      })
      .catch((err) => {
        SetIsSubmiting(false);

        setAlertMessage({ show: true, submited: false });
        console.log(err);
      });
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(user) => {
          SetIsSubmiting(true);
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
                  disabled={Object.keys(errors).length !== 0}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                >
                  SIGN UP
                </Button>
              </ListItem>
              {isSubmiting ? (
                <ListItem>
                  <CircularProgress style={{ margin: "auto" }} />
                </ListItem>
              ) : null}
            </List>
          </Form>
        )}
      </Formik>

      <Snackbar
        open={alertMessage.show}
        autoHideDuration={alertMessage.submited ? 2000 : 4000}
        onClose={() => {
          if (alertMessage.submited) {
            history.push("/signin");
          } else {
            setAlertMessage({ ...alertMessage, show: false });
          }
        }}
      >
        {alertMessage.submited ? (
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="success"
            onClose={() => {
              // essa função é chamada caso o usuário click ne mensagem apresentada
              setAlertMessage({ ...alertMessage, show: false });

              history.push("/signin");
            }}
          >
            Registered User
          </MuiAlert>
        ) : (
          <MuiAlert
            elevation={6}
            variant="filled"
            severity="error"
            onClose={() => setAlertMessage({ ...alertMessage, show: false })}
          >
            Server Error
          </MuiAlert>
        )}
      </Snackbar>
    </div>
  );
};

export default SignUp;
