import puppeteer from "puppeteer";
import path from "path";
import { fileURLToPath } from "url";
import { promises as fs } from "fs";
import dayjs from "dayjs";
import minimist from "minimist";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Path to your built HTML
const htmlPath = path.resolve(__dirname, "../dist/index.html");

// Output PDF path
const pdfDir = path.resolve(__dirname, "../dist/pdf");

// turn "Game Developer" into "Game_Developer" etc
function slug(s) {
  return String(s)
    .trim()
    .replace(/\s+/g, "_")
    .replace(/[^A-Za-z0-9_-]/g, "");
}

async function clearDir(dirPath) {
  await fs.rm(dirPath, { recursive: true, force: true });
  await fs.mkdir(dirPath, { recursive: true });
}

// passed arguments
const argv = minimist(process.argv.slice(2), {
  string: ["role"],
  boolean: ["with_date"],
  default: {
    role: "",
    with_date: false,
  },
});

const role = argv.role?.trim() ? slug(argv.role) : "";
const withDate = Boolean(argv.with_date);

async function generatePDF() {
  await clearDir(pdfDir);

  const suffix = "CV_Poklonskyi";
  const stamp = dayjs().format("YYYY_MM_DD");

  // decide on the filename
  let filename;
  if (withDate && role) {
    filename = `${suffix}_${role}_${stamp}.pdf`;
  } else if (withDate) {
    filename = `${suffix}_${stamp}.pdf`;
  } else if (role) {
    filename = `${suffix}_${role}.pdf`;
  } else {
    filename = `${suffix}.pdf`;
  }

  const outputPath = path.join(pdfDir, filename)

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