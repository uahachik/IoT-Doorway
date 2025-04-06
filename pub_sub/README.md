```sh
cd pub_sub
ln -s ../node_modules node_modules
```

create IoT policies with sam\
`
sam build && sam deploy --stack-name '<your-stack-name>'
`\
then attach them to a certificate in the AWS IoT > Security > Certificates console
##### OR
create IoT policies and attach them to a certificate by running
```sh
node bin/applyIoTPolicy.mjs
```
##### to publish to a topic run
```sh
npm run build
node dist/index.js --topic sdk/test/mqtt --message 'Cheers from AWS CLI!' (params optional)
```
