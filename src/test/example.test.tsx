import { describe, it, expect } from "vitest";
import React from "react";
import { renderToString } from "react-dom/server";
import { HelmetProvider } from "react-helmet-async";
import App from "../App";

describe("App rendering", () => {
  it("should render App without throwing", () => {
    const helmetContext = {};
    const html = renderToString(
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    );
    expect(html).toContain("Fortal Auto");
    expect(html.length).toBeGreaterThan(100);
  });

  it("should render Veiculos page without throwing", async () => {
    window.location.hash = "#/veiculos";
    const helmetContext = {};
    const html = renderToString(
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    );
    expect(html).toContain("Veículos");
  });

  it("should render Vendidos page without throwing", async () => {
    window.location.hash = "#/vendidos";
    const helmetContext = {};
    const html = renderToString(
      <HelmetProvider context={helmetContext}>
        <App />
      </HelmetProvider>
    );
    expect(html).toContain("Vendidos");
  });

  it("should mount App on client-side createRoot without throwing", async () => {
    const { createRoot } = await import("react-dom/client");
    const container = document.createElement("div");
    document.body.appendChild(container);
    const root = createRoot(container);
    root.render(
      <HelmetProvider context={{}}>
        <App />
      </HelmetProvider>
    );
    // wait a tick
    await new Promise((r) => setTimeout(r, 100));
    expect(container.innerHTML.length).toBeGreaterThan(100);
    expect(container.innerHTML).toContain("Fortal Auto");
  });
});

