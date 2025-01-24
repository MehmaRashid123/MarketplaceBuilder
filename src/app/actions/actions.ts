export const addToCart = (product: Product) => {
  // Retrieve the current cart items from localStorage
  const cart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");

  // Check if the product already exists in the cart
  const existingProductIndex = cart.findIndex((item) => item.id === product._id);

  if (existingProductIndex > -1) {
    // If product exists, increment its quantity (stockLevel)
    cart[existingProductIndex].stockLevel += 1;
  } else {
    // If product doesn't exist, add it as a new item with quantity 1
    cart.push({ ...product, stockLevel: 1 });
  }

  // Save the updated cart back to localStorage
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
    // Update stockLevel for the specified product
    cart[productIndex].stockLevel = quantity;
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
