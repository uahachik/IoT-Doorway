# How to run

### Add variables to the *.env* as specified in the .env.example. Don't forget to change "your-region" and "your-AWS-account-ID"

`npm install`<br/>
`cd pub_sub/`<br/>
apply IoT certificate policy `node IoTCertificatePolicy/applyPolicy.js`
`ln -s ../node_modules node_modules`<br/>
`npm run tsc`<br/>
`node dist/index.js --topic sdk/test/mqtt --message 'Cheers from AWS CLI!'` (params optional)

