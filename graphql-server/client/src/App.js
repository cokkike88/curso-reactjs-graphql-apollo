import React, { Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

// COMPONENTS
import Header from './components/layout/header';
import Clients from './components/clients/clients';
import NewClient from './components/clients/newClient';
import EditClient from './components/clients/editClient';
import NewProduct from './components/products/newProduct';
import Products from './components/products/products';
import EditProduct from './components/products/editProduct';
import NewOrder from './components/orders/newOrder';
import OrdersClient from './components/orders/ordersClient';
import Panel from './panel/panel';
import Register from './components/auth/register';
import Login from './components/auth/login';
import Session from './components/Session';

const App = ({refetch, session}) => {

  const { getUser } = session;
  const message = (getUser) ? `Bienvenido: ${getUser.name}` : <Redirect to="/login" />;
  console.log(session);
  return (    
    <Router>
      <Fragment>
        <Header session={session} />
        <div className='container'>
          <p className="text-right">{message}</p>
          <Switch>
            <Route exact path="/client" render={() => <Clients session={session} />} />
            <Route exact path="/client/new" render={() => <NewClient session={session} />} />
            <Route exact path="/client/edit/:id" component={EditClient} />
            <Route exact path="/product/new" component={NewProduct} />
            <Route exact path="/product" component={Products} />
            <Route exact path="/product/edit/:id" component={EditProduct} />
            <Route exact path="/order/new/:id" render={() => <NewOrder session={session} />} />
            <Route exact path="/order/:clientId" component={OrdersClient} />
            <Route exact path="/panel" component={Panel} />
            <Route exact path="/register" render={() => <Register session={session} />}  />
            <Route exact path="/login" render={() => <Login refetch={refetch} />} />
          </Switch>
        </div>
      </Fragment>
    </Router>
  );
}

const RootSession = Session(App);

export {RootSession};
