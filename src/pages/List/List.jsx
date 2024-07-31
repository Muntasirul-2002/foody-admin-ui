import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";
const List = ({url}) => {
  
  const [list, setList] = useState([]);
  const fetchListFood = async () => {
    const response = await axios.get(`${url}/api/food/list`);

    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Error getting list");
    }
  };
//remove item
const removeFood = async (foodId) => {
  try {
    const response = await axios.delete(`${url}/api/food/remove-food`, {
      data: { id: foodId },
    });
    if (response.data.success) {
      toast.success(response.data.message);
      await fetchListFood();
    } else {
      toast.error("Something went wrong!");
    }
  } catch (error) {
    console.error("Error removing food:", error);
    toast.error("Something went wrong!");
  }
};

  useEffect(() => {
    fetchListFood();
  }, []);
  return (
    <div className="list add flex-col">
      <p>All Food List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => {
          return (
            <div className="list-table-format" key={index}>
              <img src={`${url}/uploads/` + item.image} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.price}</p>
              <p className="cursor" onClick={()=>removeFood(item._id)}>
                X
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
