import React, { Component} from "react";

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
}

interface Props {
  searchedProducts: IProduct[];
  onSearchProducts: (name: string) => void;
  onAddProduct:(product:IProduct)=>void;
}

interface SimpleDialogProps  extends Props {
  open: boolean;
  onClose: () => void;
  product: IProduct;
}

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

interface ProductProps {
  product: IProduct;
  clickedView: () => void;
}
const SimpleDialog: React.FC<SimpleDialogProps> = (props) => {
  const { open } = props;

  const addProductShoppcart = (event:any) =>{
    console.log(event);
    props.onAddProduct(props.product);
    props.onClose();
    
  }
  return (
    <Dialog
      onClose={props.onClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogTitle>{props.product.name}</DialogTitle>
      <List>
        <ListItem>
          <TextField  type="number" placeholder="Quantity"></TextField>
        </ListItem>

        <ListItem>
          <Button
            variant="contained"
            color="primary"
            onClick={event =>addProductShoppcart(event)}
          >
            Ok
          </Button>
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
          primary={props.product.name!}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                Descrição:
              </Typography>
              {props.product.descrition!}
            </React.Fragment>
          }
        />

        <div style={{ width: "100%" }}>
          <IconButton
            aria-label="cart"
            component="span"
            onClick={props.clickedView}
          >
            <StyledBadge badgeContent={2} color="secondary">
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
            props.onSearchProducts((ev.target as HTMLInputElement).value);
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
    productSelected: {} as IProduct,
    openDialog: false,
  };

  handlerOpen = (product: IProduct) => {
    this.setState({
      openDialog: true,
      productSelected: product,
    });
  };

  render() {
    const { searchedProducts } = this.props;

    const products = searchedProducts.map((product) => {
      return (
        <Product
          product={product}
          clickedView={() => {
            this.handlerOpen(product);
          }}
        />
      );
    });

    return (
      <div>
        <Search {...this.props} />

        {products}
        <SimpleDialog
          product={this.state.productSelected}
          onClose={() => this.setState({ openDialog: false })}
          open={this.state.openDialog}
          {...this.props}
        />
      </div>
    );
  }
}

const getProductStorate = function (): Array<IProduct> {
  let products = [];

  if (localStorage.getItem("products")) {
    // ! garante que nunca vai retornar um valornulo
    products = JSON.parse(localStorage.getItem("products")!);
  }
  return products;
};

const searchProducts = (name: string) => {
  const result = getProductStorate().filter(
    (product) => product.name.toLocaleLowerCase().search(name) !== -1
  );
  return result;
};

const mapStateToProps = ({ shoppCart }: ApplicationState) => {
  return {
    searchedProducts: shoppCart.searchedProducts,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    onSearchProducts: (name: string) => {
      const products = searchProducts(name);
     dispatch(ShoppCartActions.setSearchProducts(products));
    },
    onAddProduct: (product: IProduct)=>dispatch(ShoppCartActions.setProductSelected(product)),

    
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChooseProduct);
