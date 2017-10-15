https://hacks.mozilla.org/2017/10/multi-user-experiences-with-a-frame/

https://github.com/delapuente/aframe-sharedspace-component



-----------------------------

Sometimes you want to test your application in environment closer to the real world. In such cases you might need to run it over TLS.

Here are two simple steps, which can be used to achieve this result:
Generate self-signed certificate

If you don’t already have certificate you need to generate one:

  $ openssl req -x509 -newkey rsa:2048 -keyout key.pem -out cert.pem -days 365

You will be asked a couple of questions… Certificate generation

In this case we generated a self-signed certificate for 365 days.
Use Express with HTTPS

    var fs = require('fs'),
    https = require('https'),
    express = require('express'),
    app = express();

    https.createServer({
      key: fs.readFileSync('key.pem'),
      cert: fs.readFileSync('cert.pem')
    }, app).listen(55555);

    app.get('/', function (req, res) {
      res.header('Content-type', 'text/html');
      return res.end('<h1>Hello, Secure World!</h1>');
    });

This script will create Express application running over HTTPs. Run the application:

    $ node index.js

Enter the passphrase you entered during the creation of the certificate…

Now open your browser: https://localhost:55555/. After trusting the certificate you’d be done!

PS: Note that you may get error like:

mgechev → MinBook Pro ~/Desktop/test Thu Apr 30 11:56:03
 $ node index.js
_tls_common.js:67
      c.context.setKey(options.key);
                ^
Error: error:0906A068:PEM routines:PEM_do_header:bad password read
    at Error (native)
    at Object.createSecureContext (_tls_common.js:67:17)
    at Server (_tls_wrap.js:595:25)
    at new Server (https.js:36:14)
    at Object.exports.createServer (https.js:56:10)
    at Object.<anonymous> (/Users/mgechev/Desktop/test/index.js:6:11)
    at Module._compile (module.js:449:26)
    at Object.Module._extensions..js (module.js:467:10)
    at Module.load (module.js:349:32)
    at Function.Module._load (module.js:305:12)

In this case you need to remove the pass:

openssl rsa -in key.pem -out newkey.pem && mv newkey.pem key.pem



-----------------------------
Another way to generate certificates,

openssl req -new -newkey rsa:2048 -nodes -out mydomain.csr -keyout private.key
https://letsencrypt.org/ will give you a free certificate.



https://www.whatsthatlambda.com/nodejs/creating-an-https-server-with-nodejs-and-express

http://blog.mgechev.com/2014/02/19/create-https-tls-ssl-application-with-express-nodejs/