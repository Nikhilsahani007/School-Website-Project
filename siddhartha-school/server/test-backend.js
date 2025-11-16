// Quick test script to check if backend server is running
const http = require('http');

const PORT = process.env.PORT || 5000;
const HOST = 'localhost';

console.log('🔍 Checking if backend server is running...\n');
console.log(`Testing: http://${HOST}:${PORT}\n`);

const options = {
  hostname: HOST,
  port: PORT,
  path: '/api/health',
  method: 'GET',
  timeout: 3000
};

const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    if (res.statusCode === 200) {
      console.log('✅ Backend server is RUNNING!');
      console.log(`   Status Code: ${res.statusCode}`);
      console.log(`   Response: ${data}`);
      console.log('\n📋 Available endpoints:');
      console.log(`   - Health Check: http://${HOST}:${PORT}/api/health`);
      console.log(`   - Root: http://${HOST}:${PORT}/`);
      console.log(`   - Contact Form: POST http://${HOST}:${PORT}/api/contact`);
      console.log(`   - Admissions: POST http://${HOST}:${PORT}/api/admissions`);
      console.log(`   - Fees: GET http://${HOST}:${PORT}/api/fees`);
      console.log(`   - Notices: GET http://${HOST}:${PORT}/api/notices`);
      process.exit(0);
    } else {
      console.log(`⚠️  Server responded with status code: ${res.statusCode}`);
      console.log(`   Response: ${data}`);
      process.exit(1);
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Backend server is NOT running!');
  console.error(`   Error: ${error.message}`);
  console.error('\n💡 To start the server:');
  console.error('   1. Navigate to the server directory:');
  console.error('      cd siddhartha-school/server');
  console.error('   2. Install dependencies (if not done):');
  console.error('      npm install');
  console.error('   3. Start the server:');
  console.error('      npm start');
  console.error('      OR for development with auto-reload:');
  console.error('      npm run dev');
  console.error('\n📝 Make sure you have:');
  console.error('   - MongoDB running (or MongoDB URI in .env)');
  console.error('   - .env file configured with required variables');
  process.exit(1);
});

req.on('timeout', () => {
  console.error('❌ Connection timeout - server may not be running');
  req.destroy();
  process.exit(1);
});

req.end();

