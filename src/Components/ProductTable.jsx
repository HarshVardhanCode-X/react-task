import { useState, useEffect } from 'react';

const sortItems = [
  { label: "Product ID", key: "_id" },
  { label: "Name", key: "product_name" },
  { label: "Date and Time", key: "date_n_time" },
  { label: "Original Price", key: "original_price" },
  { label: "Sale Price", key: "sale_price" },
  { label: "Product Type", key: "product_type" },
  { label: "Description", key: "description" },
];

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState({ label: "Product ID", key: "_id" });
  const recordsPerPage = 10;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://lobster-app-ddwng.ondigitalocean.app/product/list', {
        headers: { 'api_key': 'Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH' },
      });

      if (response.ok) {
        const data = await response.json();

        if (Array.isArray(data?.message)) {
          setProducts(data.message);
        } else {
          setProducts([]);
        }
      } else {
        console.error('Failed to fetch products:', response.status);
        alert('Failed to fetch products');
      }
    } catch (error) {
      console.error('Error while fetching products:', error.message);
      alert('Failed to fetch products');
    }
  };

  useEffect(() => {
    setFilteredProducts(products);
  }, [products]);

  useEffect(() => {
    const timer = setTimeout(filterProducts, 350);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    filterProducts();
  }, [sort.key]);

  const filterProducts = () => {
    setPage(1);
    setFilteredProducts(() => products
      .filter((product) =>
        product[sort.key]
          ?.toString()
          .toLowerCase()
          .includes(search.trim().toLowerCase())
      )
      .sort((a, b) => {
        if (a[sort.key] < b[sort.key]) return -1;
        if (a[sort.key] > b[sort.key]) return 1;
        return 0;
      }));
  };

  const getPaginatedData = () => filteredProducts?.slice((page - 1) * recordsPerPage, page * recordsPerPage);

  if (!Array.isArray(products) || products.length === 0) {
    return <div>No products available.</div>;
  };

  return (
    <div className="p-5 bg-dark text-white">
      <div className="d-flex justify-content-between align-items-center">
        <h3>All Products</h3>

        <div className="d-flex gap-3 align-items-center">
          <div className="dropdown mb-3">
            <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
              Sort by: {sort.label}
            </button>
            <ul className="dropdown-menu">
              {sortItems.map(item => (
                <li key={item.key} onClick={() => {
                  setSearch('');
                  setSort(item);
                }}>
                  <a className="dropdown-item" href={null} style={{ cursor: "pointer" }}>
                    {item.label} {sort.key === item.key && '✅'}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <input
            type="text"
            placeholder={`Search by ${sort.label}`}
            className="form-control mb-3 position-relative"
            style={{ width: "200px" }}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          {search &&
            <p className='position-absolute text-black' style={{ cursor: "pointer", right: "55px" }} title='Clear' onClick={() => setSearch('')}>X</p>}
        </div>
      </div>

      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Date and Time</th>
            <th>Product ID</th>
            <th>Name</th>
            <th>Original Price</th>
            <th>Sale Price</th>
            <th>Product Type</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {getPaginatedData().map((product, i) => (
            <tr key={product?._id}>
              <td>{(page - 1) * recordsPerPage + (i + 1)}</td>
              <td>{new Date(product?.date_n_time).toLocaleString()}</td>
              <td>{product?._id}</td>
              <td>{product?.product_name}</td>
              <td>{product?.original_price}</td>
              <td>{product?.sale_price}</td>
              <td>{product?.product_type}</td>
              <td title={product?.description}>{product?.description?.slice(0, 10) + "..."}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between">
        <button disabled={page === 1} onClick={() => setPage(page - 1)} className="btn btn-primary">
          Previous
        </button>
        <span>Page {page}/{Math.ceil(filteredProducts.length / recordsPerPage)}</span>
        <button disabled={page * recordsPerPage >= filteredProducts.length} onClick={() => setPage(page + 1)} className="btn btn-primary">
          Next
        </button>
      </div>
    </div >
  );
};

export default ProductTable;
