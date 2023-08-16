// Define a interface for the produt item
export interface IProductItem {
    id: number; 
    title: string;
    price: number; 
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    }
};

// Define a interface for the cart slice state
export interface ICartState {
    items: ICartItem[],
    totalQuantity: number,
}

// Define a interface for the cart item
export interface ICartItem {
    id: number,
    name: string,
    price: number,
    quanity: number,
    totalPrice: number,
}

// Define a interface for the auth slice state
export interface IAuthState {
    isAuthenticated : boolean,
}