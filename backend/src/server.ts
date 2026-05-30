import app from './app';
import connectDB from './config/db';
import { seedDatabase } from './seedData';

const PORT = process.env.PORT || 5000;

connectDB().then(async () => {
  await seedDatabase();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
