const { test, expect } = require("@playwright/test");

test.describe("UI Components Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });
  test("has title", async ({ page }) => {
    await expect(page).toHaveTitle(/Simple Budget Planner/);
  });

  test("has a add transaction button", async ({ page }) => {
    await expect(page.locator("#modalTrigger")).toBeVisible();
  });
});

test.describe("Simple Budget Planner - Transaction Tests", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:3000");
  });

  test("should add an income transaction and update the balance and income", async ({
    page,
  }) => {
    await page.click("#modalTrigger");

    await expect(page.locator("#modal1")).toBeVisible();

    await page.locator("#modal1").getByText("Income").click();
    await page.fill("#value", "500");
    await page.fill("#notes", "Freelance Job");

    await page.click("#addTransactionBtn");

    await expect(page.locator("#modal1")).not.toBeVisible();

    await expect(page.locator("#recordsList")).toContainText("Freelance Job");
    await expect(page.locator("#recordsList")).toContainText("$ 500");

    await expect(page.locator("#balance")).toContainText("$500.00");
    await expect(page.locator("#income")).toContainText("$500.00");
  });

  test("should add an expense transaction and update the balance and expense", async ({
    page,
  }) => {
    await page.click("#modalTrigger");

    await expect(page.locator("#modal1")).toBeVisible();

    await page.locator("#modal1").getByText("Expense").click();

    await page.fill("#value", "200");
    await page.fill("#notes", "Groceries");

    await page.click("#addTransactionBtn");

    await expect(page.locator("#modal1")).not.toBeVisible();

    await expect(page.locator("#recordsList")).toContainText("Groceries");
    await expect(page.locator("#recordsList")).toContainText("$ 200");

    await expect(page.locator("#balance")).toContainText("$300.00");
    await expect(page.locator("#expense")).toContainText("$200.00");
  });
});
