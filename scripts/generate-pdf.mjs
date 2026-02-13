import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your built HTML
const htmlPath = path.resolve(__dirname, "../dist/index.html");

// Output PDF path
const outputPath = path.resolve(__dirname, "../dist/cv.pdf");

async function generatePDF() {
  const browser = await puppeteer.launch({
    headless: "new",
  });

  const page = await browser.newPage();

  // Load your built static file
  await page.goto(`file://${htmlPath}`, {
    waitUntil: "networkidle0",
  });

  // Wait for fonts to load completely
  await page.evaluateHandle("document.fonts.ready");

  await page.pdf({
    path: outputPath,
    format: "A4",
    printBackground: true,   // required for dark header
    preferCSSPageSize: true, // respects your @page size
  });

  await browser.close();

  console.log("PDF generated at:", outputPath);
}

generatePDF();