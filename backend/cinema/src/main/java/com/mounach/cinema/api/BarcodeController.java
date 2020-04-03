package com.mounach.cinema.api;


import com.mounach.cinema.generatorQR.ZxingBarcodeGenerator;


import com.mounach.cinema.model.Ticket;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.awt.image.BufferedImage;


@RestController
@RequestMapping("api/qrcode")
public class BarcodeController {

    @PostMapping(produces = MediaType.IMAGE_PNG_VALUE)
    public ResponseEntity<BufferedImage> zxingQRCode(@RequestBody Ticket ticket) throws Exception {
        return okResponse(ZxingBarcodeGenerator.generateQRCodeImage(ticket.toString()));
    }

    private ResponseEntity<BufferedImage> okResponse(BufferedImage image) {
        return new ResponseEntity<>(image, HttpStatus.OK);
    }

}
