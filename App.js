import React, {Component} from 'react';
import Navigation from './app/Navigation';
import { ThemeContextProvider } from './app/components/theme/ThemeContextProvider';
import { ProductProvider } from './ProductProvider';

class App extends Component {

  render() {
    return (
      <ThemeContextProvider>
        <ProductProvider>
          <Navigation />
        </ProductProvider>
      </ThemeContextProvider>
    );
  }
}

export default App;
