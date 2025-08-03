#!/bin/bash

# Generate a timestamp
TIMESTAMP=$(date +%Y-%m-%d_%H-%M-%S)

# Define the backup file name
BACKUP_NAME="react-postgres-backup-${TIMESTAMP}.tar.gz"

# Create the compressed archive, excluding node_modules and the backup script itself
tar -czf ${BACKUP_NAME} --exclude='*/node_modules'  .

echo "Backup created: ${BACKUP_NAME}"
