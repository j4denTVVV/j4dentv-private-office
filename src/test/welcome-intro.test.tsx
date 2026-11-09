import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { WelcomeIntro, WELCOME_INTRO_KEY } from "@/components/site/WelcomeIntro";

describe("visitor welcome intro", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.useFakeTimers();
    document.body.style.overflow = "auto";
  });
  afterEach(() => {
    cleanup();
    vi.useRealTimers();
    vi.restoreAllMocks();
  });
  it("plays only once per browser session", () => {
    const first = render(<WelcomeIntro />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(sessionStorage.getItem(WELCOME_INTRO_KEY)).toBe("1");
    first.unmount();
    render(<WelcomeIntro />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
  it("instantly skips on a tap and restores scrolling", () => {
    render(<WelcomeIntro />);
    expect(document.body.style.overflow).toBe("hidden");
    fireEvent.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("auto");
  });
  it("exits at 2.9 seconds and clears after the 0.7 second transition", () => {
    render(<WelcomeIntro />);
    act(() => { vi.advanceTimersByTime(2900); });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    act(() => { vi.advanceTimersByTime(700); });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("auto");
  });
  it("bypasses the sequence when reduced motion is requested", () => {
    const original = window.matchMedia;
    vi.spyOn(window, "matchMedia").mockImplementation(query => ({ ...original(query), matches: true }));
    render(<WelcomeIntro />);
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(document.body.style.overflow).toBe("auto");
  });
  it("supports immediate keyboard dismissal", () => {
    render(<WelcomeIntro />);
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});