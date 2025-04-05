#!/bin/bash

cd lambda
curl -Lo aws-sam-cli.pkg https://github.com/aws/aws-sam-cli/releases/latest/download/aws-sam-cli-macos-x86_64.pkg && sudo installer -pkg aws-sam-cli.pkg -target /
sam --version
rm aws-sam-cli.pkg
