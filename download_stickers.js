const fs = require('fs');
const path = require('path');
const https = require('https');

const TOKEN = "***REDACTED***";
const PACK_NAME = "pphat";

async function fetchJson(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(JSON.parse(data)));
    }).on('error', reject);
  });
}

async function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function main() {
  console.log(`Fetching sticker set ${PACK_NAME}...`);
  const setRes = await fetchJson(`https://api.telegram.org/bot${TOKEN}/getStickerSet?name=${PACK_NAME}`);
  
  if (!setRes.ok) {
    console.error("Failed to fetch sticker set:", setRes);
    return;
  }
  
  const stickers = setRes.result.stickers;
  console.log(`Found ${stickers.length} stickers.`);
  
  const dir = path.join(__dirname, 'public', 'stickers', PACK_NAME);
  fs.mkdirSync(dir, { recursive: true });
  
  const stickerData = [];
  
  // Download up to 24 stickers
  for (let i = 0; i < Math.min(stickers.length, 24); i++) {
    const sticker = stickers[i];
    const fileRes = await fetchJson(`https://api.telegram.org/bot${TOKEN}/getFile?file_id=${sticker.file_id}`);
    
    if (!fileRes.ok) continue;
    
    const filePath = fileRes.result.file_path;
    const url = `https://api.telegram.org/file/bot${TOKEN}/${filePath}`;
    
    const ext = path.extname(filePath) || '.webp';
    const filename = `${i}${ext}`;
    const dest = path.join(dir, filename);
    
    console.log(`Downloading ${filename}...`);
    await downloadFile(url, dest);
    
    stickerData.push({
      src: `/stickers/${PACK_NAME}/${filename}`,
      name: `${PACK_NAME} ${sticker.emoji || ''}`.trim()
    });
  }
  
  console.log("Sticker data array:");
  console.log(JSON.stringify(stickerData, null, 2));
}

main().catch(console.error);
