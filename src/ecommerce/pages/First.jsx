import { useEffect, useState } from "react";
import instance from "../config/axiosConfig";

// import "../ecommerce.css";

import { PiCurrencyInr } from "react-icons/pi";
import { Link } from "react-router-dom";

function First() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    setLoading(true);
    const response = await instance.get("/product/get");
    // const result = await response.json();
    // console.log(response.data);
    setProducts(response.data);
    setLoading(false);
  }

  function trimContent(input, len) {
    const arr = input.split(" ");
    return arr.length > len ? arr.slice(0, len).join(" ") + "..." : input;
  }

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <>
      <section className="products">
        {products.length > 0 &&
          products.map((obj) => {
            return (
              <div className="product" key={obj._id}>
                <Link to={`/product/${obj._id}`}>
                  <img src={obj.image} alt={obj.name} />
                </Link>
                <h3>
                  <Link to={`/product/${obj._id}`}>
                    {trimContent(obj.name, 8)}
                  </Link>
                </h3>
                <p className="price">

                  <PiCurrencyInr /> {obj.price}
                  
                </p>
              </div>
            );
          })}
      </section>
    </>
  );
}

export default First;