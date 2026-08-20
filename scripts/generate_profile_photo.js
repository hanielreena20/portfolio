import fs from 'fs';
import path from 'path';

// Script to ensure public/assets/haniel-reena.jpg and public/assets/profile-photo.jpg exist
const publicAssetsDir = path.resolve('public/assets');
const srcAssetsDir = path.resolve('src/assets');

if (!fs.existsSync(publicAssetsDir)) {
  fs.mkdirSync(publicAssetsDir, { recursive: true });
}

// Ensure the real profile photo is present in public/assets
const targetPhoto = path.join(publicAssetsDir, 'haniel-reena.jpg');
const fallbackPhoto = path.join(publicAssetsDir, 'profile-photo.jpg');
const srcPhoto = path.join(srcAssetsDir, 'haniel-reena.jpg');

if (!fs.existsSync(targetPhoto) && fs.existsSync(srcPhoto)) {
  fs.copyFileSync(srcPhoto, targetPhoto);
}
if (!fs.existsSync(fallbackPhoto) && fs.existsSync(targetPhoto)) {
  fs.copyFileSync(targetPhoto, fallbackPhoto);
}

// Clean up any legacy SVG character files
const legacySvg = path.join(publicAssetsDir, 'profile-photo.svg');
if (fs.existsSync(legacySvg)) {
  fs.unlinkSync(legacySvg);
}

console.log('Profile photo assets verified.');

