package com.moviemate.repository;

import com.moviemate.model.User;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.Optional;

/**
 * UserRepository: Handles MySQL operations for user accounts using Spring JdbcTemplate.
 * 
 * Why JdbcTemplate for Beginners?
 * - It writes crystal-clear, standard SQL queries without complex ORM magic.
 * - It manages database connections, prepared statements, and cleans up resources automatically.
 * - Parameterized queries (?) completely prevent SQL injection attacks.
 */
@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // RowMapper maps each SQL result set row to our User Java model
    private final RowMapper<User> userRowMapper = (rs, rowNum) -> {
        Timestamp timestamp = rs.getTimestamp("created_at");
        return new User(
                rs.getLong("id"),
                rs.getString("full_name"),
                rs.getString("email"),
                rs.getString("phone"),
                rs.getString("password_hash"),
                timestamp != null ? timestamp.toLocalDateTime() : null
        );
    };

    /**
     * Checks if a user already exists with the given email address.
     */
    public boolean existsByEmail(String email) {
        String sql = "SELECT COUNT(*) FROM users WHERE LOWER(email) = LOWER(?)";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, email);
        return count != null && count > 0;
    }

    /**
     * Saves a new user record and returns the persisted user with auto-generated ID.
     */
    public User save(User user) {
        String sql = "INSERT INTO users (full_name, email, phone, password_hash) VALUES (?, ?, ?, ?)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, user.getFullName());
            ps.setString(2, user.getEmail().toLowerCase().trim());
            ps.setString(3, user.getPhone());
            ps.setString(4, user.getPasswordHash());
            return ps;
        }, keyHolder);

        if (keyHolder.getKey() != null) {
            user.setId(keyHolder.getKey().longValue());
        }
        return user;
    }

    /**
     * Finds a user by their unique email address.
     */
    public Optional<User> findByEmail(String email) {
        String sql = "SELECT id, full_name, email, phone, password_hash, created_at FROM users WHERE LOWER(email) = LOWER(?)";
        try {
            User user = jdbcTemplate.queryForObject(sql, userRowMapper, email.trim());
            return Optional.ofNullable(user);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    /**
     * Finds a user by primary key ID.
     */
    public Optional<User> findById(Long id) {
        String sql = "SELECT id, full_name, email, phone, password_hash, created_at FROM users WHERE id = ?";
        try {
            User user = jdbcTemplate.queryForObject(sql, userRowMapper, id);
            return Optional.ofNullable(user);
        } catch (EmptyResultDataAccessException e) {
            return Optional.empty();
        }
    }

    /**
     * Ensures the users table exists in the relational database.
     */
    public void ensureTableExists() {
        String sql = """
            CREATE TABLE IF NOT EXISTS users (
                id BIGINT AUTO_INCREMENT PRIMARY KEY,
                full_name VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                phone VARCHAR(20) NOT NULL,
                password_hash VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """;
        jdbcTemplate.execute(sql);
    }
}
