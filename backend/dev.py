#!/usr/bin/env python3
"""
Development helper script for the Text Summarization API.
"""

import os
import sys
import subprocess
from pathlib import Path


def run_command(command, description):
    """Run a shell command with description."""
    print(f"🔧 {description}...")
    result = subprocess.run(command, shell=True, capture_output=True, text=True)
    if result.returncode == 0:
        print(f"✅ {description} completed successfully")
        if result.stdout:
            print(result.stdout)
    else:
        print(f"❌ {description} failed")
        if result.stderr:
            print(result.stderr)
        return False
    return True


def install_dependencies():
    """Install Python dependencies."""
    return run_command("pip install -r requirements.txt", "Installing dependencies")


def run_tests():
    """Run the test suite."""
    return run_command("pytest tests_new/ -v", "Running tests")


def run_server():
    """Run the development server."""
    print("🚀 Starting development server...")
    subprocess.run("uvicorn src.main:app --reload --host 0.0.0.0 --port 8000", shell=True)


def format_code():
    """Format code with black and isort."""
    commands = [
        ("black src/ tests_new/", "Formatting code with black"),
        ("isort src/ tests_new/", "Sorting imports with isort")
    ]
    
    for command, description in commands:
        if not run_command(command, description):
            return False
    return True


def lint_code():
    """Lint code with flake8."""
    return run_command("flake8 src/ tests_new/", "Linting code")


def type_check():
    """Run type checking with mypy."""
    return run_command("mypy src/", "Type checking")


def build_docker():
    """Build Docker image."""
    return run_command("docker build -t text-summarization-api .", "Building Docker image")


def run_docker():
    """Run Docker container."""
    print("🐳 Starting Docker container...")
    subprocess.run(
        "docker run -p 8000:8000 --env-file .env text-summarization-api", 
        shell=True
    )


def setup_dev_environment():
    """Set up development environment."""
    print("🔧 Setting up development environment...")
    
    # Check if .env exists
    if not Path(".env").exists():
        if Path(".env.example").exists():
            print("📝 Creating .env from .env.example...")
            subprocess.run("cp .env.example .env", shell=True)
            print("⚠️  Please edit .env with your configuration")
        else:
            print("❌ No .env.example found")
            return False
    
    # Install dependencies
    if not install_dependencies():
        return False
    
    # Create uploads directory
    Path("uploads").mkdir(exist_ok=True)
    print("📁 Created uploads directory")
    
    print("✅ Development environment setup complete!")
    print("\nNext steps:")
    print("1. Edit .env with your configuration (especially GROQ_API_KEY)")
    print("2. Run: python dev.py serve")
    
    return True


def show_help():
    """Show help message."""
    print("""
🛠️  Text Summarization API Development Helper

Usage: python dev.py <command>

Commands:
  setup       Set up development environment
  install     Install dependencies
  serve       Run development server
  test        Run tests
  format      Format code (black + isort)
  lint        Lint code (flake8)
  typecheck   Run type checking (mypy)
  docker      Build and run Docker container
  build       Build Docker image only
  help        Show this help message

Examples:
  python dev.py setup      # First time setup
  python dev.py serve      # Start development server
  python dev.py test       # Run all tests
  python dev.py format     # Format all code
""")


def main():
    """Main entry point."""
    if len(sys.argv) != 2:
        show_help()
        return
    
    command = sys.argv[1].lower()
    
    commands = {
        'setup': setup_dev_environment,
        'install': install_dependencies,
        'serve': run_server,
        'test': run_tests,
        'format': format_code,
        'lint': lint_code,
        'typecheck': type_check,
        'build': build_docker,
        'docker': lambda: build_docker() and run_docker(),
        'help': show_help
    }
    
    if command in commands:
        commands[command]()
    else:
        print(f"❌ Unknown command: {command}")
        show_help()


if __name__ == "__main__":
    main()
