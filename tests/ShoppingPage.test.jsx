import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Cartbar from "../src/CartBar";

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
