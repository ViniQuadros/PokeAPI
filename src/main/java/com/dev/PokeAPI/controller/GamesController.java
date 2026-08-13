package com.dev.PokeAPI.controller;

import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.JsonNode;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/games")
public class GamesController {
    // Spring injects the environment variables configured in IntelliJ
    @Value("${CLIENT_ID:none}")
    private String clientId;

    @Value("${AUTH:none}")
    private String auth;

    @GetMapping("/pokemon")
    public ResponseEntity<String> searchGames() {
        try {
            String requestBody = "fields name, cover.url, first_release_date; " +
                    "where name ~ *\"Pokemon\"*; " +
                    "sort name asc; " +
                    "limit 500;";

            HttpResponse<JsonNode> response = Unirest.post("https://api.igdb.com/v4/games")
                    .header("Client-ID", clientId)
                    .header("Authorization", auth)
                    .header("Accept", "application/json")
                    .body(requestBody)
                    .asJson();

            // Return the raw JSON string received from IGDB back to JavaScript
            return ResponseEntity.status(response.getStatus()).body(response.getBody().toString());

        } catch (UnirestException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body("{\"error\": \"Failed to fetch data\"}");
        }
    }
}