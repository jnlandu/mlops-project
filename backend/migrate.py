#!/usr/bin/env python3
"""
Migration script to update from old backend structure to new organized structure.
This script helps migrate existing data and configuration.
"""

import os
import shutil
import json
from pathlib import Path


def backup_old_files():
    """Create backup of old structure."""
    backup_dir = Path("backup_old_structure")
    backup_dir.mkdir(exist_ok=True)
    
    # Backup important files
    files_to_backup = [
        "app/",
        "routers/", 
        "utils/",
        "local.settings.json",
        ".env"
    ]
    
    for item in files_to_backup:
        if Path(item).exists():
            if Path(item).is_dir():
                shutil.copytree(item, backup_dir / item, dirs_exist_ok=True)
            else:
                shutil.copy2(item, backup_dir / item)
    
    print(f"✅ Backup created in {backup_dir}")


def migrate_environment_variables():
    """Migrate environment variables from old .env to new format."""
    old_env = Path(".env")
    new_env = Path(".env")
    
    if old_env.exists():
        print("📝 Migrating environment variables...")
        
        # Read old .env
        with open(old_env) as f:
            old_content = f.read()
        
        # Create new .env based on template
        template_content = """# Application Configuration
APP_NAME=Text Summarization API
APP_VERSION=1.0.0
DEBUG=False

# Server Configuration  
HOST=0.0.0.0
PORT=8000

# Database Configuration
DATABASE_URL=sqlite:///./app.db

# Authentication (UPDATE THESE!)
AUTH_SECRET_KEY=your-super-secret-key-change-this-in-production
AUTH_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS Settings
CORS_ORIGINS=http://localhost:3000,https://mlops-project-3repcia0n-jeremies-projects-257f201c.vercel.app,https://mlops-project-taupe.vercel.app

# AI/ML Configuration
GROQ_API_KEY=
MODEL_NAME=llama3-8b-8192
MAX_TOKENS=1000

# File Upload Configuration
MAX_FILE_SIZE=10485760
UPLOAD_DIR=uploads
"""
        
        # Extract values from old .env if they exist
        lines = old_content.split('\n')
        old_vars = {}
        for line in lines:
            if '=' in line and not line.strip().startswith('#'):
                key, value = line.split('=', 1)
                old_vars[key.strip()] = value.strip()
        
        # Update template with old values
        if 'AUTH_SECRET_KEY' in old_vars:
            template_content = template_content.replace(
                'AUTH_SECRET_KEY=your-super-secret-key-change-this-in-production',
                f'AUTH_SECRET_KEY={old_vars["AUTH_SECRET_KEY"]}'
            )
        
        if 'GROQ_API_KEY' in old_vars:
            template_content = template_content.replace(
                'GROQ_API_KEY=',
                f'GROQ_API_KEY={old_vars["GROQ_API_KEY"]}'
            )
        
        # Write new .env
        with open(".env.new", "w") as f:
            f.write(template_content)
        
        print("✅ New .env.new file created - please review and rename to .env")


def migrate_database():
    """Instructions for database migration."""
    print("\n📊 Database Migration:")
    print("1. Your old database file (if SQLite) should still work")
    print("2. The new models are compatible with the old structure")
    print("3. Run the new application to create any missing tables")
    print("4. Consider backing up your database before first run")


def cleanup_old_structure():
    """Clean up old structure after confirmation."""
    response = input("\n🧹 Do you want to remove old structure files? (y/N): ")
    
    if response.lower() == 'y':
        old_dirs = ['app/', 'routers/', 'utils/']
        old_files = ['requirements_project_one.txt']
        
        for dir_path in old_dirs:
            if Path(dir_path).exists():
                shutil.rmtree(dir_path)
                print(f"🗑️  Removed {dir_path}")
        
        for file_path in old_files:
            if Path(file_path).exists():
                Path(file_path).unlink()
                print(f"🗑️  Removed {file_path}")
        
        print("✅ Old structure cleaned up")
    else:
        print("ℹ️  Old structure preserved")


def main():
    """Run migration process."""
    print("🚀 Backend Structure Migration Tool")
    print("====================================")
    
    # Check if we're in the right directory
    if not Path("requirements.txt").exists():
        print("❌ Please run this script from the backend directory")
        return
    
    print("1. Creating backup...")
    backup_old_files()
    
    print("\n2. Migrating environment variables...")
    migrate_environment_variables()
    
    print("\n3. Database migration notes...")
    migrate_database()
    
    print("\n4. Cleanup old structure...")
    cleanup_old_structure()
    
    print("\n✅ Migration completed!")
    print("\nNext steps:")
    print("1. Review the new .env.new file and rename it to .env")
    print("2. Install dependencies: pip install -r requirements.txt")
    print("3. Test the new structure: uvicorn src.main:app --reload")
    print("4. Update your Dockerfile and deployment scripts")
    print("5. Run tests: pytest tests_new/")


if __name__ == "__main__":
    main()
