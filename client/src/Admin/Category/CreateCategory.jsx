import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Layout from "../../Components/Layout/Layout";
import { Modal } from "antd";

const CreateCategory = () => {
  const [name, setName] = useState("");
  const [Allcategory, setAllcategory] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(null);
  const [updatedName, setUpdatedName] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(`https://e-commerse-1-61im.onrender.com/api/v1/update-category/${selected._id}`, { updatedName });
      console.log(res.data);
      if (res.success) {
        toast.success(`Category updated successfully`);
        setVisible(false);
      } else {
        toast.error(`Something went wrong while updating category`);
      }
    } catch (error) {
      toast.error(`Something went wrong while updating category: ${error.message}`);
    }
    setVisible(false);
    getallproduct();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`https://e-commerse-1-61im.onrender.com/api/v1/create-category`, { name });
      toast.success(res.data);
      getallproduct();
    } catch (error) {
      console.log(`Error happened while submitting the category ${error}`);
      toast.error(error.message);
    }
  };

  const getallproduct = async () => {
    try {
      const res = await axios.get(`https://e-commerse-1-61im.onrender.com/api/v1/category`);
      toast.success(res.data);
      if (res.data.message === "All Category is Found")
        setAllcategory(res.data.category);
    } catch (error) {
      console.log(`Error happened while retrieving categories: ${error}`);
      toast.error(error.message);
    }
  };

  const handleDelete = async () => {
    try {
      console.log(selected._id);
      const res = await axios.post(`https://e-commerse-1-61im.onrender.com/api/v1/delete-category/${selected._id}`);
      toast.success(res.data);
      console.log(res);
    } catch (error) {
      toast.error(`Something went wrong while deleting the category ${error}`);
    }
    getallproduct();
  };

  useEffect(() => {
    getallproduct();
  }, []);

  return (
     <>
      <div className="container mt-4">
        <h2 className="text-center mb-4">Create Category</h2>
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">
                      Category Name
                    </label>
                    <input
                      name="name"
                      value={name}
                      id="name"
                      className="form-control"
                      placeholder="Enter Category Name"
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Submit
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center mt-4">
          <h3 className="text-center mb-3">Managed-Table</h3>
          <div className="col-md-8">
            <table className="table table-bordered table-striped">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {Allcategory.map((category) => (
                  <tr key={category.id}>
                    <td>{category.name}</td>
                    <td>
                      <button
                        className="btn btn-primary me-2"
                        onClick={() => {
                          setVisible(true);
                          setUpdatedName(category.name);
                          setSelected(category);
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setSelected(category);
                          handleDelete();
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal
        onCancel={() => setVisible(false)}
        footer={null}
        visible={visible}
      >
        <div className="container">
          <h3 className="text-center mb-3">Edit Category</h3>
          <form onSubmit={handleUpdate}>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Enter new category"
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </Modal>
     </>
  );
};

export default CreateCategory;
