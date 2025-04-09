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
      render(<Cartbar quantity={[]}/>)
      render(<Inventory />)
      expect(screen.getByText(/uh oh! looks like the cart is empty/i)).toBeInTheDocument() //in-cart list
      expect(screen.getByTestId('inventory')).toBeInTheDocument(); //inventory items
})

test('cart and shopping page visible with one or more items in cart', () => {
  render(
    <MemoryRouter >
      <Routes>
        <Route path="/" element={<Storefront />} />
        <Route path="/shopping-page" element={<ShoppingPage />} />
      </Routes>
    </MemoryRouter>
  );
  render(<Cartbar quantity={1} />)
  render(<Inventory />)
  screen.debug();
  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getByTestId("inventory")).toBeInTheDocument();
})