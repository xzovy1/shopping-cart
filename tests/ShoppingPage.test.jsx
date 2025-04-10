import { expect, test } from "vitest";
import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import Inventory from "../src/Inventory";
import Cartbar from "../src/CartBar";
import ShoppingPage from "../src/ShoppingPage";
import Storefront from "../src/Storefront";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";

test('shopping page and cart bar visible. cart bar displays empty cart message', ()=>{
    const handleCartItems = () => vi.fn();
    const dummyHook = () => {
      return {
        items: [
          { id: 1, title: 'Item 1', image: '/item1.jpg', description: 'Description 1' },
          { id: 2, title: 'Item 2', image: '/item2.jpg', description: 'Description 2' },
        ],
        loading: false,
        error: null,
      }
    }
  
    render(
        <>
          <Cartbar cartItems={()=>[]}/>
          <Inventory updateCartItems={handleCartItems} fetchHook={dummyHook} />
        </>
      );
      screen.debug();
      expect(screen.getByText(/Welcome to The Mart Cart/i)).toBeInTheDocument();

      const user = userEvent.setup();
      const button = screen.getByRole("button")

      

      const emptyCartMessage = screen.findByText(/looks like the cart is empty/i);
            expect(emptyCartMessage).toBeInTheDocument();
      waitForElementToBeRemoved(screen.queryByText(/loading/i));
      expect(screen.getByTestId("cart-bar")).toBeInTheDocument();
})

test('shopping page and cart bar visible. cart bar does not display empty cart message',async ()=>{
  const fetchedData = ()=> {
    return {
      items: [
        { id: 1, title: 'Item 1', image: '/item1.jpg', description: 'Description 1' },
        { id: 2, title: 'Item 2', image: '/item2.jpg', description: 'Description 2' },
      ],
      loading: false,
      error: null,
    }
  }

  render(
      <>
        <Cartbar />
        <Inventory />
      </>
    );
    screen.debug();
    expect(screen.getByText(/Welcome to The Mart Cart/i)).toBeInTheDocument();

    const user = userEvent.setup();
    const button = screen.getByRole("button")

    await user.click(button);
    screen.debug();
    waitForElementToBeRemoved(screen.queryByText(/loading/i));
    expect(screen.getByTestId("cart-bar")).not.toBeInTheDocument();
})

test('shopping page and cart bar visible. cart bar does not display empty cart message', () => {
  const clickHandler = vi.fn()
  const fetchedData = ()=> {
    return {
      items: [
        { id: 1, title: 'Item 1', image: '/item1.jpg', description: 'Description 1' },
        { id: 2, title: 'Item 2', image: '/item2.jpg', description: 'Description 2' },
      ],
      loading: false,
      error: null,
    }
  }
  render(
    <>
      <Cartbar />
      <Inventory itemClickHandler={clickHandler} fetchHook={fetchedData}/>
    </>
  );

    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByTestId("cart-bar")).toBeInTheDocument();
    expect(screen.get)

  });

