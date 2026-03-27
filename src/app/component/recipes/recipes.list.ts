export interface Recipe {
  id: string;
  name: string;
  description: string;
}

export interface Category {
  id: string;
  name: string;
  recipes: Recipe[];
}

export const RECIPES: Category[] = [
  {
    id: 'baking',
    name: 'Baking',
    recipes: [{ id: 'gugelhupf', name: 'Gugelhupf', description: 'Marmor Gugelhupf' }],
  },
];
