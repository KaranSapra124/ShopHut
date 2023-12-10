import { useNavigate } from "react-router-dom"

const useOpenProduct = () => {
    const navigate = useNavigate();

    const openProduct = async (id) => {
        try {
            const response = await fetch(`https://fakestoreapi.com/products/${id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch product data");
            }

            const data = await response.json();
            
            navigate("/ProductInfo", {
                state: {
                    Data: data
                }
            });
        } catch (error) {
            console.error(error);
            // Handle the error or display a message to the user
        }
    };

    return openProduct;
}

export default useOpenProduct;
