const express = require('express');
const cors = require('cors')
const { errorHandler, logErrors, boomErrorHandler } = require('./middlewares/error.handler');
const routerApi = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const whitelist = ['http://localhost:8080', 'https://myapp.co']
const options = {
  origin: (origin, cb)=> {
    if(whitelist.includes(origin) || !origin){
      cb(null,true);
    } else {
      cb(new Error('no permitido basurin'))
    }
  }
}

app.use(cors(options));

app.get('/', (req, res) => {
  res.send('Mi server en express basuura');
});

app.get('/nueva-ruta', (req, res) => {
  res.send('Nueva Ruta sape');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log('Mi port ' + port);
});
