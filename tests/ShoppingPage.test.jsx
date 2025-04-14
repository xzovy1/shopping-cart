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

test("Add to Cart button updates Cartbar", async()=>{
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

  const li = screen.queryByTestId("item-added")
  const emptyCartMessage = screen.queryByText("Looks like the cart is empty!")
  expect(li).toBeInTheDocument();
  expect(emptyCartMessage).not.toBeInTheDocument();
})

test("clicking 'Add to Cart' in Inventory add the same item adds updates quantity property", async()=>{
  const user = userEvent.setup();
  render(<ShoppingPage />)

  await waitFor(()=>{
    screen.getByTestId("inventory")
  })
  const firstItem = screen.getAllByTestId("item")[0];
  const addToCartButton = firstItem.querySelector('button');

  await user.click(addToCartButton);

  const li = screen.getAllByTestId("item-added")
  expect(li.length).toBe(1);
  expect(screen.getAllByTestId("quantity")[0].textContent).toBe("1"); //check quantity of first item in cart
  await user.click(addToCartButton);
  expect(screen.getAllByTestId("quantity")[0].textContent).toBe("2");//check quantity of first item in cart
})

test("adding a second item adds another list item to the cart bar", async()=>{
  const user = userEvent.setup();

  render(<ShoppingPage />)
  await waitFor(()=>{
    screen.getByTestId("inventory")
  })
  const firstItem = screen.getAllByTestId("item")[0];
  const secondItem = screen.getAllByTestId("item")[1];

  await user.click(firstItem.querySelector('button'));
  await user.click(secondItem.querySelector('button'));

  expect(screen.queryByRole('list').childElementCount).toBe(2)
  
})
