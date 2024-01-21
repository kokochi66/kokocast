package com.kokochi.kokocastserver.service.file;

import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class FileService {

    private final Path rootLocation;

    public FileService() {
        String rootPath = System.getProperty("user.dir");
        rootLocation = Paths.get(rootPath, "uploads");
        try {
            Files.createDirectories(rootLocation);
        } catch (IOException e) {
            throw new RuntimeException("Could not initialize folder for upload!", e);
        }
    }

    public String store(MultipartFile file) {
        try {
            Files.createDirectories(rootLocation);
            if (file.isEmpty()) {
                throw new RuntimeException("Failed to store empty file.");
            }
            String filename = UUID.randomUUID().toString() + "_" + file.getOriginalFilename();
            Path destinationFile = rootLocation.resolve(filename);
            Files.copy(file.getInputStream(), destinationFile);

            // 경로 구분자 변경
            return destinationFile.toString().replace(File.separator, "/");
        } catch (IOException e) {
            throw new RuntimeException("Failed to store file.", e);
        }
    }
}

