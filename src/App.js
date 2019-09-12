import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppBar from './components/app-bar/AppBar';
import Drawer from './components/drawer/Drawer';
import ExpressionsRecognition from './components/expressions-recognition/ExpressionsRecognition';
import ExpressionsRecognition2 from './components/expressions-recognition2/ExpressionsRecognition';
import Camera from './components/camera/Camera';

import Home from './components/home/Home';
import './App.css';

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState({
    left: false,
    right: false,
  });

  const toggleDrawer = (side, open) => event => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerOpen({ ...drawerOpen, [side]: open });
  };
  return (
    <div className="App">
      <Router>
        <AppBar toggleDrawer={toggleDrawer} />
        <Drawer toggleDrawer={toggleDrawer} open={drawerOpen} />
        <Switch>
          <Route
            path="/expressions-recognition"
            component={ExpressionsRecognition}
          />
          <Route
            path="/expressions-recognition2"
            component={ExpressionsRecognition2}
          />
          <Route path="/camera" component={Camera} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
