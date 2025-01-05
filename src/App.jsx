import React, { useState } from 'react';
import CreateProduct from './Components/CreateProduct';
import ProductTable from './Components/ProductTable';

const App = () => {
  const [refresh, setRefresh] = useState(false);

  const refreshProducts = () => {
    setRefresh((prev) => !prev); 
  };

  return (
    <div className="container mt-4">
      <CreateProduct refreshProducts={refreshProducts} />
      <ProductTable key={refresh} />
    </div>
  );
};

export default App;
