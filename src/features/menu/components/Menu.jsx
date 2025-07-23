// Menu.jsx
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  addToCart,
  removeFromCart,
  setShowSecretMenu,
  selectCartItems,
} from '../../cart';
import { selectIsAuthenticated, selectUser } from '../../auth';

const PANDAREN_MENU = [
  {
    id: 1,
    name: 'Steamed Dumplings',
    price: 50,
    description: 'Traditional pandaren dumplings filled with vegetables and mystery meat',
  },
  {
    id: 2,
    name: 'Spiced Noodle Soup',
    price: 50,
    description: 'Hearty noodle soup with exotic spices from the Jade Forest',
  },
  {
    id: 3,
    name: 'Bamboo Steamed Fish',
    price: 50,
    description: 'Fresh fish steamed in bamboo with aromatic herbs',
  },
  {
    id: 4,
    name: 'Pearl Rice Cakes',
    price: 50,
    description: 'Sweet rice cakes infused with pearl dust',
  },
  {
    id: 5,
    name: 'Five-Spice Tea',
    price: 50,
    description: 'Calming tea blend with five ancient spices',
  },
  {
    id: 6,
    name: 'Golden Lotus Soup',
    price: 50,
    description: 'Luxurious soup made with golden lotus petals',
  },
  {
    id: 7,
    name: 'Jade Forest Vegetables',
    price: 50,
    description: 'Mixed vegetables from the mystical Jade Forest',
  },
  {
    id: 8,
    name: "Monk's Meditation Brew",
    price: 50,
    description: 'Special brew that enhances focus and inner peace',
  },
];


function Menu() {
  const dispatch = useDispatch();

  // Get state from Redux
  const cart = useSelector(selectCartItems);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  // Check if user has tokens and show secret menu automatically
  useEffect(() => {
    if (isAuthenticated && user && user.reward_tokens > 0) {
      dispatch(setShowSecretMenu(true));
    } else {
      dispatch(setShowSecretMenu(false));
    }
  }, [isAuthenticated, user, dispatch]);

  const getCartQuantity = (itemId) => {
    return cart.filter((cartItem) => cartItem.id === itemId).length;
  };

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  const handleRemoveOneFromCart = (item) => {
    const cartIndex = cart.findIndex((cartItem) => cartItem.id === item.id);
    if (cartIndex !== -1) {
      dispatch(removeFromCart(cartIndex));
    }
  };

  return (
    <>
      {PANDAREN_MENU.map((item) => {
        const cartQuantity = getCartQuantity(item.id);
        const totalPrice = item.price;

        return (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
          >
            <h4 className="font-bold text-gray-800 bold-text">{item.name}</h4>
            <p className="text-sm text-gray-600 mb-3 regular-text">{item.description}</p>
            <div className="flex justify-between items-center gap-2">
              <span className="font-bold text-[#d1282e] extra-bold-text">{totalPrice} GOLD</span>

              {cartQuantity > 0 ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleRemoveOneFromCart(item)}
                    className="w-8 h-8 bg-[#d1282e] text-white rounded-md hover:bg-red-500 transition-colors duration-500 ease-in-out flex items-center justify-center font-bold"
                  >
                    -
                  </button>
                  <span className="min-w-[2rem] text-center font-bold text-[#d1282e]">
                    {cartQuantity}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="w-8 h-8 bg-[#d1282e] text-white rounded-md hover:bg-red-500 transition-colors duration-500 ease-in-out flex items-center justify-center font-bold"
                  >
                    +
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleAddToCart(item)}
                  className="px-4 py-2 bg-[#d1282e] text-white rounded font-bold hover:bg-red-500  shadow-sm transition-colors duration-500 ease-in-out"
                >
                  ADD TO BAG
                </button>
              )}
            </div>
          </div>
        );
      })}
    </>
  );
}

export default Menu;
