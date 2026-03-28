# Scripts

This directory contains utility scripts for the Ontology project.

## gen_proto.sh

This script generates Go and TypeScript code from `.proto` files using `protoc`.

### Prerequisites

- [protobuf](https://grpc.io/docs/protoc-installation/) (`protoc`)
- GNU `sed` (`gsed`) for macOS: `brew install gnu-sed`
- Go plugins:
  - `go install google.golang.org/protobuf/cmd/protoc-gen-go@latest`
  - `go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest`
- Node.js and bun (for TypeScript generation)
- `protoc-gen-ts_proto` (installed via bun in `scripts` folder)

### Setup

1. Install dependencies:
    ```sh
    brew install protobuf gnu-sed
    go install google.golang.org/protobuf/cmd/protoc-gen-go@latest
    go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest
    export PATH="$PATH:$(go env GOPATH)/bin"
    cd scripts && bun install && cd ..
    ```

2. Place your `.proto` files in the `proto` directory at the project root.

### Usage

Run the script from the project root (not from the `scripts` folder):

```sh
./scripts/gen_proto.sh
```

### Output

- Go types: `app/internal/types`
- TypeScript types: `panel/src/types`

### Notes

- The script removes `omitempty` from generated Go proto files.
- TypeScript types are generated with specific options (see script for details).

---

## populate-events.ts

A Bun script to populate the Ontology with fake transaction events using Faker.js.

### Features

- 🎲 Generates realistic fake transaction data
- 🚀 Configurable record count and TPS (Transactions Per Second)
- 📊 Real-time progress tracking
- ⏱️ Rate limiting to control API load
- ✅ Detailed success/failure reporting

### Quick Start

```sh
cd scripts
bun install
bun run populate-events
```

### Configuration

Use environment variables to customize:

```sh
RECORD_COUNT=1000 TPS=50 bun run populate-events
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `RECORD_COUNT` | Number of events to create | `10` |
| `TPS` | Transactions per second | `10` |
| `API_URL` | Ontology events API endpoint | `http://localhost:4441/ontology/v1/events/create` |

### Documentation

See [POPULATE_EVENTS.md](./POPULATE_EVENTS.md) for detailed documentation.

---

## generate-fake-events.ts

A Bun script that generates fake transaction event data using Faker.js and writes it to `events.txt`.

### Prerequisites

```sh
cd scripts
bun install
```

### Usage

Simply run the script to generate events to `events.txt`:

```sh
bun run generate-fake-events.ts
```

The script will:
- Generate the specified number of events (default: 1000)
- Write each event as a single-line JSON object to `events.txt`
- Show progress every 100 events
- Display a success message when complete

### Configuration

Edit the `ROWS_TO_GENERATE` constant in `generate-fake-events.ts` to change the number of events generated:

```typescript
const ROWS_TO_GENERATE = 1000; // Change this value
```

### Output

- **File**: `events.txt` (automatically created in the `scripts` directory)
- **Format**: Each line contains one complete JSON object (JSONL format)

### Output Format

Each line contains a complete JSON object with all transaction event fields:

- **Event details**: event_id, event_time, event_subtype, status
- **Financial data**: amount, sent_amount, sent_currency, received_amount, received_currency, exchange_rate
- **Entities**: sender_entity_id, receiver_entity_id, receiver_entity_type, receiver_instrument_id
- **Fees**: internal_fee, external_fee
- **Blockchain**: transaction_hash
- **Device info**: digital_ip_address, digital_client_fingerprint, device_request_id, device_encrypted_payload
- **Location**: location_type, location_building_number, location_city, location_state, location_postal_code, location_country
- **Custom data**: campaign_id, platform, referral_code, risk_score, user_tier
- **Metadata**: tags, monitor, created_at, updated_at
