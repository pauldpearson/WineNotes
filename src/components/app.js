import React, { Fragment } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from './header';
import Footer from './footer';
import WineNotes from './wine-notes/wine-notes';

const App = () => (
  <Fragment>
    <CssBaseline />
    <Header />
    <WineNotes />
    <Footer />
  </Fragment>
);

export default App;
