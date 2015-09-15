import express from 'express';
import AsyncCompiler from 'async-compiler';


let app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');

  let compiler = new AsyncCompiler({
    s3KeyId: process.env.AWS_ACCESS_ID,
    s3AccessKey: process.env.AWS_ACCESS_KEY,
    defaultBucket: process.env.AWS_S3_BUCKET,
  });

  return compiler.fetchCompileAndMerge('home')
    .then(renderedTemplate => {
      return res.send(renderedTemplate);
    })
    .catch(err => {
      console.log(err);
      res.status(500).end();
    });

});


const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});