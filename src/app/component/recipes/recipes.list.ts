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
    id: 'cooking',
    name: 'Cooking',
    recipes: [
      { id: 'senfgemuese', name: 'Senfgemüse', description: 'Lachs on Senfgemüse' },
      { id: 'rindsgulasch', name: 'Rindsgulasch', description: 'Rindsgulasch' },
      { id: 'risotto', name: 'Risotto', description: 'Risotto' },
      { id: 'stock', name: 'Suppe', description: 'Basic chicken or vegetable stock' },
    ],
  },
  {
    id: 'baking',
    name: 'Baking',
    recipes: [{ id: 'gugelhupf', name: 'Gugelhupf', description: 'Marmor-Gugelhupf' }],
  },
];
