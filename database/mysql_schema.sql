-- ==============================================================
-- MovieMate - Movie Ticket Booking System
-- Database: MySQL (User Accounts & Authentication)
-- Database Name: moviemate_users
-- ==============================================================

-- 1. Create Database if it does not already exist
CREATE DATABASE IF NOT EXISTS moviemate_users;
USE moviemate_users;

-- 2. Create Users Table
-- Why MySQL for Users?
-- MySQL enforces ACID transactions and strict UNIQUE constraints, ensuring:
-- a) No two accounts can register with the same email.
-- b) User data is strictly structured with predefined column types.
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    phone VARCHAR(20) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Insert Demo / Seed User
-- Email: john.doe@example.com
-- Password: Password@123
-- Stored password is BCrypt hashed (Cost factor 10)
-- BCrypt format: $2a$10$... (Never store plain text passwords!)
INSERT INTO users (full_name, email, phone, password_hash)
VALUES (
    'John Doe',
    'john.doe@example.com',
    '9876543210',
    '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
) ON DUPLICATE KEY UPDATE email=email;

-- 4. Helpful verification query
SELECT id, full_name, email, phone, created_at FROM users;
