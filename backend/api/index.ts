import app from '../src/app';
import connectDB from '../src/config/db';
import { seedDatabase } from '../src/seedData';

// Connect to the database and seed it if not already connected
connectDB().then(async () => {
    await seedDatabase();
}).catch(console.error);

export default app;
