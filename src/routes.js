import React from 'react';
import {Switch, Route} from 'react-router-dom';

import Search from './Components/Search';
import Page from './Components/Page';

export default (
  <Switch>
    <Route path='/page/:pagetitle' component={Page} />
    <Route path='/' component={Search} />
  </Switch>
)