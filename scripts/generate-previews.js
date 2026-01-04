const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
  inputFolder: './music-files/full-tracks',     // Where your full MP3s are
  outputFolder: './public/music/previews',      // Where previews will be saved
  previewDuration: 60,                          // Preview length in seconds
  startTime: 30,                                // Start preview at 30 seconds into the song
  bitrate: '128k',                              // Lower quality for previews (128kbps)
};

// Create output folder if it doesn't exist
if (!fs.existsSync(config.outputFolder)) {
  fs.mkdirSync(config.outputFolder, { recursive: true });
  console.log(`✅ Created folder: ${config.outputFolder}`);
}

function generatePreview(inputFile) {
  const fileName = path.basename(inputFile, path.extname(inputFile));
  const outputFile = path.join(config.outputFolder, `${fileName}-preview.mp3`);

  console.log(`\n🎵 Processing: ${fileName}`);
  console.log(`   Input: ${inputFile}`);
  console.log(`   Output: ${outputFile}`);

  try {
    // FFmpeg command to extract 60 seconds starting at 30 seconds
    const command = `ffmpeg -y -i "${inputFile}" -ss ${config.startTime} -t ${config.previewDuration} -ab ${config.bitrate} "${outputFile}"`;
    
    console.log(`   Extracting ${config.previewDuration}s from ${config.startTime}s mark...`);
    execSync(command, { stdio: 'ignore' });
    
    const stats = fs.statSync(outputFile);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`   ✅ Created preview: ${fileSizeMB} MB`);
    return outputFile;
  } catch (error) {
    console.error(`   ❌ Error processing ${fileName}:`, error.message);
    return null;
  }
}

function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('🎵  SON2 LATIN MUSIC - Preview Generator');
  console.log('═══════════════════════════════════════════════════\n');

  // Check if input folder exists
  if (!fs.existsSync(config.inputFolder)) {
    console.error(`❌ Input folder not found: ${config.inputFolder}`);
    console.log(`\nPlease create the folder and add your full MP3 tracks there.`);
    console.log(`Example: music-files/full-tracks/my-song.mp3\n`);
    return;
  }

  // Get all MP3 files from input folder
  const files = fs.readdirSync(config.inputFolder)
    .filter(file => file.toLowerCase().endsWith('.mp3'))
    .map(file => path.join(config.inputFolder, file));

  if (files.length === 0) {
    console.log(`❌ No MP3 files found in: ${config.inputFolder}`);
    console.log(`\nPlease add your full MP3 tracks to that folder and run again.\n`);
    return;
  }

  console.log(`Found ${files.length} track(s) to process\n`);
  console.log(`Settings:`);
  console.log(`  - Preview duration: ${config.previewDuration} seconds`);
  console.log(`  - Start time: ${config.startTime} seconds`);
  console.log(`  - Bitrate: ${config.bitrate}\n`);

  let successCount = 0;
  files.forEach(file => {
    const result = generatePreview(file);
    if (result) successCount++;
  });

  console.log('\n═══════════════════════════════════════════════════');
  console.log(`✅ Successfully created ${successCount}/${files.length} previews`);
  console.log(`📁 Preview files saved to: ${config.outputFolder}`);
  console.log('═══════════════════════════════════════════════════\n');
  
  if (successCount > 0) {
    console.log('Next steps:');
    console.log('1. Check the preview files in public/music/previews/');
    console.log('2. Add tracks to database (I can help with SQL!)');
    console.log('3. Upload full tracks to Vercel Blob');
    console.log('4. Test your music store!\n');
  }
}

main();
