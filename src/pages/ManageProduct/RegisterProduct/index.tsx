import React, { useContext, useEffect } from "react";
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
import Draggable from "react-draggable";
import NumberFormat from "react-number-format";
import "./index.css";
import CircularProgress from "@material-ui/core/CircularProgress";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import api from "../../../services/api";
import FormContext from "../../../contexts/formType";

import { setTimeout } from "timers";

interface MyAttibutes {
  multiline?: boolean;
  rows?: number;
}

const validationSchema = yup.object({
  name: yup.string().required(" ").min(1, "Too short!").max(50, "Too long!"),
  descrition: yup.string().max(100, "Too long!"),
  quantity: yup
    .number()
    .required("Quantity is required")
    .positive("Quantity must have a postive number"),
  price: yup.string().required("Price is Required").max(12, "Price long!"),
});

const brFormatter = (value: string) => {
  const convertedValue = parseFloat(value);

  const amount = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
  }).format(convertedValue / 100);

  return amount;
};

const RegisterProduct: React.FC = (propsRegisterProduct: any) => {
  const form = useContext(FormContext);
  const [open, setOpen] = React.useState(false);
  const [isSubmiting, SetIsSubmiting] = React.useState(false);
  const { setInfoForm } = useContext(FormContext);

  let initialValues: IProduct = {
    name: "",
    descrition: "",
    quantity: "",
    price: "",
  };

  if (form.type === "Update") {
    initialValues = form.data as IProduct;

    /*  ------ATENÇÂO-------
    //console.log(typeof(initialValues.price));

    Quando o Asp.Net Core envia o produto, a propriedade price vem com a tipagem do tipo número, logo ela não
    é mais uma string igual declaramos no interface IProduct. JavaScript é uma linaguagem dinamica e sem tipação,
    mesmo usando o typescript para resolver isso a tipagem é fraca  e temos que tomar cuidado com isso. 
    */

    // precisamos fazer esse cáculo para trabalhar com modea brasileira.
    var transformedValue = parseFloat(initialValues.price!.toString()) * 10;
    initialValues.price = transformedValue.toString();
  }

  const saveProduct = (product: IProduct, resetForm: () => void) => {
    api
      .post("/products", product)
      .then((response) => {
        SetIsSubmiting(false);
        resetForm();
   
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateProduct = (product: IProduct, resetForm: () => void) => {
    
    var url = `/products/${product.id}`;
    api
      .put(url, product)
      .then((response) => {

        SetIsSubmiting(false);
        resetForm();
        
        propsRegisterProduct.history?.push("/product");
        setInfoForm({ type: "Register", data: product });

      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        disabled={isSubmiting}
      />
    );
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(product, actions) => {
          //Input 1.250,00
          product.price = product.price?.split(" ")[1];
          product.price = product.price?.replace(".", "");
          product.price = product.price?.replace(",", ".");

          // Out 1250.00, devido ao decimal do SQL Server.

          SetIsSubmiting(true);

          if (form.type === "Register") {
            saveProduct(product, () => actions.resetForm());
          } else {
            console.log('UPDATE');
            updateProduct(product, () => actions.resetForm());
          }
        }}
      >
        {(props) => {
          let errorPrice = false;

          if (props.errors["price"])
            errorPrice = props.touched["price"] as boolean;

          return (
            <Form>
              <List>
                <ListItem>
                  <IconButton
                    edge="end"
                    onClick={() =>
                      propsRegisterProduct.history?.push("/product")
                    }
                  >
                    <ArrowBackIosIcon />
                    Back
                  </IconButton>
                </ListItem>
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

                {/* <ListItem>
                  <NumberFormat
                    error={errorPrice}
                    helperText={
                      errorPrice
                        ? props.errors["price"]
                        : null
                    }
                 
                    name="price"
                    placeholder="Price"
                    customInput={TextField}
                    onChange={props.handleChange}
                     onBlur={props.handleBlur}
                    // renderText={()=>props.values.price}
                     value={props.values.price}
                    fullWidth
                    thousandSeparator={true}
                    isNumericString
                    prefix={'R$ '}
                  />
                </ListItem> */}

                <ListItem>
                  <NumberFormat
                    error={errorPrice}
                    helperText={errorPrice ? props.errors["price"] : null}
                    name="price"
                    placeholder="Price"
                    customInput={TextField}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    renderText={() => props.values.price}
                    value={props.values.price}
                    fullWidth
                    format={brFormatter}
                    disabled={isSubmiting}
                  />
                </ListItem>

                <ListItem>
                  <Button
                    disabled={
                      Object.keys(props.errors).length !== 0 || isSubmiting
                    }
                    type={form.type === "Register" ? "submit" : "button"}
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => {
                      if (form.type === "Update") handleClickOpen();
                    }}
                  >
                    {form.type === "Register" ? "SAVE" : "UPDATE"}
                  </Button>
                </ListItem>
                {isSubmiting ? (
                  <ListItem>
                    <div style={{ display: "flex", width: "99%" }}>
                      <CircularProgress style={{ margin: "auto" }} size={32} />
                    </div>
                  </ListItem>
                ) : null}
              </List>
              <SetSubmitForm />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterProduct;
