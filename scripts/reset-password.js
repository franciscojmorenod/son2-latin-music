const bcrypt = require('bcryptjs');
const { sql } = require('@vercel/postgres');

async function resetAdmin() {
  // ========================================
  // CHANGE THESE VALUES:
  // ========================================
  const currentUsername = 'francisco';          // ✅ Your current username
  const newUsername = 'fusionoriginal';              // Keep same OR change to new username
  const newPassword = 'FjmdCtbm#2008'; // ⚠️ CHANGE THIS!
  const newEmail = 'son2latinmusic@gmail.com';  // Your email
  const newName = 'Francisco Moreno';           // Your display name
  // ========================================
  
  try {
    console.log('🔐 Updating admin user...');
    
    // Hash the new password
    const passwordHash = await bcrypt.hash(newPassword, 10);
    
    // Update in database
    const result = await sql`
      UPDATE admin_users
      SET 
        username = ${newUsername},
        password_hash = ${passwordHash},
        email = ${newEmail},
        name = ${newName}
      WHERE username = ${currentUsername}
      RETURNING id, username, email, name
    `;
    
    if (result.rows.length > 0) {
      console.log('\n✅ Admin user updated successfully!');
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
      console.log('Username:', result.rows[0].username);
      console.log('Password:', newPassword);
      console.log('Email:', result.rows[0].email);
      console.log('Name:', result.rows[0].name);
      console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
      console.log('✅ You can now login with these credentials!');
    } else {
      console.log('❌ User not found with username:', currentUsername);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
  
  process.exit(0);
}

resetAdmin();