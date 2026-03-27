export interface RecipeModel {
  name: string;
  category: string;
  description: string;
  image: string;
  prepTime: string;
  cookTime: string;
  difficulty: string;
  portions: number;
  ingredients: { name: string; amount: string }[];
  steps: string[];
  nutrition: {
    calories: number;
    fat: number;
    carbs: number;
    protein: number;
  };
}
