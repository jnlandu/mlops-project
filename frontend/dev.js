#!/usr/bin/env node

/**
 * Frontend development helper script
 */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Helper function to run commands
function runCommand(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    console.log(`🔧 Running: ${command} ${args.join(' ')}`);
    
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: true,
      ...options
    });

    child.on('close', (code) => {
      if (code === 0) {
        console.log(`✅ Command completed successfully`);
        resolve(code);
      } else {
        console.log(`❌ Command failed with code ${code}`);
        reject(new Error(`Command failed with code ${code}`));
      }
    });

    child.on('error', (error) => {
      console.log(`❌ Command error: ${error.message}`);
      reject(error);
    });
  });
}

// Check if file exists
function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// Setup development environment
async function setup() {
  console.log('🚀 Setting up frontend development environment...');

  // Check if package.json exists
  if (!fileExists('package.json')) {
    console.log('❌ package.json not found. Are you in the frontend directory?');
    process.exit(1);
  }

  // Check if .env.local exists
  if (!fileExists('.env.local')) {
    if (fileExists('.env.local.example')) {
      fs.copyFileSync('.env.local.example', '.env.local');
      console.log('📝 Created .env.local from .env.local.example');
      console.log('⚠️  Please edit .env.local with your configuration');
    } else {
      console.log('⚠️  No .env.local.example found');
    }
  }

  // Install dependencies
  try {
    await runCommand('npm', ['install']);
  } catch (error) {
    console.log('❌ Failed to install dependencies');
    process.exit(1);
  }

  console.log('✅ Frontend development environment setup complete!');
  console.log('\nNext steps:');
  console.log('1. Edit .env.local with your backend URL');
  console.log('2. Run: node dev.js serve');
}

// Start development server
async function serve() {
  console.log('🚀 Starting development server...');
  try {
    await runCommand('npm', ['run', 'dev']);
  } catch (error) {
    console.log('❌ Failed to start development server');
    process.exit(1);
  }
}

// Build for production
async function build() {
  console.log('🏗️  Building for production...');
  try {
    await runCommand('npm', ['run', 'build']);
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.log('❌ Build failed');
    process.exit(1);
  }
}

// Start production server
async function start() {
  console.log('🚀 Starting production server...');
  try {
    await runCommand('npm', ['run', 'start']);
  } catch (error) {
    console.log('❌ Failed to start production server');
    process.exit(1);
  }
}

// Lint code
async function lint() {
  console.log('🧹 Linting code...');
  try {
    await runCommand('npm', ['run', 'lint']);
    console.log('✅ Linting completed successfully!');
  } catch (error) {
    console.log('❌ Linting failed');
    process.exit(1);
  }
}

// Format code
async function format() {
  console.log('🎨 Formatting code...');
  try {
    await runCommand('npm', ['run', 'format']);
    console.log('✅ Code formatting completed!');
  } catch (error) {
    console.log('❌ Code formatting failed');
    process.exit(1);
  }
}

// Type check
async function typeCheck() {
  console.log('🔍 Type checking...');
  try {
    await runCommand('npm', ['run', 'type-check']);
    console.log('✅ Type checking completed!');
  } catch (error) {
    console.log('❌ Type checking failed');
    process.exit(1);
  }
}

// Clean build artifacts
async function clean() {
  console.log('🧹 Cleaning build artifacts...');
  try {
    await runCommand('npm', ['run', 'clean']);
    console.log('✅ Cleanup completed!');
  } catch (error) {
    console.log('❌ Cleanup failed');
    process.exit(1);
  }
}

// Install new dependency
async function install(packageName) {
  if (!packageName) {
    console.log('❌ Please provide a package name');
    console.log('Usage: node dev.js install <package-name>');
    process.exit(1);
  }

  console.log(`📦 Installing ${packageName}...`);
  try {
    await runCommand('npm', ['install', packageName]);
    console.log(`✅ ${packageName} installed successfully!`);
  } catch (error) {
    console.log(`❌ Failed to install ${packageName}`);
    process.exit(1);
  }
}

// Show help
function showHelp() {
  console.log(`
🛠️  Frontend Development Helper

Usage: node dev.js <command> [options]

Commands:
  setup       Set up development environment
  serve       Start development server
  build       Build for production
  start       Start production server
  lint        Lint code
  format      Format code
  typecheck   Run type checking
  clean       Clean build artifacts
  install     Install new dependency
  help        Show this help message

Examples:
  node dev.js setup              # First time setup
  node dev.js serve              # Start development server
  node dev.js build              # Build for production
  node dev.js install axios      # Install new dependency
  node dev.js lint               # Lint all code
`);
}

// Main function
async function main() {
  const command = process.argv[2];
  const args = process.argv.slice(3);

  switch (command) {
    case 'setup':
      await setup();
      break;
    case 'serve':
      await serve();
      break;
    case 'build':
      await build();
      break;
    case 'start':
      await start();
      break;
    case 'lint':
      await lint();
      break;
    case 'format':
      await format();
      break;
    case 'typecheck':
      await typeCheck();
      break;
    case 'clean':
      await clean();
      break;
    case 'install':
      await install(args[0]);
      break;
    case 'help':
    default:
      showHelp();
      break;
  }
}

main().catch((error) => {
  console.error('❌ An error occurred:', error.message);
  process.exit(1);
});
