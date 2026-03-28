# First stage: Build
FROM golang:1.24-alpine

# Install essential build dependencies
RUN apk add --no-cache curl git openssh-client
ARG REPO_NAME
ENV REPO_NAME="${REPO_NAME}"

# Set up Go environment variables
ENV GOPATH="/go"
RUN mkdir -p $GOPATH/bin
ENV PROJECT_PATH="${GOPATH}/${REPO_NAME}"

RUN mkdir -p "${PROJECT_PATH}"
COPY . "${PROJECT_PATH}"

WORKDIR "${PROJECT_PATH}/cmd/server"

# Allow pulling private modules via GitHub authentication
ENV GOPRIVATE="github.com/Smart-Communications/*"
ARG REPO_TOKEN
RUN git config --global url."https://${REPO_TOKEN}@github.com/".insteadOf "https://github.com/"

# Download Go dependencies
RUN go mod tidy && go mod download && go mod verify

ARG COMMIT_HASH
ENV COMMIT_HASH="${COMMIT_HASH}"

# Build the Go executable for Linux
RUN CGO_ENABLED=0 \
    GOOS=linux \
    GOARCH=amd64 \
    go build \
      -ldflags "-X main.Version=${COMMIT_HASH}" \
      -a \
      -installsuffix cgo \
      -o "${GOPATH}/bin/main-linux"

# Second stage: Runtime
FROM alpine:3.20

# Install required runtime dependencies
RUN apk add --no-cache curl python3 unzip && \
    curl "https://s3.amazonaws.com/aws-cli/awscli-bundle.zip" -o "awscli-bundle.zip" && \
    unzip awscli-bundle.zip >/dev/null && \
    python3 awscli-bundle/install -i /usr/local/aws -b /usr/local/bin/aws && \
    rm -rf awscli-bundle awscli-bundle.zip

# Define arguments for GitHub authentication and configuration file
ARG REPO_NAME GITHUB_USER GITHUB_TOKEN CONFIG_FILE ENVIRONMENT
ENV REPO_NAME=${REPO_NAME} GITHUB_USER=${GITHUB_USER} GITHUB_TOKEN=${GITHUB_TOKEN} CONFIG_FILE=${CONFIG_FILE} ENVIRONMENT=${ENVIRONMENT}

# Set AWS Environment variables
ARG AWS_ACCESS_KEY_ID AWS_SECRET_ACCESS_KEY AWS_REGION
ENV AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID} AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY} AWS_REGION=${AWS_REGION}

# Set up environment variables
ENV GOPATH="/go"
ENV PROJECT_PATH="${GOPATH}/${REPO_NAME}"
ENV CONFIG_PATH="${PROJECT_PATH}/config"

# Copy config & migrate files
COPY ./config "${PROJECT_PATH}/config"
COPY ./migrations "${PROJECT_PATH}/migrations"
COPY ./runner.sh "${PROJECT_PATH}/runner.sh"

# Copy built Go executable
COPY --from=0 "${GOPATH}/bin/main-linux" "${GOPATH}/bin/main-linux"

# Expose ports
ARG HTTP_PORT
ARG GRPC_PORT
EXPOSE ${HTTP_PORT}
EXPOSE ${GRPC_PORT}

RUN echo "CONFIG_FILE=${CONFIG_FILE}" \
    && chmod +x "${PROJECT_PATH}/runner.sh"

# Set entrypoint to execute the service script
WORKDIR "${PROJECT_PATH}"
ENTRYPOINT ["./runner.sh"]
