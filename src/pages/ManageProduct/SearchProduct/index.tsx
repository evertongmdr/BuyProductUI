import React, { useState } from "react";
import "./index.css";
import { IProduct } from "../../../models/Interfaces";
import {
  ListItem,
  ListItemText,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  List,
} from "@material-ui/core";


import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

interface IEventsProducts extends IProduct {
  clickedView: () => void;
  clickedEdit: () => void;
}

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  product: IProduct;
}
const Product: React.FC<any> = (props) => {
  return (
    <React.Fragment>
      <ListItem className="item">
        <ListItemText
          primary={props.name}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                //   className={classes.inline}
                color="textPrimary"
              >
                Quantity:
              </Typography>
              {props.quantity}
            </React.Fragment>
          }
        />

        <div style={{ width: "100%" }}>
          <Button
            color="primary"
            variant="outlined"
            style={{ margin: "0 5px 0 0" }}
            onClick={props.clickedView}
            // onClick={() => console.log(props.product)}
          >
            Ver
          </Button>

          <Button
            onClick={props.clickedEdit}
            color="primary"
            variant="outlined"
          >
            Editar
          </Button>
        </div>
      </ListItem>

      <Divider style={{ backgroundColor: "black" }} />
    </React.Fragment>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: '2px 4px',
      display: 'flex',
      alignItems: 'center',
      width: '99%',
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    }
  }),
);

const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
  const { open } = props;

  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle>{props.product.name}</DialogTitle>
      <List>
        <ListItem>
          <Typography>Descrição: {props.product.descrition}</Typography>
        </ListItem>

        <ListItem>
          <Typography>Quantity: {props.product.quantity}</Typography>
        </ListItem>
        <ListItem>
          <Typography>Price: {props.product.price}</Typography>
        </ListItem>
      </List>
    </Dialog>
  );
};
const SearchUser: React.FC = () => {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [product, setProduct] = useState<IProduct>({ name: "" });

  const getProductStorate = function (): Array<IProduct> {
    let products = [];

    if (localStorage.getItem("products")) {
      // ! garante que nunca vai retornar um valornulo
      products = JSON.parse(localStorage.getItem("products")!);
    }
    return products;
  };

  const handlerOpen = (product: IProduct) => {
    setOpen(true);
    setProduct(product);
    console.log("salve");
  };

  const products = getProductStorate().map((product) => (
    <Product
      product={product}
      name={product.name}
      quantity={product.quantity}
      clickedView={() => handlerOpen(product)}
      clickedEdit={() => setOpen(false)}
    />
  ));

  return (
    <div className="container">
      <div className="align-right">
        <Button variant="contained" color="primary">
          New Product
        </Button>
      </div>
      <Paper component="form" className={classes.root}>
    
      <InputBase
        className={classes.input}
        placeholder="Search Products"
      />
      <IconButton type="submit" className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
      {products}
      <SimpleDialog
        product={product}
        onClose={() => setOpen(false)}
        open={open}
      />
    </div>
  );
};

export default SearchUser;
