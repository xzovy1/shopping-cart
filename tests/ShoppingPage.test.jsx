import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Inventory from "../src/Inventory";
import Cartbar from "../src/Cart";
import ShoppingPage from "../src/ShoppingPage";
import Storefront from "../src/Storefront";
import userEvent from "@testing-library/user-event";

test('cart bar and shopping page visible with zero items in cart',async ()=>{
    render(
        <MemoryRouter >
          <Routes>
            <Route path="/" element={<Storefront />} />
            <Route path="/shopping-page" element={<ShoppingPage />} />
          </Routes>
        </MemoryRouter>
      );

      const user = userEvent.setup();
      const button = screen.getByRole("button")
      
      await user.click(button);
      
      const emptyCartMessage = await screen.findByText(/looks like the cart is empty/i);
            expect(emptyCartMessage).toBeInTheDocument();

      expect(screen.getByTestId('inventory')).toBeInTheDocument(); 
      expect(screen.getByTestId('cart-bar')).toBeInTheDocument();
})

// test('cart and shopping page visible with one or more items in cart', () => {

//  const cartItems = [{id: 1, name: "Test Item", price: 10.99, quantity: 1}]

//   render(
//     <MemoryRouter >
//       <Routes>
//         <Route path="/" element={<Storefront />} />
//         <Route path="/shopping-page" element={<ShoppingPage />} />
//       </Routes>
//     </MemoryRouter>
//   );
//   // render(<Cartbar quantity={1} />)
//   // render(<Inventory />)
//   // screen.debug();
//   expect(screen.getByRole("list")).toBeInTheDocument();
//   expect(screen.getByTestId("inventory")).toBeInTheDocument();
// })