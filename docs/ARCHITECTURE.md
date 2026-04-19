# Custos — Architecture Overview

## System Diagram
```
[Web App]  ←→  [Backend API]  ←→  [PostgreSQL]
                     ↕
            [Dead Man's Switch Scheduler]
                     ↕
            [HSM (AWS CloudHSM)]     [Bitcoin Full Node]
                                            ↕
            [Lightning Node (LND)]  ←→  [Watchtower Service]
```

## Key Design Decisions

### 2-of-3 Multisig (Taproot)
- Key 1: User hardware wallet — user controls
- Key 2: Web app biometric key — user controls
- Key 3: Custos HSM — released ONLY on inheritance trigger
- Any 2 keys spend. Heir needs Custos key + their own new key. No hardware wallet required for inheritance.

### Dead Man's Switch State Machine
```
ACTIVE → PENDING_WARNING → GRACE_PERIOD → TRIGGERED → KYC_PENDING → COMPLETE
                                ↑
                        (user checks in = reset to ACTIVE)
```

### HSM Security
- Third key material NEVER leaves the HSM
- HSM only signs after: switch triggered + heir KYC passed + internal audit log
- AWS CloudHSM in af-south-1 (Johannesburg) for Africa-first compliance

### PGP Encryption
- Legacy package encrypted to heir's public key at ONBOARDING time
- Server holds only ciphertext — cannot read package contents
- Decryption happens client-side in the heir's browser

### KYC Gate
- Identity verification required BEFORE HSM releases the key
- Provider: Smile Identity (Africa-native), Sumsub (global)
- Prevents switch exploitation by bad actors

## API Endpoints
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/register | Public | Create account |
| POST | /api/auth/login | Public | Get JWT |
| GET | /api/user/me | JWT | Profile + vault status |
| POST | /api/vault/setup | JWT | Configure 2-of-3 vault |
| GET | /api/vault/status | JWT | Vault health |
| POST | /api/switch/configure | JWT | Set check-in interval |
| POST | /api/switch/checkin | JWT | Biometric check-in |
| GET | /api/switch/status | JWT | Switch state |
| POST | /api/heir/register | JWT | Add heir + PGP key |
| POST | /api/heir/claim/initiate | Claim token | Start claim process |
| POST | /api/heir/claim/complete | Webhook | Post-KYC fund release |
| GET | /api/watchtower/status | JWT | Channel health |
| POST | /api/watchtower/register | JWT | Connect LND node |
| POST | /api/recovery/forensic | JWT | Start recovery case |
