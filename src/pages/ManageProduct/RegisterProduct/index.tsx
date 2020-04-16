import React, { useContext } from "react";
import {
  TextField,
  List,
  ListItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  PaperProps,
  Paper,
} from "@material-ui/core";

import {
  Formik,
  useField,
  FieldAttributes,
  Form,
  useFormikContext,
} from "formik";
import * as yup from "yup";
import { IProduct } from "../../../models/Interfaces";
import FormContext from "../../../store//FormContext";
import Draggable from "react-draggable";
import "./index.css";

interface MyAttibutes {
  multiline?: boolean;
  rows?: number;
}

const MyTextField: React.FC<FieldAttributes<MyAttibutes>> = ({
  placeholder,
  type = "text",
  multiline,
  rows,
  ...props
}) => {
  const [field, meta] = useField<MyAttibutes>(props);
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

const RegisterProduct: React.FC = (props: any) => {
  const formType = useContext(FormContext);
  const [open, setOpen] = React.useState(false);

  let initialValues: IProduct = {
    name: "",
    descrition: "",
    quantity: "",
    price: "",
  };

  if (formType.type === "Update") {
    initialValues = formType.content as IProduct;
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function PaperComponent(props: PaperProps) {
    return (
      <Draggable
        handle="#draggable-dialog-title"
        cancel={'[class*="MuiDialogContent-root"]'}
      >
        <Paper {...props} />
      </Draggable>
    );
  }

  const SetSubmitForm: React.FC = () => {
    const { submitForm } = useFormikContext();
    return (
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Product Update
        </DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want Product Update ?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleClose();

              submitForm();
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const getProductStorate = () => {
    let products = [];

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
          console.log("saving");
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
                  type={formType.type === "Register" ? "submit" : "button"}
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    if (formType.type === "Update") handleClickOpen();
                  }}
                >
                  {formType.type === "Register" ? "SAVE" : "UPDATE"}
                </Button>
              </ListItem>
            </List>
            <SetSubmitForm />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default RegisterProduct;
/*
const currencyFormatter = function (value: string) {
    
  const val = parseFloat(value);
  
  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2
  }).format(val / 100);
  
  return amount
}
*/
