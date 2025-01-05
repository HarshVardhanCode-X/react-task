import React, { useState } from 'react';

const CreateProduct = ({ refreshProducts }) => {
  const [formData, setFormData] = useState({
    product_name: '',
    original_price: '',
    sale_price: '',
    product_type: '',
    description: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://lobster-app-ddwng.ondigitalocean.app/product/add_new',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            api_key: 'Z9Q7WKEY7ORGBUFGN3EG1QS5Y7FG8DU29GHKKSZH',
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert('Product Created Successfully!');
        setFormData({
          product_name: '',
          original_price: '',
          sale_price: '',
          product_type: '',
          description: '',
        });

        setTimeout(() => refreshProducts(), 1500);
      } else {
        alert('Failed to Create Product');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-black">
  <div>
    <h3 className="text-center text-white mb-4">Create New Product</h3>
    <form
      onSubmit={handleSubmit}
      className="p-4 border rounded shadow bg-white "
      style={{ width: '500px' }}
    >
      <div className="mb-3">
        <input
          type="text"
          name="product_name"
          placeholder="Product Name"
          className="form-control"
          value={formData.product_name}
          onChange={handleChange}
          required
        />
      </div>

        <div className="mb-3">
          <input type="number" name="original_price" placeholder='Original Price' className="form-control" value={formData.original_price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <input type="number" name="sale_price" placeholder='Sale Price' className="form-control" value={formData.sale_price} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <input type="text" name="product_type" placeholder='Product Type' className="form-control" value={formData.product_type} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <textarea name="description" placeholder='Description' className="form-control" value={formData.description} onChange={handleChange} required></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100">
          Create
        </button>
      </form>
    </div>
    </div>
  );
};

export default CreateProduct;
