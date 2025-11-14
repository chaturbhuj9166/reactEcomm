import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const CurrencyContext = createContext();

const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState(
        localStorage.getItem("currency") || "INR"
    );

    const [rates, setRates] = useState({ INR: 1, USD: 1, EUR: 1 });

    useEffect(() => {
        async function fetchRates() {
            let response = await axios.get(
                "https://v6.exchangerate-api.com/v6/e928549c3a8e6ff1d81c0d0b/latest/INR"
            );

            setRates({
                INR: 1,
                USD: response.data.conversion_rates.USD,
                EUR: response.data.conversion_rates.EUR,
            });
        }
        fetchRates();
    }, []);


    useEffect(() => {
        localStorage.setItem("currency", currency);
    }, [currency]);

    function convert(priceInINR) {
        return priceInINR * rates[currency];
    }

    return (
        <CurrencyContext.Provider value={{ currency, setCurrency, convert }}>
            {children}
        </CurrencyContext.Provider>
    );
};

export default CurrencyProvider;

export function useCurrency() {
    return useContext(CurrencyContext);
}
