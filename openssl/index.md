---
title: Keys/Certificates using OpenSSL
---

# Important
- Check if private key is Legacy or new format 
    - if key starts with `BEGIN ENCRYPTED PRIVATE KEY` it is `PKCS#8` `latest` format
    - if key starts with `BEGIN RSA PRIVATE KEY` it is `legacy` format
- Private Key file also contains public key part which you can extract out seperately
- Certificate Types
    - `Binary (DER)` - X509 in raw form using DER ASN.1 encoding
    - `ASCII (PEM)` - Base64 encoded DER. One Certificate per file
    - `Legacy OpenSSL key` - Private key in DER ASN.1 encoding
    - `ASCII (PEM) key` - Base64 encoded DER key with some additional metadata
    - `PKCS#7 certificate` - Signed or Encrypted data `.p7b` or `.p7c` extension with entire certificate chain
    - `PKCS#8 key` - New format for private key store
    - `PKCS#12 (PFX) key and Certificate` - Entire certificate chain with `.p12` or `.pfx` extension

# Commands
- ### Creation
    - ### Create Private Key
    ```bash
    openssl genpkey -algorithm RSA -out sample.key -pkeyopt rsa_keygen_bits:2048
    ```

    - ### Create Encrypted Private Key
    ```bash
    openssl genpkey -algorithm RSA -out sample.key -pkeyopt rsa_keygen_bits:2048 -aes-128-cbc
    ```

    - ### See Private key details
    ```bash
    openssl pkey -in fd-priv.key -text -noout
    ```

    - ### Extract Public key from Private Key file
    ```bash
    openssl pkey -in fd-priv.key -pubout -out out-pub.key
    ```

    - ### Create Certificate Signing Request
    ```bash
    openssl req -new -config sample.cnf -key fd.key -out fd.csr
    ```
        - ### Sample `cnf` file
        ```text
            [req]
            prompt = no
            distinguished_name = dn
            req_extensions = crt
            input_password = .
            
            [dn]
            CN = www.samplecert.com
            emailAddress = nikhil@samplecert.com
            O = Sample Cert Company
            L = London
            C = GB
            
            [ext]
            subjectAltName = DNS:www.samplecert.com,DNS:samplecert.com
        ```

    - ### Examine a certificate
    ```bash
    openssl x509 -text -in fd.crt -noout
    ```
    - ### Conversion
      - PEM and DER
      ```bash
      openssl x509 -inform PEM -in fd.pem -outform DER -out fd.der
      openssl x509 -inform DER -in fd.der -outform PEM -out fd.pem
      ```
  
      - To PKCS#12 (PFX)
      ```bash
       openssl pkcs12 -export -name "My Certificate" -out fd.p12 \
          -inkey fd.key -in fd.crt -certfile fd-chain.crt
      ```
  
      - From PKCS#12 (PFX)
      ```bash
      openssl pkcs12 -in fd.p12 -out fd.pem -nodes
      ```
      ***OR***
      ```bash
      openssl pkcs12 -in fd.p12 -nocerts -out fd.key -nodes
      openssl pkcs12 -in fd.p12 -nokeys -clcerts -out fd.crt
      openssl pkcs12 -in fd.p12 -nokeys -cacerts -out fd-chain.crt
      ```
  
      - FROM PEM to PKCS#7 and reverse
      ```bash
      openssl crl2pkcs7 -nocrl -out fd.p7b -certfile fd.crt -certfile fd-chain.crt
      openssl pkcs7 -in fd.p7b -print_certs -out fd.pem
      ```
