import React from "react";
import "./index.css";
import { ListItem, ListItemText, Typography, Button, Divider } from "@material-ui/core";

import {IUser} from '../../../models/Interfaces';

const User: React.FC<IUser> = (props) => {
  return (
    <React.Fragment>
      <ListItem className="item">
        <ListItemText
          primary={props.firstName + " " + props.lastName}
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                //   className={classes.inline}
                color="textPrimary"
              >
                E-mail:
              </Typography>
              {props.email}
            </React.Fragment>
          }
        />

        <div style={{width: '100%'}}>
          <Button
            color="primary"
            variant="outlined"
            style={{ margin: "0 5px 0 0" }}
            // onClick={props.clickedView}
          >
            Ver
          </Button>

          <Button
            // onClick={props.clickedEdit}
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

const SearchUser: React.FC = () => {
  const getUserStorate = function (): Array<IUser> {
    let users = Array<IUser>();

    if (localStorage.getItem("users")) {
      // ! garante que nunca vai retornar um valornulo
      users = JSON.parse(localStorage.getItem("users")!);
    }
    return users;
  };

  const users = getUserStorate().map(user => 
  <User 
    firstName={user.firstName} 
    lastName={user.lastName} 
    email={user.email} />
  );

  return <div className="container">{users}</div>;
};

export default SearchUser;
