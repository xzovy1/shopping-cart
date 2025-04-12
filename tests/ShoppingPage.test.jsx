import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShoppingPage from "../src/ShoppingPage";

test("loads all 20 items eventually", async ()=>{
  render(
   <ShoppingPage />
  );

  expect(screen.getByTestId("entered-store")).toBeInTheDocument();
  const emptyCartMessage = await screen.findByText(/looks like the cart is empty/i);
  expect(emptyCartMessage).toBeInTheDocument();
  expect(screen.getByTestId("cart-bar")).toBeInTheDocument();
  await waitFor(()=>{
    expect(screen.getByTestId("inventory")).toBeInTheDocument();
    const imageQuantity = screen.getAllByRole('img').length
    const itemsLoaded = screen.getByTestId('quantity').textContent
    expect(itemsLoaded).toBe("20 items loaded")
    expect(imageQuantity).toEqual(20) //check if 20 images loaded
  })
});

test("'Add to Cart' button updates Cartbar", async()=>{
  const user = userEvent.setup();
  render(<ShoppingPage />)

  await waitFor(()=>{
    expect(screen.getByTestId("inventory")).toBeInTheDocument();
    const imageQuantity = screen.getAllByRole('img').length
    const itemsLoaded = screen.getByTestId('quantity').textContent
    expect(itemsLoaded).toBe("20 items loaded")
    expect(imageQuantity).toEqual(20) //check if 20 images loaded
  })
  const firstItem = screen.getAllByTestId("item")[0];
  const addToCartButton = firstItem.querySelector('button');

  await user.click(addToCartButton);
  // screen.debug();
  const li = screen.queryByTestId("item-added")
  const emptyCartMessage = screen.queryByText("Looks like the cart is empty!")
  expect(li).toBeInTheDocument();
  expect(emptyCartMessage).not.toBeInTheDocument();
})

test("clicking 'Add to Cart' in Inventory add the same item adds updates quantity property", async()=>{
  const user = userEvent.setup();
  render(<ShoppingPage />)

  await waitFor(()=>{
    expect(screen.getByTestId("inventory")).toBeInTheDocument();
    const imageQuantity = screen.getAllByRole('img').length
    const itemsLoaded = screen.getByTestId('quantity').textContent
    expect(itemsLoaded).toBe("20 items loaded")
    expect(imageQuantity).toEqual(20) //check if 20 images loaded
  })
  const firstItem = screen.getAllByTestId("item")[0];
  const addToCartButton = firstItem.querySelector('button');

  await user.click(addToCartButton);
  // screen.debug();
  
  await user.click(addToCartButton);
  const li = screen.getAllByTestId("item-added")

  expect(li.length).toBe(1);
  screen.debug();
})