import express, { Request, Response} from 'express';
// import cookieSession from 'cookie-session';
import expressSession from 'express-session'
import { AppRouter } from './AppRouter';
import './controllers/UserController'
import './controllers/ProductController';
import './controllers/OrderController';
import './controllers/ContactController';


import 'dotenv/config'
import cors from 'cors';
import path from 'path'
import errorHandler from './middleware/ErrorHandlingMiddleware'


const app = express();
app.use(cors());



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(cookieSession({ keys: ['asfadsfadfs'] }));


app.use(
  expressSession({
    secret: 'sjsjkfrjkfkrjf',
    resave: true,
    saveUninitialized: false,
  })
);


app.use(AppRouter.getInstance());

// app.use(express.static(path.resolve(__dirname, 'client/build'))) 

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'index.html'))
}) 

app.use(errorHandler);

let PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
