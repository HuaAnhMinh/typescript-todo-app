import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Succeed to connect to database');
})
.catch(() => {
  console.log('Failed to connect to database');
});