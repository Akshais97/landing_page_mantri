import subprocess
import sys
import time
from contextlib import suppress
from pathlib import Path
from urllib.request import urlopen

from selenium import webdriver
from selenium.common.exceptions import WebDriverException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


ROOT = Path(__file__).resolve().parents[1]
BASE_URL = "http://127.0.0.1:3000/"


def wait_for_server(timeout=30):
  deadline = time.time() + timeout
  while time.time() < deadline:
    with suppress(Exception):
      with urlopen(BASE_URL, timeout=1) as response:
        if response.status < 500:
          return True
    time.sleep(0.5)
  return False


def start_server_if_needed():
  if wait_for_server(timeout=2):
    return None

  process = subprocess.Popen(
    ["npm", "run", "dev"],
    cwd=ROOT,
    stdout=subprocess.PIPE,
    stderr=subprocess.STDOUT,
    text=True,
  )

  if not wait_for_server(timeout=45):
    if process.stdout:
      print(process.stdout.read(), file=sys.stderr)
    process.terminate()
    raise RuntimeError("Vite dev server did not start on port 3000.")

  return process


def create_driver():
  errors = []

  with suppress(Exception):
    options = webdriver.ChromeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=1440,1200")
    return webdriver.Chrome(options=options)

  try:
    options = webdriver.EdgeOptions()
    options.add_argument("--headless=new")
    options.add_argument("--window-size=1440,1200")
    return webdriver.Edge(options=options)
  except WebDriverException as exc:
    errors.append(str(exc))

  raise RuntimeError("No Selenium-compatible Chrome or Edge browser available.\n" + "\n".join(errors))


def first_visible(wait, css_selector, root=None):
  search_root = root
  elements = wait.until(lambda driver: (search_root or driver).find_elements(By.CSS_SELECTOR, css_selector))
  for element in elements:
    if element.is_displayed() and element.is_enabled():
      return element
  raise AssertionError(f"No visible enabled element found: {css_selector}")


def visible_form_with_email(wait):
  def find_form(driver):
    for form in driver.find_elements(By.CSS_SELECTOR, "form"):
      if not form.is_displayed():
        continue
      email_fields = form.find_elements(By.CSS_SELECTOR, 'input[type="email"]')
      if email_fields and email_fields[0].is_displayed():
        return form
    return False

  return wait.until(find_form)


def main():
  server = start_server_if_needed()
  driver = create_driver()

  try:
    wait = WebDriverWait(driver, 20)
    driver.get(BASE_URL)
    driver.get(BASE_URL + "#final-form")

    form = visible_form_with_email(wait)
    first_visible(wait, 'input[placeholder="Enter your name"]', form).send_keys("Selenium Legend Test")
    first_visible(wait, 'input[placeholder="+91 98765 43210"]', form).send_keys("+91 98765 43210")
    first_visible(wait, 'input[type="email"]', form).send_keys("selenium.legend@example.com")

    consent = first_visible(wait, 'input[type="checkbox"]', form)
    if not consent.is_selected():
      consent.click()

    submit = first_visible(wait, 'button[type="submit"]', form)
    driver.execute_script("arguments[0].scrollIntoView({ block: 'center' });", submit)
    driver.execute_script("arguments[0].click();", submit)

    wait.until(EC.visibility_of_element_located((By.XPATH, "//*[contains(., 'RESERVATION REQUEST RECEIVED')]")))
    print("Selenium form submit passed.")
  finally:
    driver.quit()
    if server:
      server.terminate()
      with suppress(Exception):
        server.wait(timeout=5)


if __name__ == "__main__":
  main()
