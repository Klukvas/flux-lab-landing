import { fireEvent, render, screen, within } from "@testing-library/react";
import type { ComponentProps } from "react";
import { NextIntlClientProvider, useLocale } from "next-intl";
import { describe, expect, it, vi } from "vitest";
import { StudioHome } from "./studio-home";

vi.mock("@/i18n/navigation", () => ({
  Link: ({ href, ...props }: ComponentProps<"a">) => (
    <a href={`/${useLocale()}${href}`} {...props} />
  ),
}));

vi.mock("./dot-statement", () => ({
  DotStatement: () => <div role="img" aria-label="We can make it happen" />,
}));

function renderHome(locale: "en" | "uk") {
  return render(
    <NextIntlClientProvider locale={locale} messages={{}}>
      <StudioHome locale={locale} />
    </NextIntlClientProvider>,
  );
}

function assertStaticPreview(panel: HTMLElement) {
  const figure = panel.querySelector("figure");
  expect(figure?.querySelector("figcaption")?.textContent).toMatch(
    /Example|Sample/,
  );
  expect(figure?.querySelectorAll("button,input,select,a")).toHaveLength(0);
}

describe("studio homepage", () => {
  it("keeps seven manual tabs and renders only the selected workflow preview", () => {
    const { container } = renderHome("en");
    const tabs = within(
      screen.getByRole("tablist", { name: "Products by FluxLab" }),
    ).getAllByRole("tab");
    expect(tabs).toHaveLength(7);
    for (const tab of tabs)
      expect(
        container.querySelector(`#${tab.getAttribute("aria-controls")}`),
      ).toBeTruthy();
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(container.querySelectorAll("figure")).toHaveLength(1);
    assertStaticPreview(screen.getByRole("tabpanel"));
    fireEvent.click(screen.getByRole("tab", { name: /WashFlow/ }));
    const panel = screen.getByRole("tabpanel");
    expect(
      within(panel).getByRole("heading", { name: "WashFlow" }),
    ).toBeInTheDocument();
    expect(
      within(panel).getByRole("link", { name: "View product" }),
    ).toHaveAttribute("href", "/en/projects/washflow");
    expect(container.querySelectorAll("figure")).toHaveLength(1);
    assertStaticPreview(panel);
    expect(screen.queryByText("Accounting")).not.toBeInTheDocument();
  });

  it("supports arrow, Home and End navigation without autoplay or an invented development UI", () => {
    renderHome("en");
    const first = screen.getByRole("tab", { name: /FluxRadar/ });
    first.focus();
    fireEvent.keyDown(first, { key: "ArrowRight" });
    const wash = screen.getByRole("tab", { name: /WashFlow/ });
    expect(wash).toHaveFocus();
    expect(wash).toHaveAttribute("aria-selected", "true");
    fireEvent.keyDown(wash, { key: "End" });
    const development = screen.getByRole("tab", {
      name: /EFluxCom In development/,
    });
    expect(development).toHaveFocus();
    expect(screen.getByRole("tabpanel").querySelector("figure")).toBeNull();
    expect(
      within(screen.getByRole("tabpanel")).queryByRole("link"),
    ).not.toBeInTheDocument();
    fireEvent.keyDown(development, { key: "ArrowRight" });
    expect(first).toHaveFocus();
    fireEvent.keyDown(first, { key: "ArrowLeft" });
    expect(development).toHaveFocus();
    fireEvent.keyDown(development, { key: "Home" });
    expect(first).toHaveFocus();
  });

  it("preserves all six workflow previews through selection and translates statuses", () => {
    const { container } = renderHome("en");
    for (const name of [
      "FluxRadar",
      "WashFlow",
      "Cursopus",
      "AutoFlow",
      "Market",
      "LifeSpan",
    ]) {
      fireEvent.click(screen.getByRole("tab", { name: new RegExp(name) }));
      expect(container.querySelectorAll("figure")).toHaveLength(1);
      assertStaticPreview(screen.getByRole("tabpanel"));
    }
  });

  it("renders Ukrainian product statuses and the complete launch-to-support process", () => {
    renderHome("uk");
    expect(
      screen.getByRole("tab", { name: "LifeSpan Бета" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("tab", { name: "EFluxCom У розробці" }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "MVP за 8 тижнів" }),
    ).toBeInTheDocument();
    expect(screen.getByText("З 9-го тижня")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Обговорити проєкт" }),
    ).toHaveAttribute("href", "/uk/contact");
  });
});
