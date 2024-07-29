import React from "react";
import axios from "axios";
import Card from "../components/Card";
function Orders({ items }) {
  const [orders, setOrders] = React.useState([]);
  const [totalPrice, setTotalPrice] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
      (async () => {
          try {
              const { data } = await axios.get('http://localhost:3001/orders');
              const mergedItems = data.reduce((prev, obj) => [...prev, ...obj.items], []);
              const itemMap = {};
              mergedItems.forEach(item => {
                  const key = `${item.id}_${item.size}`;
                  if (!itemMap[key]) {
                      itemMap[key] = { ...item, quantity: 1, totalPrice: item.price };
                  } else {
                      itemMap[key].quantity++;
                      itemMap[key].totalPrice += item.price;
                  }
              });

              
              const uniqueItems = Object.values(itemMap);
              setOrders(uniqueItems);

              
              const total = uniqueItems.reduce((acc, item) => acc + item.totalPrice, 0);
              setTotalPrice(total);

              setIsLoading(false);
          } catch (error) {
              console.error(error);
          }
      })();
  }, []);

  return (
      <div className="content p-40">
          <div className="d-flex align-center justify-between mb-40">
              <h1>my orders</h1>
              <h4>total price: ${totalPrice.toFixed(2)}</h4>
          </div>

          <div className="d-flex flex-wrap">
              {!isLoading && orders.map((item) => (
                  <div key={item.id}style={{ marginRight: '10%' }} >
                      <Card {...item} />
                      <h5 color="primary">count: {item.quantity}</h5>
                      <h5>price: ${item.totalPrice.toFixed(2)}</h5>
                  </div>
              ))}
          </div>
      </div>
  );
}

export default Orders;



