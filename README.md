# Cachebuster
Purge files that have changed from your website's Cloudflare cache!

Unlike similar actions, this only purges the cache for files that have been changed/added/removed. Which is probably what you want.

To use this, [create a Cloudflare API Token](https://support.cloudflare.com/hc/en-us/articles/200167836-Managing-API-Tokens-and-Keys#12345680) with the "Zone: Cache Purge" permission. Then, [get your Cloudflare Zone ID](https://community.cloudflare.com/t/how-to-find-cloudflare-zone-id-to-configure-it-with-wp-rocket/83131), and add these both to your Github project settings.

Create a file with the following contents in `.github/workflows/cachebuster.yml` inside your repo:

```
name: Cachebuster

on:
  push:
    branches: [ master ]

jobs:
  bust-cache:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout repo
      uses: actions/checkout@v2
      with:
        fetch-depth: 0

    - name: Run cachebuster
      uses: cyrusroshan/cachebuster@master
      with:
        # Replace with the base URL this repo is published to
        url-prefix: 'https://cyrusroshan.com/'
        zone-id: ${{ secrets.CLOUDFLAREZONEID }}
        api-token: ${{ secrets.CLOUDFLAREAPITOKEN }}
```