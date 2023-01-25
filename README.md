# typescript-nodejs-practice

# Implementing PM2

```sh
npm i pm2@latest
```

Adding npm start script to run when our pm2 process starts

```sh
pm2 start npm --name "npm start" -- start
pm2 link <PM2_LINK_FROM_PM2.io>
pm2 start "npm start"
```

Now open your PM2.io site here you can check your server metrics.

# Implementing Express Server Status

I have also implemented an simple express server status which shows the basic server metrics. For that we have used 
```console
express-status-monitor
```

First we need the to install the package as dev dependency
```console
npm i -D express-status-monitor
```

Now we first nee to add it inside our app.ts file as a middleware.
```javascript
import status from 'express-status-monitor'
..
..
app.use(status())
```

You can access the status at the **/status** route.

For our app open the following url:
http://localhost:3002/status
