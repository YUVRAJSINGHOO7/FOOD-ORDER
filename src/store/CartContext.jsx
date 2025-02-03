import { createContext, useReducer } from "react"; // it's all about spreading data to other component. createContext on it's own is not about managing any state, it's not about changing any values and triggering any component

const CartContext = createContext({
  // these are the default values, mostly used for better auto-completion and also helps us plan the context object in advance
  // we don't really need them, they really are dummy object
  items: [],
  addItem: (item) => {},
  removeItem: (id) => {},
  clearCart: () => {},
});

function cartReducer(state, action) {
  // the goal is to return an updated state. And the "action" will tell the "cartReducer" function how to update the state.
  if (action.type === "ADD_ITEM") {
    // updating the state to add a meal item
    // we want to update the existing cart item in an immutable way
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const updatedItems = [...state.items]; // copy of old array

    if (existingCartItemIndex > -1) {
      const existingItem = state.items[existingCartItemIndex];
      const updatedItem = {                                 // new object
        ...existingItem,
        quantity: existingItem.quantity + 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem; // override with the updatedItem
    } else {
      updatedItems.push({ ...action.item, quantity: 1 }); // we added a new property
    }

    return { ...state, items: updatedItems };       
  }

  if (action.type === "REMOVE_ITEM") {
    // remove an item from a state
    // we want to update the existing cart item in an immutable way
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    const updatedItems = [...state.items]; // copy of old array
    if (existingCartItem.quantity === 1) {
      updatedItems.splice(existingCartItemIndex, 1);
    } else {
      const updatedItem = {
        ...existingCartItem,
        quantity: existingCartItem.quantity - 1,
      };
      updatedItems[existingCartItemIndex] = updatedItem;
    }
    return { ...state, items: updatedItems };
  }

  if(action.type === 'CLEAR_CART'){
    return {...state, items:[]};
  }

  return state;
}

// next step is to define a "Context Provider" component, which can then be wrapped around other components to make the above Context available to them
// "Context Provider" component will do the actual data management and state management

// the data that is being spread can be "statefull" in provider function/component
export function CartContextProvider({ children }) {
  const [cart, dispatchCartAction] = useReducer(cartReducer, {
    // we are using useReducer() rather than useState() because states here are going to be more complex
    items: [],
  });

  function addItem(item) {
    dispatchCartAction({
      type: "ADD_ITEM",
      item: item,
    });
  }

  function removeItem(id) {
    dispatchCartAction({
      type: "REMOVE_ITEM",
      id: id,
    });
  }

  function clearCart() {
    dispatchCartAction({
      type:'CLEAR_CART',
    })
  }

  const cartContext = {
    items: cart.items,
    addItem,
    removeItem,
    clearCart,
  };

  //console.log(cartContext)
  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider> // we can use <CartContext></CartContext> without .Provider as we are using REACT version 19
  );
}

export default CartContext;

// both provider function/component (here =CartContextProvider) and context object (here =CartContext) should be exported
