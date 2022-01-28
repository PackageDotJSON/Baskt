export interface ICategory {
  category_id: string;
  image: string;
  image2: string;
  name: string;
}

export class Category implements ICategory {
  constructor(
    public category_id: string,
    public image: string,
    public image2: string,
    public name: string,
  ) {}
}
