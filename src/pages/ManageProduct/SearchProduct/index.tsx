import React, { useState, useContext, useEffect } from "react";
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
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@material-ui/core";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper, { PaperProps } from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CircularProgress from "@material-ui/core/CircularProgress";

import FormContext from "../../../contexts/formType";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import PageviewIcon from "@material-ui/icons/Pageview";
import api from "../../../services/api";
import Draggable from "react-draggable";

interface ProductProps {
  product: IProduct;
  clickedView: () => void;
  clickedEdit: () => void;
  clickedDelete: () => void;
}

interface DilogProps {
  viewProduct: boolean,
  dialogDelete: boolean,
  product: IProduct | null
}

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
  product: IProduct;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "2px 4px",
      display: "flex",
      alignItems: "center",
      width: "99%",
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    iconButton: {
      padding: 10,
    },
  })
);

const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
  const { open } = props;

  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle>{props.product?.name}</DialogTitle>
      <List>
        <ListItem>
          <Typography>Descrição: {props.product?.descrition}</Typography>
        </ListItem>

        <ListItem>
          <Typography>Quantity: {props.product?.quantity}</Typography>
        </ListItem>
        <ListItem>
          <Typography>Price: {props.product?.price}</Typography>
        </ListItem>
      </List>
    </Dialog>
  );
};

const Product: React.FC<ProductProps> = (props) => {
  return (
    <React.Fragment>
      <ListItem className="item">
        <ListItemText
          primary={props.product.name}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                Quantity:
              </Typography>
              {props.product.quantity}
            </React.Fragment>
          }
        />

        <div style={{ width: "100%" }}>
          <IconButton color="primary" onClick={props.clickedView}>
            <PageviewIcon />
          </IconButton>
          <IconButton color="primary" onClick={props.clickedEdit}>
            <EditIcon />
          </IconButton>
          <IconButton color="secondary" onClick={props.clickedDelete}>
            <DeleteIcon />
          </IconButton>
        </div>
      </ListItem>

      <Divider style={{ backgroundColor: "black" }} />
    </React.Fragment>
  );
};

const SearchProduct: React.FC = (props: any) => {
  const classes = useStyles();
  const [infoView, setInfoView] = useState<DilogProps>({
    viewProduct: false,
    dialogDelete: false,
    product: null
  });

  const [products, setProducts] = useState<JSX.Element[] | null>(null);
  const [loading, setLoading] = useState(false);

  const { setInfoForm } = useContext(FormContext);

  const mapProduct = (products: Array<IProduct>) => {
    const productMapped = products.map((product: IProduct) => (
      <Product
        key={product.id}
        product={product}
        clickedView={() => {
          setInfoView({
            ...infoView,
            viewProduct: true, 
            product: product
          });
        }}
        clickedEdit={() => {
          setInfoForm({ type: "Update", data: product });
          props.history.push("/update-product");
        }}
        clickedDelete={() => {
  
          setInfoView({
            ...infoView,
             dialogDelete: true, 
            product: product
          });
        }}
      />
    ));
    return productMapped;
  };
  const getProducts = (nameProduct: string) => {
    var url = `/products?searchQuery=${nameProduct}`;
    api
      .get(url)
      .then((response) => {
        const productMapped = mapProduct(response.data);
        setProducts(productMapped);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteProduct = (productId: string) => {
    var url = `/products/${productId}`;
    api
      .delete(url)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
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

  const DialogDelete: React.FC = () => {
    return (
      <Dialog
        open={infoView.dialogDelete}
        onClose={()=>setInfoView({...infoView, dialogDelete: false})}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Product Update
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you want to delete this product ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={()=>{

            setInfoView({...infoView, dialogDelete: false});
            
          }} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {

              deleteProduct(infoView.product?.id as string);
              setInfoView({...infoView, dialogDelete: false});
            }}
            color="primary"
          >
            OK
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className="container">
      <List>
        <ListItem>
          <div className="align-right">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setInfoForm({ type: "Register", data: {} });
                props.history.push("/register-product");
              }}
            >
              New Product
            </Button>
          </div>
        </ListItem>
        <ListItem>
          <Paper component="form" className={classes.root}>
            <InputBase
              className={classes.input}
              placeholder="Search Products"
              onKeyPress={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();

                  setLoading(true);
                  var nameProduct = (ev.target as HTMLInputElement).value;
                  getProducts(nameProduct);
                }
              }}
            />
            <IconButton
              type="submit"
              className={classes.iconButton}
              aria-label="search"
            >
              <SearchIcon />
            </IconButton>
          </Paper>
        </ListItem>

        {loading ? (
          <ListItem>
            <div style={{ display: "flex", width: "99%" }}>
              <CircularProgress style={{ margin: "auto" }} size={32} />
            </div>
          </ListItem>
        ) : (
          products
        )}
      </List>
      <DialogDelete />

      <SimpleDialog
        product={infoView.product as IProduct}
        onClose={() => setInfoView({...infoView, viewProduct: false})}
        open={infoView.viewProduct}
      />
    </div>
  );
};

export default SearchProduct;
