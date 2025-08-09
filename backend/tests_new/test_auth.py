"""
Tests for authentication endpoints.
"""
import pytest
from fastapi.testclient import TestClient


def test_register_user(client: TestClient):
    """Test user registration."""
    response = client.post(
        "/api/auth/register",
        json={"username": "testuser", "password": "testpassword"}
    )
    assert response.status_code == 201
    data = response.json()
    assert data["username"] == "testuser"
    assert "id" in data


def test_register_duplicate_user(client: TestClient):
    """Test registering duplicate user."""
    # Register first user
    client.post(
        "/api/auth/register",
        json={"username": "testuser2", "password": "testpassword"}
    )
    
    # Try to register same user again
    response = client.post(
        "/api/auth/register",
        json={"username": "testuser2", "password": "testpassword"}
    )
    assert response.status_code == 400


def test_login_user(client: TestClient):
    """Test user login."""
    # Register user first
    client.post(
        "/api/auth/register",
        json={"username": "loginuser", "password": "loginpassword"}
    )
    
    # Login
    response = client.post(
        "/api/auth/token",
        data={"username": "loginuser", "password": "loginpassword"}
    )
    assert response.status_code == 200
    data = response.json()
    assert "access_token" in data
    assert data["token_type"] == "bearer"


def test_login_invalid_credentials(client: TestClient):
    """Test login with invalid credentials."""
    response = client.post(
        "/api/auth/token",
        data={"username": "nonexistent", "password": "wrongpassword"}
    )
    assert response.status_code == 401


def test_get_current_user(client: TestClient):
    """Test getting current user information."""
    # Register and login user
    client.post(
        "/api/auth/register",
        json={"username": "currentuser", "password": "currentpassword"}
    )
    
    login_response = client.post(
        "/api/auth/token",
        data={"username": "currentuser", "password": "currentpassword"}
    )
    token = login_response.json()["access_token"]
    
    # Get current user
    response = client.get(
        "/api/auth/me",
        headers={"Authorization": f"Bearer {token}"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["username"] == "currentuser"
