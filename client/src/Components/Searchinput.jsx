import React from 'react';
import { useSearch } from '../context/SearchContext.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Searchinput = () => {
  const [value,setValue]=useSearch();
  const navigate=useNavigate();
  const handleChange = (e) => {
    const newValue = { ...value, keyword: e.target.value }; 
    setValue(newValue); 
  };
  const handleSubmit = async(e) => {
    e.preventDefault(); 

    try {
        const res=await axios.get(`https://e-commerse-1-61im.onrender.com/api/v1/product/search/${value.keyword}`);
        setValue({...value,result:res.data.result});
        navigate("/search-totalItem");
    } catch (error) {
        console.log(error);
    }
  };

  return (
    <form className="form-inline my-2 my-lg-0 d-flex ml-10" onSubmit={handleSubmit}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={value.keyword}
        onChange={handleChange}
      />
      <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
        Search
      </button>
    </form>
  );
};

export default Searchinput;
