from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context()
    page = context.new_page()

    # Navigate to the local server
    page.goto("http://localhost:8000")

    # Wait for the "New Arrivals" grid to be populated
    expect(page.locator("#new-arrivals-grid")).to_be_visible(timeout=10000)

    # Scroll to the bottom of the page to ensure all content is loaded
    page.evaluate("window.scrollTo(0, document.body.scrollHeight)")

    # Take a screenshot of the full page
    page.screenshot(path="jules-scratch/verification/homepage.png", full_page=True)

    browser.close()

with sync_playwright() as playwright:
    run(playwright)