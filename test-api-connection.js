// Test API connection from frontend
import axios from 'axios';

async function testApiConnection() {
  try {
    console.log('Testing API connection...');
    const response = await axios.get('http://localhost:3001/health');
    console.log('✅ API connection successful:', response.data);
    return true;
  } catch (error) {
    console.error('❌ API connection failed:', error.message);
    return false;
  }
}

testApiConnection();
