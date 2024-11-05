// lib/redis.js
'use server';
import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

const USERNAME = process.env.REDIS_USERNAME;
const PASSWORD = process.env.REDIS_PASSWORD;
const HOST = process.env.REDIS_HOST;
const PORT = process.env.REDIS_PORT;
const CERTIFICATE = process.env.REDIS_CA_CERTIFICATE; 

const REDIS_URL = `rediss://${USERNAME}:${PASSWORD}@${HOST}:${PORT}`;

const client = createClient({
  url: REDIS_URL,
  socket: {
    tls: true,
    rejectUnauthorized: false,
    // Pass the certificate content directly as a buffer
    ca: Buffer.from(CERTIFICATE),
    connectTimeout: 10000,
    keepAlive: 1000,
  }
});

client.on('error', (err) => console.error('Redis Client Error:', err));
client.on('connect', () => console.log('Successfully connected to IBM Cloud Redis'));
client.on('end', () => console.log('Redis connection ended'));

// Connect immediately
client.connect().catch(console.error);

export default client;


// 'use server'
// import { createClient } from 'redis';

// const client = createClient({
// //   url: '127.0.0.1:6379',
//  url: 'redis://localhost:6379',
// });

// // Listen for connect event to log successful connection
// client.on('connect', () => {
//   console.log('Successfully connected to Redis');
// });

// client.on('error', (err) => console.log('Redis Client Error', err));

// client.connect();

// export default client;

// // lib/redis.js
// 'use server';
// import { createClient } from 'redis';
// import fs from 'fs';
// import path from 'path';

// const USERNAME = 'ibm_cloud_9b82aaea_ed69_40c6_a09f_9e7ccb034bca';
// const PASSWORD = '192c2a16e4d4ff1a8c159bc058302ca2627753a5b92151c81a98cd44a7076273';
// const HOST = '3fd54d24-286a-4184-a404-774a6a43a752.c38qvnlz04atmdpus310.databases.appdomain.cloud';
// const PORT = 30120;
// const REDIS_URL = `rediss://${USERNAME}:${PASSWORD}@${HOST}:${PORT}`;

// // Save the certificate as a file or directly use it if you want to keep it inline
// const CERTIFICATE = `-----BEGIN CERTIFICATE-----
// MIIDqTCCApGgAwIBAgIJAI3Qznv0dkNgMA0GCSqGSIb3DQEBCwUAMB4xHDAaBgNV
// BAMTE0lCTSBDbG91ZCBEYXRhYmFzZXMwHhcNMjEwNzA4MTAwNDI4WhcNMzEwNzA2
// MTAwNDI4WjAeMRwwGgYDVQQDExNJQk0gQ2xvdWQgRGF0YWJhc2VzMIIBIjANBgkq
// hkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEArY1RWYcIMKOiIJZQIiW/nWgUmozzbMo1
// IgHfWDjdokr7uUV8L5ELOyKSsH4xKjnef0QdEgt/h72Arapt2ujGtNUUd6kW+zSJ
// 324T1L0AaD9r/yU1ytX0GyF72nzyC6MZEK3zmfUuMijan2tLw0UqjWVMX6Gs5goE
// QQOuFyp7BBF5/DemzyurvgrrVMUVbPxHeVrQRAT54lj6QLKVGg90BPByCNN7cgnM
// suXNyoeCwOdu/6FCVAG4sHWkT/0REuM4PI70aMVaHWFyrAy5IMqkX6Fo1u3FqJZq
// 7lDv2CU0V5xbVQrM1CudvsVIvWNHBqPBtfa27G1r4EuaO832zjSNkQIDAQABo4Hp
// MIHmMB0GA1UdDgQWBBSF4ewGsqrZnR4C87zy1pNR0QKq2TBOBgNVHSMERzBFgBSF
// 4ewGsqrZnR4C87zy1pNR0QKq2aEipCAwHjEcMBoGA1UEAxMTSUJNIENsb3VkIERh
// dGFiYXNlc4IJAI3Qznv0dkNgMA8GA1UdEwEB/wQFMAMBAf8wEQYJYIZIAYb4QgEB
// BAQDAgEGMAkGA1UdEgQCMAAwKwYJYIZIAYb4QgENBB4WHFRpbnlDQSBHZW5lcmF0
// ZWQgQ2VydGlmaWNhdGUwCQYDVR0RBAIwADAOBgNVHQ8BAf8EBAMCAgQwDQYJKoZI
// hvcNAQELBQADggEBAEhKWC/HLnA4BScQyL1DEAOm8iIt3JeDsasppxuchFv5/yjE
// +Ag2VqRn+UIdQLriKhsrpZ7AUcy/LJ1qMoTOCKWAiAYCMXiLLKU5Y+UJ+5uEP2TJ
// +IGIhytPtvK0d/ZX2eM53EzmBITRPKSUIdUnS3m6Zy/U74X038CgHFxbHLtLkiUG
// C1127xKqY0eQOiBKNNnawvIt9PJj2rw4kPMS/F14t27+XErY/FmTHeJbOYn2a5is
// yjsr2tkNQTTc39BK7bNKFa8CZC0LrgLWkWoMKCcy1D4bYObA+UVVVlViC6CBmpV7
// ahGuNNBUDuiIMVYBMhJfl1kXGYC1OcG8KyE5VK8=
// -----END CERTIFICATE-----`;

// // Write certificate to temporary file
// const CERT_FILE_PATH = path.join('/tmp', 'ibm_cloud_cert.pem');
// fs.writeFileSync(CERT_FILE_PATH, CERTIFICATE);

// const client = createClient({
//   url: REDIS_URL,
//   socket: {
//     tls: true,
//     rejectUnauthorized: false,
//     ca: [fs.readFileSync(CERT_FILE_PATH)],
//     connectTimeout: 10000,
//     keepAlive: 1000,
//   }
// });

// client.on('error', (err) => console.error('Redis Client Error:', err));
// client.on('connect', () => console.log('Successfully connected to IBM Cloud Redis'));
// client.on('end', () => console.log('Redis connection ended'));

// // Connect immediately
// client.connect().catch(console.error);

// export default client;
