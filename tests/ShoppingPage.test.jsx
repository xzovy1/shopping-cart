import { expect, test } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
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
      screen.debug();
      expect(screen.getByText(/Welcome to The Mart Cart/i)).toBeInTheDocument();

      const user = userEvent.setup();
      const button = screen.getByRole("button")

      await user.click(button);

      const emptyCartMessage = await screen.findByText(/looks like the cart is empty/i);
      expect(emptyCartMessage).toBeInTheDocument();
      waitForElementToBeRemoved(screen.queryByText(/loading/i));
      screen.debug();  
      expect(screen.getByTestId("cart-bar")).toBeInTheDocument();
})



  // vi.mock('../src/useItems', () => ({
  //   default: () => ({
  //     items: [
  //       { id: 1, title: 'Item 1', image: '/item1.jpg', description: 'Description 1' },
  //       { id: 2, title: 'Item 2', image: '/item2.jpg', description: 'Description 2' },
  //     ],
  //     loading: false,
  //     error: null,
  //   }),
  // }));
  
  test('cart and shopping page visible with one or more items in cart', async () => {
    const handleClick = vi.fn();
  
    render(<Inventory itemClickHandler={handleClick} />);
  
    // Verify the inventory component renders correctly
    // expect(await screen.findByTe("inventory")).toBeInTheDocument();
    // expect( await screen.findByText("")).toBeInTheDocument();
    // expect(screen.getByText("Item 2")).toBeInTheDocument();
    screen.debug();
    
  });