import { test, expect } from '@playwright/test';
import { bookingPage } from '../page/bookingPage';

test('valid mighty booking should show available bookings @smoke', async ({ page, baseURL }) => {
  const booking = new bookingPage(page);
  await booking.goto(baseURL);
  await booking.getValidBooking();
});

test.skip('invalid mighty booking should show no booking @smoke', async ({ page }) => {
// to do
});


