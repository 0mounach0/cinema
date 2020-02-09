package com.mounach.cinema.doa;

import com.mounach.cinema.model.Cinema;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.UUID;

@Repository("postgres")
public class CinemaDataAccessService implements CinemaDao {

    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public CinemaDataAccessService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public int insertCinema(UUID id, Cinema cinema) {
        String sql = "" +
                "INSERT INTO cinema (" +
                " id, " +
                " name, " +
                " longitude, " +
                " latitude) " +
                "VALUES (?, ?, ?, ?)";
        return jdbcTemplate.update(
                sql,
                id,
                cinema.getName(),
                cinema.getLongitude(),
                cinema.getLatitute()
        );
    }

    @Override
    public List<Cinema> getAllCinemas() {
        final String sql = "select id, name, longitude, latitude from cinema;";
        return jdbcTemplate.query(sql, (resultSet, i) -> {
            UUID id = UUID.fromString(resultSet.getString("id"));
            String name = resultSet.getString("name");
            double longitude = Double.parseDouble(resultSet.getString("longitude"));
            double latitude = Double.parseDouble(resultSet.getString("latitude"));
            return new Cinema(id, name, longitude, latitude);
        });
    }
}
