export const addToCart = (product: Product, quantity: number = 1) => {
  const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const existingProductIndex = cart.findIndex((item) => item.id === product.id);

  if (existingProductIndex > -1) {
    cart[existingProductIndex].stockLevel += quantity;
  } else {
    cart.push({ ...product, stockLevel: quantity });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
};

export const removeFromCart = (productId: string) => {
  let cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
  cart = cart.filter((item) => item.id !== productId);
  localStorage.setItem("cart", JSON.stringify(cart));
};

export const updateCartQuantity = (productId: string, quantity: number) => {
  const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
  const productIndex = cart.findIndex((item) => item.id === productId);

  if (productIndex > -1) {
    if (quantity > 0) {
      cart[productIndex].stockLevel = quantity;
    } else {
      cart.splice(productIndex, 1);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

export const getCartItems = (): Product[] => {
  try {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    return Array.isArray(cart) ? cart : [];
  } catch (e) {
    console.error("Failed to parse cart items:", e);
    return [];
  }
};

// Add this function
export const clearCart = () => {
  localStorage.removeItem("cart");
};
