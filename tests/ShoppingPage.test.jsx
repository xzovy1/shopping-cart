import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Inventory from "../src/Inventory";
import Cartbar from "../src/Cart";
import ShoppingPage from "../src/ShoppingPage";
import Storefront from "../src/Storefront";

test('cart bar and shopping page visible with zero items in cart',()=>{
    render(
        <MemoryRouter >
          <Routes>
            <Route path="/" element={<Storefront />} />
            <Route path="/shopping-page" element={<ShoppingPage />} />
          </Routes>
        </MemoryRouter>
      );
      screen.debug();
      expect(screen.getByText(/Welcome to The Mart Cart/i)).toBeInTheDocument();

      const user = userEvent.setup();
      const button = screen.getByRole("button")

      await user.click(button);

      const emptyCartMessage = await screen.findByText(/looks like the cart is empty/i);
      expect(emptyCartMessage).toBeInTheDocument();
      expect(screen.getByTestId('inventory')).toBeInTheDocument(); 
      expect(screen.getByTestId("cart-bar")).toBeInTheDocument();
})

// test('cart and shopping page visible with one or more items in cart', () => {
//   render(
//     <MemoryRouter >
//       <Routes>
//         <Route path="/" element={<Storefront />} />
//         <Route path="/shopping-page" element={<ShoppingPage />} />
//       </Routes>
//     </MemoryRouter>
//   );

//   expect(screen.getByRole("list")).toBeInTheDocument();
//   expect(screen.getByTestId("inventory")).toBeInTheDocument();
// })