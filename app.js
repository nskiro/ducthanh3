const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const frameguard = require('frameguard')
const jwt = require('./helper');
const db = require('./db');
// main route
const uploadRouter = require('./routes/upload');
const userRouter = require('./routes/user');
const qaRouter = require('./routes/qaqc');
const planningRouter = require('./routes/planning');
const markerRouter = require('./routes/marker');
const sampleRouter = require('./routes/sample');
const productionRouter = require('./routes/production');
const embroideryRouter = require('./routes/embroidery');
const packagingRouter = require('./routes/packaging');

const fabricproviderRouter =  require('./routes/fabraric/fabricprovider');
const fabricRouter =require('./routes/fabraric/fabric');
const fabriccolorRouter =require('./routes/fabraric/fabriccolor');
const fabrictypeRouter =require('./routes/fabraric/fabrictype');

const app = express();

// CORS setup
app.use(cors());

// session setup
app.use(session({
  secret: 'ducthanh3',
  resave: true,
  saveUninitialized: false
}));

// file upload setup
app.use(fileUpload());

app.set('views', path.join(__dirname, 'client/build'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'upload')));
app.use(express.static(path.join(__dirname, 'client/build')));

app.use('/user', userRouter);
app.use('/api/upload',uploadRouter);
app.use('/api/qaqc',qaRouter);
app.use('/api/planning',planningRouter);
app.use('/api/marker',markerRouter);
app.use('/api/sample',sampleRouter);
app.use('/api/production',productionRouter);
app.use('/api/embroidery',embroideryRouter);
app.use('/api/packaging',packagingRouter);
app.use('/api/fabric/provider',fabricproviderRouter);
app.use('/api/fabric',fabricRouter);

// route middleware to verify a token
app.use((req, res, next) => {
  console.log(req.path);
  if(req.path.match(/\/file\//)){
    next();
  }
  else{
    // check header or url parameters or post parameters for token
    var header = req.headers.authorization.split(' ');
    var token = header[1];
    // decode token
    if (!jwt.verifyToken(token)) {
      return res.status(401).send('Failed to authenticate token.');    
    } else {
      // if everything is good, save to request for use in other routes 
      next();
    }
  }
});


//app.use('/api/fabriccolor',fabriccolorRouter);
//app.use('/api/fabrictype',fabrictypeRouter);

app.get('*', (req,res)=>{
  res.render('index');
})
// catch 404 and forward to error handler
app.use((req, res, next)=> {
  next(createError(404));
});

// error handler
app.use((err, req, res, next)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).send(err.message);
});

module.exports = app;
