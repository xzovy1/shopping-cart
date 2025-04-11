import { expect, test } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Inventory from "../src/Inventory";
import Cartbar from "../src/CartBar";
import ShoppingPage from "../src/ShoppingPage";
import Storefront from "../src/Storefront";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

// const {item, error, loading} = vi.mock('../useItems.jsx');

test("cart bar displays empty cart message when empty", ()=> {
  render(<>
    <Cartbar cartItems={[]}/>
  </>)
  expect(screen.getByText('Looks like the cart is empty!')).toBeInTheDocument();
})

test("cart bar displaying list item when cart has one or more item", () => {
  const testItems = [
    {name: "Test Item 1", id: 1, url: 'testimg.img'}
  ]

    render(<Cartbar cartItems={testItems} />)

    expect(screen.queryByText('Looks like the cart is empty!')).not.toBeInTheDocument();
    expect(screen.getByRole('listitem')).toBeInTheDocument();
})

test("Inventory should render in a loading state", () => {
  render(<Inventory />)
  const loadingElement = screen.getByText("Loading...")
  expect(loadingElement).toBeInTheDocument();
})

const mock = {items: null, error: null, loading: false, };
vi.mock('../src/Inventory', ()=>({
  useItems: ()=> mock,
}))
test("if inventory displays according to the hooks data", async()=>{
  render(<Inventory updateCartItems={vi.fn} />);
  
  const loadingElement = screen.queryByText("Loading...");
  
  const errorElement = screen.queryByText('A Server error has occurred')
  expect(errorElement).not.toBeInTheDocument()
  expect(loadingElement).not.toBeInTheDocument();
  screen.debug();


})
