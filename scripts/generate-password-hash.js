const bcrypt = require('bcryptjs');

// ========================================
// CHANGE THESE VALUES:
// ========================================
const newUsername = 'fusionoriginal';              // Your username
const newPassword = 'FjmdCtbm#2008'; // ⚠️ CHANGE THIS!
const newEmail = 'son2latinmusic@gmail.com';
const newName = 'Francisco Moreno';
// ========================================

async function generateSQL() {
  console.log('🔐 Generating password hash...\n');
  
  const passwordHash = await bcrypt.hash(newPassword, 10);
  
  console.log('✅ Hash generated!\n');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('Copy and run this SQL in your Neon database console:');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  
  const sql = `UPDATE admin_users
SET 
  username = '${newUsername}',
  password_hash = '${passwordHash}',
  email = '${newEmail}',
  name = '${newName}'
WHERE username = 'francisco'
RETURNING id, username, email, name;`;
  
  console.log(sql);
  console.log('\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  console.log('After running the SQL, your new credentials will be:');
  console.log('Username:', newUsername);
  console.log('Password:', newPassword);
  console.log('\n✅ Login at: http://localhost:3000/admin/login');
  console.log('✅ Or: https://son2-latin-music.vercel.app/admin/login\n');
}

generateSQL();