# How to run

  #### add to the *.env:*
    AWS_ENDPOINT="a2jggfrbjuxysrf-assf.iot.us-west-1.amazonaws.com"
    AWS_IOT_CERT="[NameOfThing].cert.pem"
    AWS_IOT_KEY="[NameOfThing].private.key"

  `npm install`<br/>
  `cd pub_sub/`<br/>
  `ln -s ../node_modules node_modules`<br/>
  `npm run tsc`<br/>
  `node dist/index.js --topic sdk/test/mqtt --message 'Cheers from AWS CLI!'` (params optional)

