```sh
cd lambda
ln -s ../node_modules node_modules
```
##### Run deploy init only once to create samconfig.toml (or when you change setup)

```sh
npm run deploy:init
```

##### Check and update if needed, samconfig.toml

##### Run  to redeploy Lambda functions

```sh
npm run deploy
```