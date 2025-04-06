# How to run

### Install SAM CLI
https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/install-sam-cli.html

```sh
bash ./bin/aws_sam_cli_install.sh 
```

### Install CFN Lint
https://github.com/aws-cloudformation/cfn-lint

```sh
brew install cfn-lint
```

### Add variables to the *.env* as specified in the .env.example.
###### Don't forget to change "your-region" and "your-AWS-account-ID"

```sh
npm install
```

### read
pub_sub/README.md
### then read
lambda/README.md

---


### to validate a template.yaml run
```sh
npm run lint
```


