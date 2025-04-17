import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter, MemoryRouter, Route, Routes } from "react-router-dom";
import Checkout from "../src/Checkout";
import ShoppingPage from "../src/ShoppingPage";
import OrderComplete from "../src/OrderComplete";

test("heading with cart should load",()=>{
    const route = '/checkout'
    render(
        <MemoryRouter initialEntries={[route]}>
          <Checkout />
        </MemoryRouter>
      );
      expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
      expect(screen.getByRole('list')).toBeInTheDocument()
})

test.only("heading with cart of 1 item should load",()=>{
    render(
        <MemoryRouter initialEntries={
            [
                {
                    pathname:"/checkout", 
                    state: {
                        cartItems: [
                            {
                                category: "test category 1",
                                description: "test desc. 1",
                                id: 1,
                                image: 'testImg.url',
                                price: 11,
                                rating: {rate: 4.9, count: 120},
                                title: "test title 1",
                                quantity: 1
                            }
                        ]
                    }
                }
            ]
          }>
          <Checkout />
        </MemoryRouter>
      );
      expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
      expect(screen.getByRole('list').childNodes.length).toBe(1)
})

test("clicking checkout should go to Order complete page", async ()=>{
    const user = userEvent.setup();
    render(
        <MemoryRouter initialEntries={
            [
                {
                    pathname:"/checkout", 
                    state: {
                        cartItems: [
                            {
                                category: "test category 1",
                                description: "test desc. 1",
                                id: 1,
                                image: 'testImg.url',
                                price: 11,
                                rating: {rate: 4.9, count: 120},
                                title: "test title 1"
                            }
                        ]
                    }
                },
            ]
          } initialIndex={0}>
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-complete" element={<OrderComplete />} />
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
      expect(screen.getByRole('list').childNodes.length).toBe(1)
    await user.click(screen.getByText('Place Order'))
    await waitFor((()=>screen.getByRole('heading', {name: "Order Placed. Thank you!"})))
})

test("Place order button should not be visible with no items in cart", async ()=>{
    render(
        <MemoryRouter initialEntries={
            [
                {
                    pathname:"/checkout", 
                    state: {
                        cartItems: []
                    }
                },
            ]
          } initialIndex={0}>
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-complete" element={<OrderComplete />} />
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
      expect(screen.getByRole('list').childNodes.length).toBe(0)
      expect(screen.queryByText("Place Order")).not.toBeInTheDocument();
})

test("clicking continue shopping should go to shopping page", async ()=>{
    const user = userEvent.setup();
    render(
        <MemoryRouter initialEntries={
            [
                {
                    pathname:"/checkout", 
                    state: {
                        cartItems: [
                            {
                                category: "test category 1",
                                description: "test desc. 1",
                                id: 1,
                                image: 'testImg.url',
                                price: 11,
                                rating: {rate: 4.9, count: 120},
                                title: "test title 1"
                            }
                        ]
                    }
                },
            ]
          } initialIndex={0}>
          <Routes>
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/shopping-page" element={<ShoppingPage />} />
          </Routes>
        </MemoryRouter>
      );
      expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
      expect(screen.getByRole('list').childNodes.length).toBe(1)
    await user.click(screen.getByRole("link", {name: 'Return to Shopping Page'}))
      
    await waitFor((()=>expect(screen.getByTestId('entered-store')).toBeInTheDocument()))
})

