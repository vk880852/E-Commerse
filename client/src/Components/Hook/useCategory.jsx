import { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const useCategory = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get('https://e-commerse-1-61im.onrender.com/api/v1/category');
                if (response.data.message === 'All Category is Found') {
                    setCategories(response.data.category);
                } else {
                    toast.error('Failed to fetch categories: Invalid response from server');
                }
            } catch (error) {
                console.error('Error while retrieving categories:', error);
                toast.error(`Something went wrong while retrieving categories: ${error.message}`);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []); 
    return { categories, loading };
};

export default useCategory;
