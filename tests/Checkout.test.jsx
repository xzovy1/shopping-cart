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

test("heading with empty cart should load",()=>{
  renderWithMemRouter()
  expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
  expect(screen.getByRole('list')).toBeInTheDocument()
})

test("heading with cart of 1 item should load",()=>{
  renderWithMemRouter(dummyCart);
  expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
  expect(screen.getByRole('list').childNodes.length).toBe(1)
})

test("clicking + and - button should change quantity by 1", async ()=>{
  const {user} = renderWithMemRouter(dummyCart);
  const increment = screen.getByRole("button", {name: "+"});
  const decrement = screen.getByRole("button", {name: "-"}); 

  await user.click(increment)
  expect(screen.getByTestId("quantity").textContent).toBe("2")
  await user.click(decrement)
  expect(screen.getByTestId("quantity").textContent).toBe("1")

})

test("quantity should not go below 1", async () => {
  const {user} = renderWithMemRouter(dummyCart);
  const decrement = screen.getByRole("button", {name: "-"});
  
  expect(screen.getByTestId("quantity").textContent).toBe("1");
  await user.click(decrement)
  expect(screen.queryByTestId("quantity")).not.toBeInTheDocument();
})

test("should be unable to place an order with an item that has a quantity of 0", async()=>{
  const {user} = renderWithMemRouter({cartItems: [
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
  ]});
  const decrement = screen.getByRole("button", {name: "-"});
  await user.click(decrement)
  expect(screen.queryByRole("button", {name: "Place Order"})).not.toBeInTheDocument();
  expect(screen.queryByRole('heading', {name: "Order Placed. Thank you!"})).not.toBeInTheDocument();
})


test("order total should display total value of items in the cart", ()=>{
  renderWithMemRouter(dummyCart);
  const orderTotal = screen.getByTestId("order-total").textContent
  expect(orderTotal).toBe("Total: $11")
})

test("Place order button should not be visible with no items in cart", async ()=>{
  renderWithMemRouter()
  expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
  expect(screen.getByRole('list').childNodes.length).toBe(0)
  expect(screen.queryByText("Place Order")).not.toBeInTheDocument();
})

test("clicking checkout should go to Order complete page", async ()=>{
    const {user} = renderWithMemRouter(dummyCart) 
    expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
    expect(screen.getByRole('list').childNodes.length).toBe(1)
    await user.click(screen.getByText('Place Order'))
    await waitFor((()=>screen.getByRole('heading', {name: "Order Placed. Thank you!"})))
})

test("clicking continue shopping should go to shopping page", async ()=>{
    const {user} = renderWithMemRouter(dummyCart)
    expect(screen.getByRole('heading', {name: "Confirm your order"})).toBeInTheDocument()
    expect(screen.getByRole('list').childNodes.length).toBe(1)
    await user.click(screen.getByRole("link", {name: 'Return to Shopping Page'}))
    await waitFor((()=>expect(screen.getByTestId('entered-store')).toBeInTheDocument()))
})

