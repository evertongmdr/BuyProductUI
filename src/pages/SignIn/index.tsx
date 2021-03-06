import React, { useEffect } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  TextField,
  Button,
  Typography,
  ListItem,
  List,
} from "@material-ui/core";
import "./index.css";

import { Formik, useField, FieldAttributes, Form } from "formik";
import * as yup from "yup";
import { NavLink } from "react-router-dom";

import { useTheme } from "@material-ui/core/styles";
import { useAuth } from "../../contexts/auth"; //import AuthContext from "../../contexts/auth";

const MyTextField: React.FC<FieldAttributes<{}>> = ({
  placeholder,
  type = "text",
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
  email: yup.string().required(" ").email(),
  password: yup
    .string()
    .required(" ")
    .min(6, "Password is at least 6 character")
    .max(50, "Password must not exceed 50 character"),
});

const SignIn: React.FC = (props: any) => {
  const theme = useTheme();

  const { user, loading, signIn, userNotFound } = useAuth(); //useContext(AuthContext); transformamos em hooks
  
  const handlerSignIn = (email: string, password: string) => {
    signIn(email, password); // método asincrono
  };

  return (
    <div className="container">
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validationSchema}
        onSubmit={(data) => {
          handlerSignIn(data.email, data.password);
        }}
      >
        {({ errors }) => {
          return (
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
                  <MyTextField
                    type="password"
                    placeholder="Password"
                    name="password"
                  />
                </ListItem>
                {loading ? (
                  <ListItem>
                    <CircularProgress style={{ margin: "auto" }} />
                  </ListItem>
                ) : userNotFound ? (
                  <ListItem>
                    {" "}
                    <div style={{ width: "100%" }}>
                      <Typography color="error" align="center">
                        Login ou senha errada
                      </Typography>
                    </div>
                  </ListItem>
                ) : null}

                <ListItem>
                  <Button
                    disabled={Object.keys(errors).length !== 0 && loading}
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                  >
                    Login
                  </Button>
                </ListItem>

                <ListItem>
                  <div style={{ width: "99%" }} className="align-right">
                    <NavLink
                      to="/signup"
                      style={{
                        textDecoration: "none",
                        color: `${theme.palette.primary.main}`,
                      }}
                      activeStyle={{
                        fontWeight: "bold",
                        color: `${theme.palette.primary.dark}`,
                      }}
                    >
                      SIGN UP
                    </NavLink>
                  </div>
                </ListItem>
              </List>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default SignIn;
