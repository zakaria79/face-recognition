import React from 'react';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import DrawerListLeft from './../drawer-list-left/DrawerListLeft';
import DrawerListRight from './../drawer-list-right/DrawerListRight';

export default function SwipeableTemporaryDrawer(props) {
  return (
    <div>
      <SwipeableDrawer
        open={props.open.left}
        onClose={props.toggleDrawer('left', false)}
        onOpen={props.toggleDrawer('left', true)}>
        <DrawerListLeft side="left" toggleDrawer={props.toggleDrawer} />
      </SwipeableDrawer>
      <SwipeableDrawer
        anchor="right"
        open={props.open.right}
        onClose={props.toggleDrawer('right', false)}
        onOpen={props.toggleDrawer('right', true)}>
        <DrawerListRight side="left" toggleDrawer={props.toggleDrawer} />
      </SwipeableDrawer>
    </div>
  );
}
