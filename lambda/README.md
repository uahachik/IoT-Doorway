### Install SAM CLI
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

```sh
  cd lambda
  bash ./bin/aws_sam_cli_install.sh 
```

### Install CFN Lint
https://github.com/aws-cloudformation/cfn-lint

```sh
  brew install cfn-lint
```

### Lint a template.yaml

```sh
  npm run lint
```

### Run deploy init only once to create samconfig.toml (or when you change setup)

```sh
  npm run deploy:init
```

### Check and update if needed, samconfig.toml

### Run  to redeploy Lambda functions

```sh
  npm run deploy
```