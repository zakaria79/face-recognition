import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import VideocamIcon from '@material-ui/icons/Videocam';
import HomeIcon from '@material-ui/icons/Home';
import { Link } from 'react-router-dom';
import './DrawerListLeft.css';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
});

const DrawerListLeft = props => {
  const classes = useStyles();
  const { side, toggleDrawer } = props;
  return (
    <div
      id="DrawerListLeft"
      className={classes.list}
      role="presentation"
      onClick={toggleDrawer(side, false)}
      onKeyDown={toggleDrawer(side, false)}>
      <List>
        <Link to="/">
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Accueil" />
          </ListItem>
        </Link>
        <Divider />
        <Link to="/camera">
          <ListItem button>
            <ListItemIcon>
              <VideocamIcon />
            </ListItemIcon>
            <ListItemText primary="Caméra" />
          </ListItem>
        </Link>
        <Link to="/expressions-recognition">
          <ListItem button>
            <ListItemIcon>
              <VideocamIcon />
            </ListItemIcon>
            <ListItemText primary="Reconnaissance des émotions" />
          </ListItem>
        </Link>
      </List>
    </div>
  );
};

export default DrawerListLeft;
