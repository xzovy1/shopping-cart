import App from '../src/App'
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

describe("App component", ()=>{
    it("renders store front page with an enter button", ()=>{
        render(<App />);
        expect(screen.getByRole("heading").textContent).toMatch(/Welcome to The Mart Cart!/i);
        expect(screen.queryByRole("button").textContent).toMatch(/Enter/i);
        // screen.debug();
    });
})

