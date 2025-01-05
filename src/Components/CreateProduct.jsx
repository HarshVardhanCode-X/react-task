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
    <form onSubmit={handleSubmit} className="p-4 border">
      <h3>Create Product</h3>
      <div className="mb-3">
        <label>Product Name</label>
        <input type="text" name="product_name" className="form-control" value={formData.product_name} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label>Original Price</label>
        <input type="number" name="original_price" className="form-control" value={formData.original_price} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label>Sale Price</label>
        <input type="number" name="sale_price" className="form-control" value={formData.sale_price} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label>Product Type</label>
        <input type="text" name="product_type" className="form-control" value={formData.product_type} onChange={handleChange} required />
      </div>

      <div className="mb-3">
        <label>Description</label>
        <textarea name="description" className="form-control" value={formData.description} onChange={handleChange} required></textarea>
      </div>

      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CreateProduct;
