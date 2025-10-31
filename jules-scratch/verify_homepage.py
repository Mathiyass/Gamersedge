import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("http://localhost:8000")
        await page.wait_for_selector('#new-arrivals-grid')

        # Check initial cart count
        initial_cart_count = await page.locator('#cart-count').text_content()
        print(f"Initial cart count: {initial_cart_count}")

        # Click the first 'add to cart' button
        await page.locator('.add-to-cart').first.click()

        # Wait for the cart count to update
        await page.wait_for_function("document.getElementById('cart-count').textContent === '1'")

        updated_cart_count = await page.locator('#cart-count').text_content()
        print(f"Updated cart count: {updated_cart_count}")

        await page.screenshot(path="jules-scratch/homepage_after_cart.png", full_page=True)
        await browser.close()

asyncio.run(main())