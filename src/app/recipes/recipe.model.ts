import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
  public id: number| undefined;
  public name: string;
  public description: string;
  public imagePath: string;
  public ingredients: Ingredient[];

  constructor(
    name: string,
    desc: string,
    imagePath: string,
    ingredients: Ingredient[],
    id?: number,
  ) {
    this.name = name;
    this.id = id;
    this.description = desc;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
