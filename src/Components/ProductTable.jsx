import React, { useState, useEffect } from 'react';

const ProductTable = () => {
  const [products, setProducts] = useState([]); 
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const recordsPerPage = 10;


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://lobster-app-ddwng.ondigitalocean.app/product/list',
        {
          headers: {api_key: 'Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH'},
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);

        if (Array.isArray(data.message)) {
          const sanitizedProducts = data.message.map((product) => ({
            ...product,
            product_name: product.product_name?.trim() || 'Unnamed Product',
          }));
          setProducts(sanitizedProducts);
          console.log('Sanitized Products:', sanitizedProducts);
        } else {
          console.error('API response does not contain an array in "message":', data);
          setProducts([]);
        }
      } else {
        console.error('Failed to fetch products:', response.status);
      }
    } catch (error) {
      console.error('Error while fetching products:', error.message);
    }
  };


  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products available.</div>;
  }


  const filteredProducts = products
    .filter((product) =>
      product.product_name
        ?.trim()
        .toLowerCase()
        .includes(search.trim().toLowerCase())
    )
    .slice((page - 1) * recordsPerPage, page * recordsPerPage);

  console.log('Filtered Products:', filteredProducts);

  return (
    <div className="p-5 bg-black text-white">
      <div className='d-flex justify-content-between'>
        <h3>All Products</h3>

        <input type="text" placeholder="Search" className="form-control mb-3" style={{width:"150px"}} value={search}onChange={(e) => setSearch(e.target.value)}/>
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Product Name</th>
            <th>Original Price</th>
            <th>Sale Price</th>
            <th>Product Type</th>
            <th>Description</th>
            <th>Date and Time</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map((product, index) => (
            <tr key={index}>
              <td>{product._id}</td>
              <td>{product.product_name}</td>
              <td>{product.original_price}</td>
              <td>{product.sale_price}</td>
              <td>{product.product_type}</td>
              <td>{product.description}</td>
              <td>{new Date(product.date_n_time).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="btn btn-primary">
          Previous
        </button>
        <span>Page {page}</span>
        <button disabled={page * recordsPerPage >= products.length} onClick={() => setPage(page + 1)} className="btn btn-primary">
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
