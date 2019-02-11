import React, { Component, Fragment } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// COMPONENTS
import Header from './components/layout/header';
import Clients from './components/clients/clients';
import NewClient from './components/clients/newClient';
import EditClient from './components/clients/editClient';
import NewProduct from './components/products/newProduct';
import Products from './components/products/products';

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache({
    addTypename: false
  }),
  onError: ({ networkError, graphQLErrors}) => {
    console.log('graphQLErrors', graphQLErrors);
    console.log('networkError', networkError);
  }
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Router>
          <Fragment>
            <Header />
            <div className='container'>
              <Switch>
                <Route exact path="/" component={Clients} />
                <Route exact path="/client/new" component={NewClient} />
                <Route exact path="/client/edit/:id" component={EditClient} />
                <Route exact path="/product/new" component={NewProduct} />
                <Route exact path="/product" component={Products} />
              </Switch>
            </div>
          </Fragment>
        </Router>
      </ApolloProvider>
    );
  }
}

export default App;
