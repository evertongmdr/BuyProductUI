import React,{useEffect} from "react";
import clsx from "clsx";
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import "./index.css";

import SearchProduct from "../ManageProduct/SearchProduct/index";
import SignIn from "../SignIn/index";
import SignUp from "../ManageUser/SignUp/index";
import RegisterProduct from '../ManageProduct/RegisterProduct/index';
import { Route, Switch } from "react-router-dom";

import {RouteComponentProps,withRouter} from 'react-router-dom';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: theme.transitions.create(["margin", "width"], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: "flex",
      alignItems: "center",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: "flex-end",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  })
);

interface StateProps {
  open: boolean;
  pageTitle: string;
  formType: string
}
const Layout:React.FC<RouteComponentProps> = (props) =>{

  const classes = useStyles();
  const theme = useTheme();

  const [info, setInfo] = React.useState<StateProps>({
    open: false,
    pageTitle: 'Sign In',
    formType: 'Register'
  });

  
  useEffect(()=>{
    switch(props.location.pathname){
      
      case '/signin':
        changePageTitle('Sign In');
      break;

      case '/signup':
        changePageTitle('Sign Up');
      break;

      case '/product':
        changePageTitle('Product');
      break;

      case '/register-product':
      changePageTitle('Register Product');
      break;

      case '/update-product':
        changePageTitle('Update Product');
        break;

    }

  },[props.location.pathname]);

  const changePageTitle = (title: string)=>{
    
    setInfo(oldInfos => ({...oldInfos, pageTitle: title}));
  };

  const handleDrawerOpen = () => {
    const newInfo = { ...info };
    newInfo.open = true;
    setInfo(newInfo);
  };


  const handleDrawerClose = () => {
    const newInfo = { ...info };
    newInfo.open = false;
    setInfo(newInfo);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: info.open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, info.open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {info.pageTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={info.open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <List>
          <ListItem button>
            <ListItemIcon>
              <AddShoppingCartIcon></AddShoppingCartIcon>
            </ListItemIcon>
            <ListItemText primary="Pedidos" />
          </ListItem>

          <ListItem button onClick={() => props.history.push('/product')}>
            <ListItemIcon>
              <AddCircleIcon></AddCircleIcon>
            </ListItemIcon>
            <ListItemText primary="Product" />
          </ListItem>

          <ListItem button onClick={() => props.history.push('/signin')}>
            <ListItemIcon>
              <ArrowBackIosIcon></ArrowBackIosIcon>
            </ListItemIcon>
            <ListItemText primary="Sair" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: info.open,
        })}
      >
        <Switch>
          <Route exact path="/" component={SignIn} />
          <Route path="/signin" component={SignIn}/>
          <Route path="/signup" component={SignUp} />
          <Route path="/product" component={SearchProduct} />
          <Route path="/register-product" component={RegisterProduct} />
          <Route path="/update-product" component={RegisterProduct} />
        </Switch>
      </main>
    </div>
  );
}

export default withRouter(Layout);