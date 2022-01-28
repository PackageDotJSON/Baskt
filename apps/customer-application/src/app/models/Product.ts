export interface IProduct {
  category_id: string;
  metaTitle: string;
  upc: string;
  lastUpdate: Date;
  dateUpdated: Date;
  weight: string;
  conditions: number[];
  image: string;
  actualPrice: number;
  ocStatus: number;
  markByAdmin: boolean;
  metaDescription: string;
  model: string;
  secondaryImages: any[];
  isCold: boolean;
  brand: string;
  metaKeyword: string;
  isLocal: boolean;
  researchStatus: number;
  dateAdded: Date;
  priceUrl: string;
  description: string;
  quantity: number;
  location: string[];
  categoryId: string;
  ocNameCombine: string;
  ocDescriptionCombine: string;
  url: string;
  productName: string;
  price: number;
  categoryName: string;
  productDescription: string;
  score: number;
  isFavItem: boolean;
  condition: string;
  selectedQuantity: number;
}

export class Product implements IProduct {
  constructor(
    public category_id: string,
    public metaTitle: string,
    public upc: string,
    public lastUpdate: Date,
    public dateUpdated: Date,
    public weight: string,
    public conditions: number[],
    public image: string,
    public actualPrice: number,
    public ocStatus: number,
    public markByAdmin: boolean,
    public metaDescription: string,
    public model: string,
    public secondaryImages: any[],
    public isCold: boolean,
    public brand: string,
    public metaKeyword: string,
    public isLocal: boolean,
    public researchStatus: number,
    public dateAdded: Date,
    public priceUrl: string,
    public description: string,
    public quantity: number,
    public location: string[],
    public categoryId: string,
    public ocNameCombine: string,
    public ocDescriptionCombine: string,
    public url: string,
    public productName: string,
    public price: number,
    public categoryName: string,
    public productDescription: string,
    public score: number,
    public isFavItem: boolean,
    public condition: string,
    public selectedQuantity: number,
  ) {}
}
