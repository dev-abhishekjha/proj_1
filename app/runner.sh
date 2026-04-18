#!/bin/sh
echo "Running Version 1.0.0"

# Fetch config depending on environment
# STG / STG-FT → GitHub
# UAT / PROD   → AWS Secrets Manager

if [ "$CONFIG_FILE" != "local.example.yml" ]; then
  echo "Environment: $ENVIRONMENT"
  if [ "$ENVIRONMENT" = "stg" ] || [ "$ENVIRONMENT" = "stg-ft" ]; then
    echo "Getting the Latest Version of $CONFIG_FILE from Config Repository."

  # Fetch the configuration file from GitHub
    curl -f \
      -H "Authorization: token ${GITHUB_TOKEN}" \
      -H "Accept: application/vnd.github.v3.raw" \
      -L "https://api.github.com/repos/fyscaltech/apollo-config/contents/services/boilerplate/${CONFIG_FILE}?ref=main" \
      -o "$CONFIG_PATH/$CONFIG_FILE" || (echo "Failed to download ${CONFIG_FILE} from GitHub" && exit 1)

  echo "Finished Getting $CONFIG_FILE from Config Repository."
  else
    echo "Getting $CONFIG_FILE from AWS Secrets Manager..."

    aws secretsmanager get-secret-value \
      --output text \
      --query SecretString \
      --secret-id "$CONFIG_FILE" \
      > "$CONFIG_PATH/$CONFIG_FILE" \
      || (echo "Failed to fetch ${CONFIG_FILE} from AWS Secrets Manager" && exit 1)

    echo "Finished Getting $CONFIG_FILE from Config Repository."
  fi
fi

echo "Running Binary: $Saranam"
/go/bin/main-linux --config "$CONFIG_PATH/$CONFIG_FILE"
