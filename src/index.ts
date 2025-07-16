import puppeteer from "puppeteer-extra";
import { Browser } from "puppeteer";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

interface LaunchBrowserOptions {
  isPi?: boolean;
  headless?: "new" | false;
  proxy?: {
    host: string;
    port: number;
    username?: string;
    password?: string;
  };
}

async function launchBrowser({
  isPi = false,
  headless = "new",
  proxy,
}: LaunchBrowserOptions = {}): Promise<Browser> {
  const args = [
    "--start-maximized",
    "--no-sandbox",
    "--disable-setuid-sandbox",
    "--disable-infobars",
    "--disable-dev-shm-usage",
    "--disable-gpu",
  ];

  // Add proxy server if provided
  if (proxy?.host && proxy.port) {
    args.push(`--proxy-server=http://${proxy.host}:${proxy.port}`);
  }

  const launchOptions: any = {
    headless,
    defaultViewport: null,
    args,
  };

  // Raspberry Pi override
  if (isPi) {
    launchOptions.executablePath = "/usr/bin/chromium-browser";
  }

  const browser = await puppeteer.launch(launchOptions);

  if (proxy?.username && proxy?.password) {
    // Authenticate new pages
    browser.on("targetcreated", async target => {
      try {
        const page = await target.page();
        if (page) {
          await page.authenticate({
            username: proxy.username!,
            password: proxy.password!,
          });
        }
      } catch (err) {
        console.error("Error authenticating on new page:", err);
      }
    });

    // Authenticate existing pages
    const pages = await browser.pages();
    for (const page of pages) {
      await page.authenticate({
        username: proxy.username!,
        password: proxy.password!,
      });
    }
  }

  return browser;
}

async function main() {
  // Example proxy string
  const proxyString = "host:port:username:password";
  const [host, port, username, password] = proxyString.split(":");

  const browser = await launchBrowser({
    headless: false,
    proxy: {
      host,
      port: Number(port),
      username,
      password,
    },
  });

  const page = await browser.newPage();
  await page.goto("https://httpbin.org/ip");

  console.log(await page.content());

  await browser.close();
}

main().catch(console.error);
