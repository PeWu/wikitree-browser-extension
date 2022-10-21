import { jest } from "@jest/globals";
import chrome from "sinon-chrome";

// Mock out draggable because it misbehaves in tests.
jest.mock("jquery-ui/ui/widgets/draggable", () => ({}));

// Add chrome to window because jsdom doesn't provide it.
window.chrome = chrome;

// Add matchMedia function to window.
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation(() => ({ matches: false })),
});
