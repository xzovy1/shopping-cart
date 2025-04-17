import { expect, test } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ShoppingPage from "../src/ShoppingPage";
import { BrowserRouter } from "react-router-dom";

test("loads all 20 items eventually", async ()=>{
  render(
    <BrowserRouter>
      <ShoppingPage />
    </BrowserRouter>
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
  render(
    <BrowserRouter>
      <ShoppingPage />
    </BrowserRouter>
  );

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

test("clicking 'Add to Cart' on the same item updates quantity property by one", async()=>{
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <ShoppingPage />
    </BrowserRouter>
  );

  await waitFor(()=>{
    screen.getByTestId("inventory")
  })
  const firstItem = screen.getAllByTestId("item")[0];
  const addToCartButton = firstItem.querySelector('button');

  await user.click(addToCartButton);

  const li = screen.getAllByTestId("item-added")
  expect(li.length).toBe(1);
  expect(screen.getAllByTestId("quantity")[0].textContent).toBe("x1"); //check quantity of first item in cart
  await user.click(addToCartButton);
  expect(screen.getAllByTestId("quantity")[0].textContent).toBe("x2");//check quantity of first item in cart
})

test("adding a second item adds another list item to the cart bar", async()=>{
  const user = userEvent.setup();

  render(
    <BrowserRouter>
      <ShoppingPage />
    </BrowserRouter>
  );
  await waitFor(()=>{
    screen.getByTestId("inventory")
  })
  const firstItem = screen.getAllByTestId("item")[0];
  const secondItem = screen.getAllByTestId("item")[1];

  await user.click(firstItem.querySelector('button'));
  await user.click(secondItem.querySelector('button'));

  expect(screen.queryByRole('list').childElementCount).toBe(2)
  
})

test("add every item to the cart once", async ()=>{
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <ShoppingPage />
    </BrowserRouter>
  );
  await waitFor(()=>{
    screen.getByTestId("inventory")
  })

  let items = screen.getAllByTestId("item").length - 1
  for(let i = 0; i <= items; i++){
    const item = screen.getAllByTestId("item")[i];
    await user.click(item.querySelector('button'));
  }

  expect(screen.queryByRole('list').childElementCount).toBe(20)
})

test('increasing the quantity of one item while having more than one item in the cart', async ()=>{
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <ShoppingPage />
    </BrowserRouter>
  );
  await waitFor(()=>{
    screen.getByTestId("inventory")
  })

  const firstItem = screen.getAllByTestId("item")[0];
  const secondItem = screen.getAllByTestId("item")[1];
  const thirdItem = screen.getAllByTestId("item")[2];

  await user.click(firstItem.querySelector('button'));
  await user.click(secondItem.querySelector('button'));
  await user.click(firstItem.querySelector('button'));
  await user.click(thirdItem.querySelector('button'));
  await user.click(thirdItem.querySelector('button'));
  await user.click(thirdItem.querySelector('button'));

  expect(screen.queryByRole('list').childElementCount).toBe(3);
  expect(screen.getAllByTestId('quantity')[0].textContent).toBe("x2")
  expect(screen.getAllByTestId('quantity')[2].textContent).toBe("x3")

})

test("should properly increment items with large quantities", async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <ShoppingPage />
    </BrowserRouter>
  );
  
  await waitFor(() => {
    screen.getByTestId("inventory");
  });
  
  const firstItem = screen.getAllByTestId("item")[0];
  const secondItem = screen.getAllByTestId("item")[1];
  const firstItemButton = firstItem.querySelector('button');
  const secondItemButton = secondItem.querySelector('button');
  
  for (let i = 0; i < 100; i++) {
    await user.click(firstItemButton);
    await user.click(secondItemButton);
  }

  expect(screen.getAllByTestId("quantity")[0].textContent).toBe("x100");
  expect(screen.getAllByTestId("quantity")[1].textContent).toBe("x100");
});
