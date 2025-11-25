// import instance from "../config/axiosConfig";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useCart } from "../context/CartProvider";
// import { useCurrency } from "../context/CurrencyProvider"
// import { useNavigate } from "react-router-dom";

// function SingleProduct() {
//     // const id = useParams().id;
//     const { currency, convert } = useCurrency();


//     const { id } = useParams();
//     const { cart, setCart } = useCart();

//     const [singleProduct, setSingleProduct] = useState({});
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [added, setAdded] = useState(false);

//     const navigate = useNavigate();

//     useEffect(() => {
//         getSingleData(id);
//     }, [id]);

//     useEffect(() => {
//         localStorage.setItem("storedCart", JSON.stringify(cart));
//     }, [cart]);
//     console.log(cart);

//     async function getSingleData(id) {
//         try {
//             setLoading(true);
//             const response = await instance.get("/product/product/" + id);
//             if (response.data.length === 0) {
//                 setLoading(false);
//                 setError("Check the ID parameter");
//             } else {
//                 setSingleProduct(response.data);
//                 setLoading(false);
//             }
//         } catch (error) {
//             console.log(error);
//             setError("Check the ID parameter");
//             setLoading(false);
//         }
//     }

//     function handleAddToCart(ProductToAdd) {
//         const isAlreadyInCart = cart.some((item) => item._id === ProductToAdd._id);

//         if (isAlreadyInCart) {
//             alert("This product is already in your cart!");
//             return;
//         }

//         setCart([...cart, ProductToAdd]);
//         setAdded(true);
//         navigate("/cart");
//     }
    


//     if (loading) return <div className="loader">Loading...</div>;
//     if (error) return <div className="error">{error}</div>;

//     return (
//         <main className="single-product-page">
//             <section className="single-product">
//                 <div className="product-left">
//                     <img
//                         src={singleProduct.image}
//                         alt={singleProduct.name}
//                         className="product-image"
//                     />
//                 </div>

//                 <div className="product-right">
//                     <h2 className="product-title">{singleProduct.name}</h2>
//                     <p className="product-category">{singleProduct.category}</p>
//                     {/* <h4 className="product-price">₹{singleProduct.price}</h4> */}
//                     <h4 className="product-price">
//                         {currency} {convert(singleProduct.price).toFixed(2)}
//                     </h4>

//                     <p className="product-desc">{singleProduct.description}</p>
//                     <button
//                         className={`add-to-cart-btn ${added ? "added" : ""}`}
//                         onClick={() => handleAddToCart(singleProduct)}>
//                         {added === true ? "Added" : "Add To Cart"}
//                     </button>
//                 </div>
//             </section>
//         </main>
//     );
// }

// export default SingleProduct;


import instance from "../config/axiosConfig";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartProvider";
import { useCurrency } from "../context/CurrencyProvider";

// ⭐ FIREBASE IMPORTS
import { db } from "./Firebase.js";
import { collection, addDoc } from "firebase/firestore";

function SingleProduct() {

    const { currency, convert } = useCurrency();
    const { id } = useParams();
    const navigate = useNavigate();
    const { cart, setCart } = useCart();

    const [singleProduct, setSingleProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [added, setAdded] = useState(false);

    // Load single product from API
    useEffect(() => {
        getSingleData(id);
    }, [id]);

    // Save local cart to localStorage
    useEffect(() => {
        localStorage.setItem("storedCart", JSON.stringify(cart));
    }, [cart]);

    async function getSingleData(id) {
        try {
            setLoading(true);
            const response = await instance.get("/product/product/" + id);

            if (!response.data) {
                setError("Invalid Product ID");
            } else {
                setSingleProduct(response.data);
            }

            setLoading(false);
        } catch (error) {
            setError("Something went wrong!");
            setLoading(false);
        }
    }

    // ⭐ SAVE PRODUCT TO FIREBASE CART
    async function saveToFirebase(product) {
        try {
            await addDoc(collection(db, "cartItems"), {
                pid: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
                category: product.category,
                description: product.description,
                timestamp: new Date()
            });

            console.log("Saved to Firestore");
        } catch (err) {
            console.error("Firestore Error:", err);
        }
    }

    function handleAddToCart(ProductToAdd) {

        const exists = cart.some(item => item._id === ProductToAdd._id);

        if (exists) {
            alert("This product is already in your cart!");
            return;
        }

        // 1️⃣ Update Local Cart
        setCart([...cart, ProductToAdd]);

        // 2️⃣ Save to Firebase
        saveToFirebase(ProductToAdd);

        setAdded(true);
        navigate("/cart");
    }

    if (loading) return <div className="loader">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <main className="single-product-page">
            <section className="single-product">
                <div className="product-left">
                    <img
                        src={singleProduct.image}
                        alt={singleProduct.name}
                        className="product-image"
                    />
                </div>

                <div className="product-right">
                    <h2 className="product-title">{singleProduct.name}</h2>
                    <p className="product-category">{singleProduct.category}</p>

                    <h4 className="product-price">
                        {currency} {convert(singleProduct.price || 0).toFixed(2)}
                    </h4>

                    <p className="product-desc">{singleProduct.description}</p>

                    <button
                        className={`add-to-cart-btn ${added ? "added" : ""}`}
                        onClick={() => handleAddToCart(singleProduct)}
                    >
                        {added ? "Added" : "Add To Cart"}
                    </button>
                </div>
            </section>
        </main>
    );
}

export default SingleProduct;

