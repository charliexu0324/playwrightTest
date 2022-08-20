import { expect, Locator, Page } from "@playwright/test";
import dayjs from "dayjs";
import { path } from "../path/pathData";

var customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

export class bookingPage {
  readonly page: Page;
  readonly nullResultsTag: Locator;
  readonly pickUpDate: Locator;
  readonly dropOffDate: Locator;
  readonly pickupLocation: Locator;
  readonly dropoffLocation: Locator;
  readonly driversLicenseCountry: Locator;
  readonly adultsNumber: Locator;
  readonly childrenNumber: Locator;
  readonly pickupLocationData: Locator;
  readonly dropoffLocationData: Locator;
  readonly driversLicenseCountryData: Locator;
  readonly numberData: Locator;
  readonly numberData2: Locator;
  readonly promoCode: Locator;
  readonly searchButton: Locator;
  readonly resultTableTitleSleep: Locator;

  constructor(page: Page) {
    this.page = page;

    this.nullResultsTag = page.locator("text=0 Results >> nth=1");

    this.pickUpDate = page.locator("[name=pickupDate]");
    this.dropOffDate = page.locator("[name=dropoffDate]");
    this.pickupLocation = page.locator("#select-pickupLocation");
    this.dropoffLocation = page.locator("#select-dropoffLocation");
    this.driversLicenseCountry = page.locator("#select-driversLicense");
    this.adultsNumber = page.locator("#select-adults");
    this.childrenNumber = page.locator("#select-children");

    this.pickupLocationData = page.locator("text=Auckland Airport >> nth=0");
    this.dropoffLocationData = page.locator("text=Auckland Airport >> nth=1");
    this.driversLicenseCountryData = page.locator("text=Australia >> nth=0");
    this.numberData = page.locator("text=2 >> nth=0");
    this.numberData2 = page.locator("text=2 >> nth=1");

    this.promoCode = page.locator("[name=promoCode]");
    this.searchButton = page.locator('button:has-text("Search Campers")');

    this.resultTableTitleSleep = page.locator("text=Sleeps >> nth=1");
  }

  async goto(url) {
    await this.page.goto(`${url}${path.bookingSearch}`, {
      waitUntil: "domcontentloaded",
    });
    await expect(this.page).toHaveTitle(/Mighty/);
    await expect(this.searchButton).toBeVisible();
  }

  async setUpDate(fromMonth = 1, ToMonth = 2) {
    const pickUpDateString = dayjs()
      .add(fromMonth, "month")
      .format("DD/MM/YYYY")
      .toString()
      .substring(0, 10);

    const dropOffDateString = dayjs()
      .add(ToMonth, "month")
      .format("DD/MM/YYYY")
      .toString()
      .substring(0, 10);

    return { pickUpDateString, dropOffDateString };
  }

  async bookingFlow(pickUpDateString, dropOffDateString) {
    await this.page.fill("[name=pickupDate]", "");
    await this.pickUpDate.fill(pickUpDateString);
    await this.page.fill("[name=dropoffDate]", "");
    await this.dropOffDate.fill(dropOffDateString);

    await this.pickupLocation.click();
    await this.pickupLocationData.click();
    await this.dropoffLocationData.click();

    await this.driversLicenseCountryData.click();

    await this.adultsNumber.click();
    await this.numberData.click();
    await this.childrenNumber.click();
    await this.numberData2.click();

    await this.promoCode.type("0630");

    await expect(this.searchButton).not.toBeDisabled();
    await this.searchButton.click();
  }

  async getValidBooking() {
    const dateObject = await this.setUpDate();
    const pickUpDateString = dateObject.pickUpDateString;
    const dropOffDateString = dateObject.dropOffDateString;
    await this.bookingFlow(pickUpDateString, dropOffDateString);
    await this.page.waitForLoadState();
    await expect(this.nullResultsTag).not.toBeVisible();
    await expect(this.resultTableTitleSleep).toBeVisible();
  }

  async getInvalidBooking() {
    const dateObject = await this.setUpDate(98, 99);
    const pickUpDateString = dateObject.pickUpDateString;
    const dropOffDateString = dateObject.dropOffDateString;
    await this.bookingFlow(pickUpDateString, dropOffDateString);
    await this.page.waitForLoadState();
    await expect(this.nullResultsTag).toBeVisible();
    await expect(this.resultTableTitleSleep).toBeVisible();
  }
}
