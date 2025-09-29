#!/bin/bash
# ESL Lessons Hub - Test Environment Setup Script

echo '🚀 Setting up test environment...'

# Install dependencies
echo '📦 Installing dependencies...'
npm install

# Install server dependencies
echo '🔧 Installing server dependencies...'
cd server && npm install && cd ..

# Build for production
echo '🏗️ Building for production...'
npm run build

echo '✅ Test environment setup complete!'
echo '📋 Next steps:'
echo '1. Set up DeepL API key in server/.env'
echo '2. Deploy to Netlify'
echo '3. Test all functionality'
echo '4. Validate security and performance'
echo ''
echo '🌐 Test site will be available at: https://esl-lessons.scizors.wtf'
echo '📚 See DEPLOYMENT_README.md for detailed testing checklist'
