const mongoose = require('mongoose');
const Admin = require('../models/Admin');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/assignmentTask';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('MongoDB Connected');

  // Default admin credentials
  const username = process.env.ADMIN_USERNAME || 'admin';
  const password = process.env.ADMIN_PASSWORD || 'admin123';

  // Check if admin already exists
  const existingAdmin = await Admin.findOne({ username });
  if (existingAdmin) {
    console.log('Admin user already exists');
    process.exit(0);
  }

  // Create admin user
  const admin = new Admin({
    username,
    password
  });

  await admin.save();
  console.log('Admin user created successfully!');
  console.log('Username:', username);
  console.log('Password:', password);
  console.log('\n⚠️  IMPORTANT: Change the default password in production!');
  process.exit(0);
})
.catch(err => {
  console.error('Error:', err);
  process.exit(1);
});


