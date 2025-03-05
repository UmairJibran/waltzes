#!/bin/bash
# Default to "aws" if no argument is provided, otherwise use the passed command
AWS_CMD=${1:-aws}

# Directory containing the email templates
dir="pre-req/email-templates"

# Loop through all the JSON files in the directory
for file in "$dir"/*.json
do
    # Get the name of the template from the file name
    templateName=$(basename "$file" .json)

    # Check if the template already exists on SES
    if $AWS_CMD ses get-template --template-name "$templateName" > /dev/null 2>&1
    then
        # If the template exists, update it
        echo "Updating template: $templateName"
        $AWS_CMD ses update-template --cli-input-json file://"$file"
    else
        # If the template doesn't exist, create it
        echo "Creating template: $templateName"
        $AWS_CMD ses create-template --cli-input-json file://"$file"
    fi
done
