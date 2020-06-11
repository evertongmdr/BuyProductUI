import React, { Component, useRef } from "react";

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
  TextField,
} from "@material-ui/core";

import {
  makeStyles,
  Theme,
  createStyles,
  withStyles,
} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
import { connect } from "react-redux";
import { Dispatch } from "redux";

import * as ShoppCartActions from "../../../store/redux/ducks/shopp-cart/actions";

import { ApplicationState } from "../../../store/redux/index";
import { Formik, Form } from "formik";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as yup from "yup";

const StyledBadge = withStyles((theme: Theme) =>
  createStyles({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: "0 4px",
    },
  })
)(Badge);

interface State {
  productSelected: IProduct;
  openDialog: boolean;
  setedQuantity: string;
  products: JSX.Element[] | null;
}

interface Props {
  searchedProducts: IProduct[];
  addedProducts: IProduct[];
  loadingProduct: boolean;
  onSearchProducts: () => void; 
  onAddProduct: (product: IProduct) => void;
}

interface SimpleDialogProps extends Props {
  open: boolean;
  onClose: () => void;
  product: IProduct;
  quantity: string;
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

interface ProductProps {
  product: IProduct;
  addedQuantity: number;
  clickedView: () => void;
}
const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
  const { open } = props;
  const inputEl = useRef<HTMLInputElement>(null);

  const productAlreadyAdded = (product: IProduct): boolean =>{

     const pos = props.addedProducts.findIndex(p => p.id === product.id);

    return pos !== -1? true: false;
      
  }
  const addProductShoppcart = () => {

    const product = {...props.product, quantity: inputEl.current?.value };
    if(!productAlreadyAdded(product)) // se o produto não tiver adicionado
     props.onAddProduct(product);
    
    props.onClose();
  };

  const validationSchema = yup.object({
    quantity: yup.string().required("Quantity is Requerid"),
  });

  const initialValues = {
    quantity: props.quantity,
  };

  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle>{props.product.name}</DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={addProductShoppcart}
      >
        {(props) => (
          <Form>
            <List>
              <ListItem>
                <TextField
                  error={Object.keys(props.errors).length !== 0}
                  inputRef={inputEl}
                  type="number"
                  placeholder="Quantity"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.quantity}
                  name="quantity"
                ></TextField>
              </ListItem>

              <ListItem>
                <Button
                  disabled={Object.keys(props.errors).length !== 0}
                  fullWidth
                  variant="contained"
                  color="primary"
                  // onClick={addProductShoppcart}
                  type="submit"
                >
                  Ok
                </Button>
              </ListItem>
            </List>
          </Form>
        )}
      </Formik>
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
                Descrição:
              </Typography>
              {props.product.descrition}
            </React.Fragment>
          }
        />

        <div style={{ width: "100%" }}>
          <IconButton
            aria-label="cart"
            component="span"
            onClick={props.clickedView}
          >
            <StyledBadge badgeContent={props.addedQuantity} color="secondary">
              <AddShoppingCartIcon />
            </StyledBadge>
          </IconButton>

          {/* </Button> */}
        </div>
      </ListItem>

      <Divider style={{ backgroundColor: "black" }} />
    </React.Fragment>
  );
};

const Search: React.FC<Props> = (props) => {
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
  const classes = useStyles();
  return (
    <Paper component="form" className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search Products"
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            props.onSearchProducts();
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
  );
};

class ChooseProduct extends Component<Props, State> {
  state = {
    setedQuantity: "",
    productSelected: {} as IProduct,
    openDialog: false,
    products: null,
  };

  handlerOpen = (product: IProduct, quantity: string) => {
    this.setState({
      openDialog: true,
      productSelected: product,
      setedQuantity: quantity,
    });
  };

  addProduct = () =>{

  }
  render() {

    const { searchedProducts, addedProducts } = this.props;

    const products = searchedProducts.map((product) => {
      const pos = addedProducts.findIndex((p) => p.id === product.id);
      let quantity = 0;

      if (pos !== -1)
        quantity = parseInt(addedProducts[pos].quantity as string);

      return (
        <Product
          addedQuantity={quantity}
          key={product.id}
          product={product}
          clickedView={() => {
            this.handlerOpen(
              product,
              quantity === 0 ? "" : quantity.toString()
            );
          }}
        />
      );
    });

    return (
      <div>
        <List>
          <ListItem>
            <Search {...this.props} />
          </ListItem>

          {this.props.loadingProduct ? (
            <ListItem>
              <CircularProgress style={{ margin: "auto" }} />
            </ListItem>
          ) : (
            products
          )}
        </List>
        <SimpleDialog
          product={this.state.productSelected}
          quantity={this.state.setedQuantity}
          onClose={() => this.setState({ openDialog: false })}
          open={this.state.openDialog}
          {...this.props}

        />
      </div>
    );
  }
}

const mapStateToProps = ({ shoppCart }: ApplicationState) => {
  return {
    searchedProducts: shoppCart.searchedProducts,
    addedProducts: shoppCart.addedProducts,
    loadingProduct: shoppCart.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSearchProducts: () => {
      dispatch(ShoppCartActions.loadRequest());
    },
     onAddProduct: (product: IProduct) =>
     dispatch(ShoppCartActions.setProductSelected(product)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseProduct);

