import { Category } from '../models/category.model';

export const INCOME_CATEGORIES: Category[] = [
  {
    id: 1,
    name: 'Income',
    icon: 'assets/wallet.svg',
    subcategories: [
      { id: 101, name: 'Other Income', icon: 'assets/wallet.svg' },
      { id: 102, name: 'Salary', icon: 'assets/subcategory-icons/salary.svg' },
      { id: 103, name: 'Allowance', icon: 'assets/subcategory-icons/allowance.svg' },
      { id: 104, name: 'Wire Transfer', icon: 'assets/subcategory-icons/wire.svg' },
      { id: 105, name: 'Stock', icon: 'assets/subcategory-icons/stock.svg' },
    ]
  },
];