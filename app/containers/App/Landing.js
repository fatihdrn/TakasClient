import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Outer from '../Templates/Outer';
import { HomePage, LoginR } from '../pageListAsync';

function Landing() {
  return (
    <Outer>
      <Switch>
        <Route exact path="/" component={LoginR} />
      </Switch>
    </Outer>
  );
}

export default Landing;
