import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Browse from './Browse';

export default () =>
  <Switch>
    <Route path='/admin/students' component={Browse} />
    <Route path='/admin/students/create' component={Browse}/>
    <Route path='/admin/students/update/:id' component={Browse}/>
  </Switch>