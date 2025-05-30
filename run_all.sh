#!/bin/bash

# Run generate-project.sh
echo "Running generate-project.sh..."
./generate-project.sh

# Check if generate-project.sh succeeded
if [ $? -eq 0 ]; then
  echo "generate-project.sh completed successfully, now running deploy.sh..."
  echo "New project" | ./deploy.sh
else
  echo "generate-project.sh failed, aborting deploy.sh."
  exit 1
fi
