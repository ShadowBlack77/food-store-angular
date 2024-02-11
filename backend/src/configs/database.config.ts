import { connect, ConnectOptions } from 'mongoose';

export const dbConnect = () => {
  console.log('Try to connect');
  
  connect(process.env.MONGO_URI!).then(
    () => console.log("Connect successfull"),
    (error) => console.log(error)
  );
};