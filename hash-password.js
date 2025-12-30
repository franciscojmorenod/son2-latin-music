const bcrypt = require('bcryptjs');

async function hashPassword() {
  const password = 'admin123';
  const hash = await bcrypt.hash(password, 10);
  console.log('Password: admin123');
  console.log('New Hash:', hash);
  console.log('\nCopy the hash above and update database!');
}

hashPassword();