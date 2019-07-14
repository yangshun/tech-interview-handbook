# Security

## Encryption

#### Symmetrical Encryption

- Symmetrical encryption is a type of encryption where the same key is used to encrypt plaintext messages and to decrypt ciphertext.
- Symmetrical encryption is usually much less computationally expensive as compared to asymmetric encryption.
- Often called "shared secret" encryption, or "secret key" encryption.
- To use a symmetric encryption scheme, the sender and receiver must securely share a key in advance. This sharing can be done via asymmetric encryption.

#### Asymmetric Encryption

- A pair of keys are required: a **private key** and a **public key**. Public keys can be shared with anyone while private keys should be kept secret and known only to the owner.
- A private key can be used to decrypt a message encrypted by the corresponding public key. A successful decryption verifies that the holder possesses the private key.
- Also known as public-key cryptography.

## Public Key Infrastructure

A public key infrastructure (PKI) is a system for the creation, storage, and distribution of digital certificates which are used to verify that a particular public key belongs to a certain entity. The PKI creates digital certificates which map public keys to entities, securely stores these certificates in a central repository and revokes them if needed.

###### References

- https://www.wikiwand.com/en/Public_key_infrastructure

## SSH

An SSH session consists of two stages, **Negotiating Encryption** and **User Authentication**.

#### Negotiating Encryption

The goal of this stage is for the client and server to agree upon and establish encryption to protect future communication, by generating an identical session key. One possible algorithm to generate the session key is the Diffie–Hellman key exchange scheme. Each party generates a public/private key pair and exchanges the public key. After obtaining an authentic copy of each other's public keys, each party can compute a shared secret offline.

The basis of this procedure for classic Diffie-Hellman is:

1. Both parties agree on a large prime number, which will serve as a seed value.
1. Both parties agree on an encryption generator (typically AES), which will be used to manipulate the values in a predefined way.
1. Independently, each party comes up with another prime number which is kept secret from the other party. This number is used as the private key for this interaction (different than the private SSH key used for authentication).
1. The generated private key, the encryption generator, and the shared prime number are used to generate a public key that is derived from the private key, but which can be shared with the other party.
1. Both participants then exchange their generated public keys.
1. The receiving entity uses their own private key, the other party's public key, and the original shared prime number to compute a shared secret key.
1. Although this is independently computed by each party, using opposite private and public keys, it will result in the same shared secret key.
1. The shared secret is then used to encrypt all communication that follows.

The purpose of the shared secret key is to wrap all further communication in an encrypted tunnel that cannot be deciphered by outsiders.

#### User Authentication

The goal of this stage is to authenticate the user and discover whether access to the server should be granted. There are two approaches for authenticating, either by using passwords, or SSH key pairs.

For password authentication, the server simply prompts the client for the password of the account they are attempting to login with. The password is sent through the negotiated encryption, so it is secure from outside parties.

Authentication using SSH key pairs begins after the symmetric encryption has been established as described in the last section. The procedure happens like this:

1. The client begins by sending an ID for the key pair it would like to authenticate with to the server.
1. The server check's the `authorized_keys` file of the account that the client is attempting to log into for the key ID.
1. If a public key with matching ID is found in the file, the server generates a random number and uses the public key to encrypt the number.
1. The server sends the client this encrypted message.
1. If the client actually has the associated private key, it will be able to decrypt the message using that key, revealing the original number.
1. The client combines the decrypted number with the shared session key that is being used to encrypt the communication, and calculates the MD5 hash of this value.
1. The client then sends this MD5 hash back to the server as an answer to the encrypted number message.
1. The server uses the same shared session key and the original number that it sent to the client to calculate the MD5 value on its own. It compares its own calculation to the one that the client sent back. If these two values match, it proves that the client was in possession of the private key and the client is authenticated.

###### References

- https://www.digitalocean.com/community/tutorials/understanding-the-ssh-encryption-and-connection-process
