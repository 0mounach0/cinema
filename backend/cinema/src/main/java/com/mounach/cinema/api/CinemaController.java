package com.mounach.cinema.api;

import com.mounach.cinema.model.Cinema;
import com.mounach.cinema.model.Session;
import com.mounach.cinema.model.Theater;
import com.mounach.cinema.service.CinemaService;
import com.mounach.cinema.service.SessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDateTime;
import java.util.UUID;

@RequestMapping("cinema")
@RestController
public class CinemaController {

    private final CinemaService cinemaService;

    private final SessionService sessionService;

    @Autowired
    public CinemaController(CinemaService cinemaService, SessionService sessionService) {
        this.cinemaService = cinemaService;
        this.sessionService = sessionService;
    }

    @GetMapping
    private @ResponseBody Iterable<Cinema> getAllCinemas() {
        return cinemaService.getAllCinemas();
    }

    @GetMapping("{id}")
    private @ResponseBody Cinema getOneCinema(@PathVariable("id") UUID id) {
        return cinemaService.getOneCinema(id);
    }

    @PostMapping
    private @ResponseBody Cinema createCinema(@RequestBody Cinema cinema) {
        return cinemaService.createCinema(cinema);
    }

    @DeleteMapping("{id}")
    private @ResponseBody Cinema deleteCinema(@PathVariable("id") UUID id) {
        return cinemaService.deleteCinema(id);
    }

    @PutMapping("{id}")
    private @ResponseBody Cinema updateCinema(@PathVariable("id") UUID id, @RequestBody Cinema cinema) {
        return cinemaService.updateCinema(id, cinema);
    }

    @GetMapping("{id}/theaters")
    private @ResponseBody Iterable<Theater> getCinemaTheaters(@PathVariable("id") UUID id) {
        return cinemaService.getCinemaTheaters(id);
    }

    @GetMapping("{id}/sessions")
    private @ResponseBody Iterable<Session> getCinemaSessions(@PathVariable("id") UUID id,
                                                              @RequestParam(required = false) @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss") LocalDateTime start_date,
                                                              @RequestParam(required = false) @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss") LocalDateTime end_date) {
        if(start_date==null || end_date==null)
            return sessionService.getCinemaSessions(id);
        else
            return sessionService.getCinemaSessions_byDate(id, start_date, end_date);
    }

    @PostMapping("/upload")
    public ResponseEntity uploadToLocalFileSystem(@RequestParam("file") MultipartFile file) {
        String fileName = StringUtils.cleanPath(file.getOriginalFilename());
        String fileBasePath = Paths.get(".").toAbsolutePath().normalize().toString();
        Path path = Paths.get(fileBasePath + "/uploads/cinema/" + fileName);
        try {
            Files.copy(file.getInputStream(), path, StandardCopyOption.REPLACE_EXISTING);
        } catch (IOException e) {
            e.printStackTrace();
        }
        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/files/download/")
                .path(fileName)
                .toUriString();
        return ResponseEntity.ok(fileDownloadUri);
    }

    @GetMapping("/download/{fileName:.+}")
    public ResponseEntity downloadFileFromLocal(@PathVariable String fileName) {
        String fileBasePath = Paths.get(".").toAbsolutePath().normalize().toString();
        Path path = Paths.get(fileBasePath + "/uploads/cinema/" + fileName);
        Resource resource = null;
        try {
            resource = new UrlResource(path.toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
        }
        return ResponseEntity.ok()
                .contentType(MediaType.parseMediaType("image/jpeg"))
                .contentType(MediaType.parseMediaType("image/png"))
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}

