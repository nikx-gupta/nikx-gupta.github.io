---
title: FileOutput
category: SpringBoot
---

## Description
- Writing File Content as output to Spring Boot Controller method
	
## Use FileSystemResource
- ### If File is on Disk we can use FileSystemResource
	```java
	@GetMapping(value = "/loadFromDisk", produces = {"application/octet-stream"})
    public ResponseEntity<FileSystemResource> loadFromDisk() {
        String fileName = "fileName.txt";
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDisposition(ContentDisposition.attachment().filename(fileName).build());
        headers.setContentType(MediaType.parseMediaType("application/text"));
        return new ResponseEntity(new FileSystemResource(new File(fileName)), headers, HttpStatus.OK);
    }
	```	

## Write To Response Stream
- ### Inject `HttpServletResponse` in the method and write File to Response OutputStream
	```java
	@GetMapping(value = "/loadFromStream", produces = {"application/octet-stream"})
    @SneakyThrows
    public void loadFromStream(HttpServletResponse response) {
        String fileName = createTempFile();
        response.addHeader("Content-Type", "application/text");
        response.addHeader("Content-Disposition", ContentDisposition.attachment().filename(fileName).build().toString());
        try (OutputStream responseStream = response.getOutputStream()) {
            try (InputStream inputStream = new FileInputStream(new File(fileName))) {
                IOUtils.copy(inputStream, responseStream);
            }
            response.flushBuffer();
        }
    }
    ```	

## Return using Bytes
- ### Read the File content in bytes and return. This should only be used when File Size less than 2-3MB. Otherwise it can increase memory usage and
      can cause heavy memory fragmentation
	```java
	@GetMapping(value = "/loadFromByte", produces = {"application/octet-stream"})
    @SneakyThrows
    public ResponseEntity<byte[]> loadFromByte() {
        File tempFile = createFile();
        HttpHeaders headers = new HttpHeaders();
        headers.setContentDisposition(ContentDisposition.attachment().filename(tempFile.getName()).build());
        headers.setContentType(MediaType.parseMediaType("application/text"));
        byte[] fileBytes = new byte[(int) tempFile.length()];
        try (InputStream str = new FileInputStream(tempFile)) {
            IOUtils.readFully(str, fileBytes);
        }

        return new ResponseEntity(fileBytes, headers, HttpStatus.OK);
    }
    ```	
