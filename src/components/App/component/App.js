import React, { Component } from 'react';
import Header from '../../Header/component/Header';
import Footer from '../../Footer/component/Footer';
import Body from '../../Body/component/Body';


class App extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div>
        <Header />
        <Body />
        <Footer />
      </div>
    );
  }
}

export default App;
