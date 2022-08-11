import { expect, Locator, Page  } from '@playwright/test';
import { path } from '../path/path';

export class bookingPage {
  readonly page: Page;
  readonly SearchHeader: Locator;
  readonly resultsTag: Locator;
  readonly pickUpDate: Locator;
  readonly dropOffDate: Locator;
  readonly pickupLocation: Locator;
  readonly dropoffLocation: Locator;
  readonly driversLicenseCountry: Locator;
  readonly adultsNumber: Locator;
  readonly childrenNumber: Locator;
  readonly location1: Locator;
  readonly location2: Locator;
  readonly driversLicenseCountryData: Locator;
  readonly numberData: Locator;
  readonly numberData2: Locator;
  readonly promoCode: Locator;

  constructor(page: Page ) {
    this.page = page;
    // this.url = url;
    this.SearchHeader = page.locator('text=Search Campers');
    this.resultsTag = page.locator("text=0 Results >> nth=0");
  
    this.pickUpDate = page.locator('[name=pickupDate]');
    this.dropOffDate = page.locator('[name=dropoffDate]');
    this.pickupLocation = page.locator('#select-pickupLocation');
    this.dropoffLocation = page.locator('#select-dropoffLocation');
    this.driversLicenseCountry = page.locator('span#select-driversLicense');
    this.adultsNumber = page.locator('span#select-adults');
    this.childrenNumber = page.locator('span#select-children');
  
    this.location1 = page.locator("text=Auckland Airport >> nth=0");
    this.location2 = page.locator("text=Auckland Airport >> nth=1");
    this.driversLicenseCountryData = page.locator("text=Australia >> nth=0");
    this.numberData = page.locator("text=2 >> nth=0");
    this.numberData2 = page.locator("text=2 >> nth=1");
  
    this.promoCode = page.locator('[name=promoCode]');
  }

  async goto(url) {
    await this.page.goto(`${url}/${path.bookingSearch}`, {waitUntil:'domcontentloaded'});
    await expect(this.page).toHaveTitle(/Mighty/);
    await expect(this.SearchHeader).toBeVisible();
  }

  async getValidBooking() {

    await this.page.fill('[name=pickupDate]', '');
    await this.pickUpDate.fill("01/09/2023");//todo: update to date dynamically
    await this.page.fill('[name=dropoffDate]', '');
    await this.dropOffDate.fill("30/09/2023");//todo: update to date dynamically
    
    await this.pickupLocation.click();
    await this.location1.click();
    await this.location2.click();

    await this.driversLicenseCountryData.click();

    await this.adultsNumber.click();
    await this.numberData.click();
    await this.childrenNumber.click();
    await this.numberData2.click();

    await this.promoCode.type("0630");
  
    await this.page.locator('button:has-text("Search Campers")').click();
  
    await expect(this.resultsTag).not.toBeVisible();
    // add more check points

  }
}