const mongoose = require('mongoose');
const Dish = require('./models/Dish');

mongoose.connect('mongodb://localhost:27017/cooknextdoor', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(async () => {
  console.log('Connected to MongoDB');

  // Clear existing data
  await Dish.deleteMany({});

  // Add demo dishes
  const dishes = [
    {
      name: 'Idli Sambar',
      price: 50,
      quantity: 10,
      description: 'Soft idlis served with sambar and chutney',
      seller: 'Amma\'s Kitchen'
    },
    {
      name: 'Dosa',
      price: 40,
      quantity: 15,
      description: 'Crispy dosa with potato filling',
      seller: 'South Spice'
    },
    {
      name: 'Vada',
      price: 30,
      quantity: 20,
      description: 'Crispy lentil fritters',
      seller: 'Home Delights'
    },
    {
      name: 'Pongal',
      price: 45,
      quantity: 8,
      description: 'Traditional rice and lentil dish',
      seller: 'Grandma\'s Recipes'
    },
    {
      name: 'Uttapam',
      price: 55,
      quantity: 12,
      description: 'Thick pancake with vegetables',
      seller: 'Veggie Corner'
    }
  ];

  await Dish.insertMany(dishes);
  console.log('Demo data added');
  process.exit();
})
.catch(err => {
  console.error('Error:', err);
  process.exit(1);
});
