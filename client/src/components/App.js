import React from 'react';
import {Router, Route} from 'react-router-dom';

import history from '../history';
import CreateForm from './CreateForm';
import ListForms from './ListForms';
import Header from './Header';
import AddQuestion from './AddQuestion';
import ShowForm from './Form/ShowForm';

const App = () => {
  return (
    <Router history={history}>
      <div className="ui container">
        <Header />
        <Route path="/" component={ListForms} exact />
        <Route path="/create" component={CreateForm} />
        <Route path="/add" component={AddQuestion} />
        <Route path="/show/:id" component={ShowForm} />
      </div>
    </Router>
  );
};

export default App;
