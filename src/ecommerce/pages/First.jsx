import { useEffect, useState } from "react";
import instance from "../config/axiosConfig.js";
import { Link } from "react-router-dom";
import { useCurrency } from "../context/CurrencyProvider";
import "./First.css"



function First() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const { currency, convert } = useCurrency();

    useEffect(() => {
        getData();
    }, []);

    async function getData() {
        try {
            setLoading(true);
            const response = await instance.get("/product/get");
            console.log(response.data);
            setProducts(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data:", error);
        }

    }

    function trimContent(input, len) {
        let arr = input.split(" ");
        return arr.length > len ? arr.slice(0, len).join(" ") + "..." : input;
    }

    if (loading) return <div className="loader">Loading.....</div>

    return (
        <>
            <div className="products-main">
                {products.map((obj) => (
                    <div className="card" key={obj._id}>
                        <Link to={`/product/${obj._id}`}>
                            <img src={obj.image} alt={obj.name} />
                        </Link>
                        <p className="title"><Link to={`/product/${obj._id}`}>{trimContent(obj.name, 8)}</Link></p>
                        {/* <p className="title"><Link to={`/product/${obj._id}`}>{obj.name}</Link></p> */}
                        {/* <p className="price">{obj.price}</p> */}
                        <p className="price">
                            {currency} {convert(obj.price).toFixed(2)}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default First;