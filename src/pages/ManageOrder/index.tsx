import React, { useState } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ChooseProduct from "./ChooseProduct/index";
import "./index.css";
import {
  ListItem,
  List,
  ListItemText,
  Divider,
  Button,
} from "@material-ui/core";
import { IProduct } from "../../models/Interfaces";

import { connect } from "react-redux";
import { ApplicationState } from "../../store/redux";

import * as ShoppCartActions from "../../store/redux/ducks/shopp-cart/actions";
import { Dispatch } from "redux";
import { useAuth } from "../../contexts/auth";
import api from "../../services/api";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: "white",
    borderRadius: "7px",
    boxShadow: "0 0 1.8rem rgb(0,0,0,.15)",
    width: "99%",
  },

  container: {
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
}));

interface Props {
  addedProducts: IProduct[];
  onRemoverProduct: (id: string) => void;
  onSearchProducts: (name: string) => void;
}
const ManageOrder: React.FC<Props> = (props) => {
  const { user } = useAuth();
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const listProducts = props.addedProducts.map((product) => (
    <div key={product.id}>
      <ListItem>
        <ListItemText
          primary={product.name}
          secondary={
            <React.Fragment>
              <Typography component="span" variant="body2" color="textPrimary">
                Quantity: {product.quantity}
              </Typography>

              <br />
              <Typography component="span" variant="body2" color="textPrimary">
                Price:{product.price}
              </Typography>
            </React.Fragment>
          }
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => props.onRemoverProduct(product.id as string)}
        >
          remove
        </Button>
      </ListItem>

      <Divider style={{ backgroundColor: "black" }} />
    </div>
  ));

  const total = props.addedProducts.reduce((sum, product) => {
    return (sum +=
      parseInt(product.quantity as string) *
      parseFloat(product.price as string));
  }, 0);

  const saveOrder = () => {
    const itens = props.addedProducts.map((product) => {
      return {
        id: product.id,
        quantity: product.quantity,
      };
    });

    const order = {
      userId: user?.id,
      productsAddedOrder: itens,
    };

    console.log(order);
    api
      .post("/orders", order)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="contain">
      <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Products" {...a11yProps(0)} />
            <Tab label="Order" {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <ChooseProduct />
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <List>{listProducts}</List>

            <Typography
              component="span"
              variant="subtitle1"
              color="textPrimary"
            >
              Total:{total}
            </Typography>
            <Button
              style={{ float: "right", marginRight: "16px" }}
              color="secondary"
              variant="contained"
              onClick={saveOrder}
            >
              Finalize
            </Button>
          </TabPanel>
        </SwipeableViews>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ApplicationState) => {
  return {
    addedProducts: state.shoppCart.addedProducts,
  };
};

const mapDispatchToProps = (disptach: Dispatch) => {
  return {
    onSearchProducts: (name: string) => {
      console.log(name);
      disptach(ShoppCartActions.loadRequest());
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);
