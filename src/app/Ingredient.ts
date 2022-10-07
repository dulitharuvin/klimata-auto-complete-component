export class Ingredient {
  public id: string;
  public name: string;

  constructor(o: any) {
    this.id = o['id'] ?? '';
    this.name = o['name'] ?? '';
  }
}
