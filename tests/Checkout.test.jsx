import { expect, test } from "vitest";
import { screen, waitFor } from "@testing-library/react";
import renderWithMemRouter from "./test.utils";

const dummyCart = {cartItems: [
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
]}

test("heading with cart should load",()=>{
  renderWithMemRouter()
  expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
  expect(screen.getByRole('list')).toBeInTheDocument()
})

test("heading with cart of 1 item should load",()=>{
  renderWithMemRouter(dummyCart);
  expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
  expect(screen.getByRole('list').childNodes.length).toBe(1)
  
})

test("clicking checkout should go to Order complete page", async ()=>{
    const {user} = renderWithMemRouter(dummyCart) 
    expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
    expect(screen.getByRole('list').childNodes.length).toBe(1)
    await user.click(screen.getByText('Place Order'))
    await waitFor((()=>screen.getByRole('heading', {name: "Order Placed. Thank you!"})))
})

test("Place order button should not be visible with no items in cart", async ()=>{
  renderWithMemRouter()
  expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
  expect(screen.getByRole('list').childNodes.length).toBe(0)
  expect(screen.queryByText("Place Order")).not.toBeInTheDocument();
})

test("clicking continue shopping should go to shopping page", async ()=>{
    const {user} = renderWithMemRouter(dummyCart)
    expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
    expect(screen.getByRole('list').childNodes.length).toBe(1)
    await user.click(screen.getByRole("link", {name: 'Return to Shopping Page'}))
      
    await waitFor((()=>expect(screen.getByTestId('entered-store')).toBeInTheDocument()))
    screen.debug();
})

