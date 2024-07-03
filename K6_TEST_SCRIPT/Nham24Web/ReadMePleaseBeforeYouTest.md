# Please read this!

- i could not auto generate auth for test to run k6 nham24.com due to the website is currently using cloudflare to check bot and playwright couldn't do that.
---
- Now if you wish to run this please read bellow

---

1. Login website nham24 staging manually
2. Naviagte to `inspect` -> `network` -> `check request and copy the auth`
3. Copy it and paste the auth to the file `/Users/salduong/Desktop/kdm/v3-playwright/tests/K6/Nham24Web/cookie_and_token/Nham24WebCookies_and_tokens.js`
4. Now you can run the k6 code of nham24.com staging.