import React, { useEffect, useState } from "react";
import { getRequest, putRequest } from "../commons/Axios";

const GetOrderList = () => {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    async function fetchData() {
      var response = await getRequest("/Order");
      setOrderList(response);
    }

    fetchData();
  }, []);

  const acceptOrder = async (id) => {
    console.log(id);
    const response = await putRequest("/Order/" + id + "/ORDER_ACCEPTED");

    if (response) {
      window.confirm("Order accepted successfully");
    }
  };

  const getTableDetails = (orderList) => {
    return (
      <table cellSpacing="0">
        <thead>
          <tr>
            <th>Order Id</th>
            <th>Status</th>
            <th>Product Id</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Ordered Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orderList.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.status}</td>
              <td>{order.itemEntity && order.itemEntity.id}</td>
              <td>{order.itemEntity && order.itemEntity.name}</td>
              <td>{order.itemEntity && order.itemEntity.price}</td>
              <td>{order.quantity}</td>
              <td>
                {order.status !== "ORDER_ACCEPTED" && (
                  <button
                    className="ui button blue"
                    onClick={() => acceptOrder(order.id)}
                  >
                    Accept
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="item-list">
      <h1>Order List</h1>
      <br></br>
      {orderList && orderList.length > 0 ? (
        getTableDetails(orderList)
      ) : (
        <div>No data found</div>
      )}
    </div>
  );
};

export default GetOrderList;
