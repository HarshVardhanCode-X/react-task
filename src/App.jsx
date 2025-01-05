import React, { useState } from 'react';
import CreateProduct from './Components/CreateProduct';
import ProductTable from './Components/ProductTable';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshProducts = () => {
    setRefresh((prev) => !prev); 
  };

  return (
    <>
      <CreateProduct refreshProducts={refreshProducts} />
      <ProductTable key={refresh} />
    </>
  );
};

export default App;
