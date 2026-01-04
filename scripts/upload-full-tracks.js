const { put } = require('@vercel/blob');
const fs = require('fs');
const path = require('path');
const { sql } = require('@vercel/postgres');

require('dotenv').config({ path: '.env.local' });

// Your tracks to upload
const tracks = [
  { file: 'A CUERPO COBARDE FINAL.mp3', trackId: 1 },
  { file: 'ANACAONA FINAL.mp3', trackId: 2 },
  { file: 'LA QUIERO Y QUE FINAL.mp3', trackId: 3 },
  { file: 'PA ORIENTE FINAL.mp3', trackId: 4 },
];

async function uploadTrack(fileName, trackId) {
  try {
    const filePath = path.join('./music-files/full-tracks', fileName);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File not found: ${fileName}`);
      return null;
    }

    console.log(`\n📤 Uploading: ${fileName}`);
    
    const fileBuffer = fs.readFileSync(filePath);
    const stats = fs.statSync(filePath);
    const fileSizeMB = (stats.size / (1024 * 1024)).toFixed(2);
    
    console.log(`   File size: ${fileSizeMB} MB`);
    
    const blob = await put(
      `music/full-tracks/${fileName}`,
      fileBuffer,
      {
        access: 'public',
        contentType: 'audio/mpeg',
      }
    );
    
    console.log(`   ✅ Uploaded to: ${blob.url}`);
    
    // Update database
    await sql`
      UPDATE music_tracks
      SET full_track_blob_url = ${blob.url}
      WHERE id = ${trackId}
    `;
    
    console.log(`   ✅ Database updated for track #${trackId}`);
    
    return blob.url;
  } catch (error) {
    console.error(`   ❌ Error uploading ${fileName}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('═══════════════════════════════════════════════════');
  console.log('📤  SON2 LATIN MUSIC - Full Track Uploader');
  console.log('═══════════════════════════════════════════════════\n');
  
  let successCount = 0;
  
  for (const track of tracks) {
    const result = await uploadTrack(track.file, track.trackId);
    if (result) successCount++;
  }
  
  console.log('\n═══════════════════════════════════════════════════');
  console.log(`✅ Successfully uploaded ${successCount}/${tracks.length} tracks`);
  console.log('═══════════════════════════════════════════════════\n');
  
  process.exit(0);
}

main();