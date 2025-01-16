const base_service = 'wine-service/api/v1.0'

export const API_CART = {
  apiCartSession: `${base_service}/cart-session`,
  apiCartSessionGenerate: `${base_service}/cart-session/generate`,
  apiCartSessionAdd: `${base_service}/cart-session/add`,
  apiCartSessionRemove: `${base_service}/cart-session/remove`,

  apiCart: `${base_service}/carts`,
  apiCartAdd: `${base_service}/carts/add`,
  apiCartRemove: `${base_service}/carts/remove`,
  apiCartUser: `${base_service}/carts/users`,
};
