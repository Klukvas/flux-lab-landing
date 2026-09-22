import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ThemeToggle } from "./theme-toggle";

const themeState = vi.hoisted(() => ({
  theme: "system",
  resolvedTheme: "dark",
  setTheme: vi.fn(),
}));

vi.mock("next-themes", () => ({ useTheme: () => themeState }));

describe("ThemeToggle", () => {
  beforeEach(() => {
    themeState.setTheme.mockClear();
  });

  it("offers light mode when the system setting makes the page dark", () => {
    themeState.resolvedTheme = "dark";
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: "Switch to light mode" }));

    expect(themeState.setTheme).toHaveBeenCalledWith("light");
  });

  it("offers dark mode when the system setting makes the page light", () => {
    themeState.resolvedTheme = "light";
    render(<ThemeToggle />);

    fireEvent.click(screen.getByRole("button", { name: "Switch to dark mode" }));

    expect(themeState.setTheme).toHaveBeenCalledWith("dark");
  });
});
