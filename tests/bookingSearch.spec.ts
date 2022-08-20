import { test, expect } from "@playwright/test";
import { bookingPage } from "../page/bookingPage";

test("valid mighty booking should show available bookings @smoke", async ({
  page,
  baseURL,
}) => {
  const booking = new bookingPage(page);
  await booking.goto(baseURL);
  await booking.getValidBooking();
});

test("invalid mighty booking should show no booking @smoke", async ({
  page,
  baseURL,
}) => {
  const booking = new bookingPage(page);
  await booking.goto(baseURL);
  await booking.getInvalidBooking();
  // Bug: No error handling in FE.
  // When Time range is too far away from now, BE will throw 400 error,
  // But FE will show a blank page as a search result, no error or hint.
});
