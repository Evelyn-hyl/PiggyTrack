import { Category } from '../models/category.model';

export const EXPENSE_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Shop',
    icon: 'assets/category-icons/shop.svg',
    subcategories: [
      { id: 101, name: 'Other Shop', icon: 'assets/category-icons/shop.svg' },
      { id: 102, name: 'Toy', icon: 'assets/subcategory-icons/toy.svg' },
      { id: 103, name: 'Gift', icon: 'assets/subcategory-icons/gift.svg' },
      { id: 104, name: 'Daily', icon: 'assets/subcategory-icons/daily.svg' },
      { id: 105, name: 'Clothing', icon: 'assets/subcategory-icons/clothes.svg' },
      { id: 106, name: 'Furniture', icon: 'assets/subcategory-icons/furniture.svg' },
      { id: 107, name: 'Electronics', icon: 'assets/subcategory-icons/electronics.svg' },
      { id: 108, name: 'Cosmetics', icon: 'assets/subcategory-icons/cosmetics.svg' },
      { id: 109, name: 'Jewelry', icon: 'assets/subcategory-icons/jewelry.svg' },
    ]
  },
  {
    id: 2,
    name: 'Food',
    icon: 'assets/category-icons/food.svg',
    subcategories: [
      { id: 201, name: 'Other Food', icon: 'assets/category-icons/food.svg' },
      { id: 202, name: 'Groceries', icon: 'assets/subcategory-icons/groceries.svg' },
      { id: 203, name: 'Breakfast', icon: 'assets/subcategory-icons/breakfast.svg' },
      { id: 204, name: 'Lunch', icon: 'assets/subcategory-icons/lunch.svg' },
      { id: 205, name: 'Dinner', icon: 'assets/subcategory-icons/dinner.svg' },
      { id: 206, name: 'Dessert', icon: 'assets/subcategory-icons/dessert.svg' },
      { id: 207, name: 'Drinks', icon: 'assets/subcategory-icons/drinks.svg' },
    ]
  },
  {
    id: 3,
    name: 'Traffic',
    icon: 'assets/category-icons/traffic.svg',
    subcategories: [
      { id: 301, name: 'Other Traffic', icon: 'assets/category-icons/traffic.svg' },
      { id: 302, name: 'Parking', icon: 'assets/subcategory-icons/parking.svg' },
      { id: 303, name: 'Gas', icon: 'assets/subcategory-icons/gas.svg' },
      { id: 304, name: 'Taxi', icon: 'assets/subcategory-icons/taxi.svg' },
      { id: 305, name: 'Train', icon: 'assets/subcategory-icons/train.svg' },
      { id: 306, name: 'Airplane', icon: 'assets/subcategory-icons/airplane.svg' },
      { id: 307, name: 'Bus', icon: 'assets/subcategory-icons/bus.svg' },
    ]
  },
  {
    id: 4,
    name: 'Life',
    icon: 'assets/category-icons/life.svg',
    subcategories: [
      { id: 401, name: 'Other Life', icon: 'assets/category-icons/life.svg' },
      { id: 402, name: 'Rent', icon: 'assets/subcategory-icons/rent.svg' },
      { id: 403, name: 'Pet', icon: 'assets/subcategory-icons/pet.svg' },
      { id: 404, name: 'Salon', icon: 'assets/subcategory-icons/salon.svg' },
      { id: 405, name: 'Electricity', icon: 'assets/subcategory-icons/electricity.svg' },
      { id: 406, name: 'WiFi Bill', icon: 'assets/subcategory-icons/wifi.svg' },
      { id: 407, name: 'Phone Bill', icon: 'assets/subcategory-icons/phone.svg' },
      { id: 408, name: 'Fitness', icon: 'assets/subcategory-icons/fitness.svg' },
    ]
  },
];