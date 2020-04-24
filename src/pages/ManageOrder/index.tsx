import React, { useState, useEffect, useCallback, useContext } from "react";
import SwipeableViews from "react-swipeable-views";
import { makeStyles, Theme, useTheme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import ChooseProduct from "./ChooseProduct/index";
import SearchIcon from "@material-ui/icons/Search";
import "./index.css";
import {
  ListItem,
  List,
  ListItemText,
  InputBase,
  Paper,
  IconButton,
  Divider,
} from "@material-ui/core";
import { IProduct } from "../../models/Interfaces";

import { connect } from "react-redux";
import { ApplicationState } from "../../store/redux";

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
}
const ManageOrder: React.FC<Props> = (props) => {
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
    <>
    <ListItem>
      <ListItemText
        primary={product.name}
        secondary={
          <React.Fragment>
            <Typography component="span" variant="body2" color="textPrimary">
              Quantity: 
            </Typography>
            {product.quantity}
          </React.Fragment>
        }
      />
    </ListItem>
    
    <Divider style={{ backgroundColor: "black" }} />
    </>
  ));

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
            <List>
              {listProducts}
            </List>
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

const mapDispatchToProps = () => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);
