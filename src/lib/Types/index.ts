export interface Tenant {
  id: string;
  name: string;
  address: string;
}

export interface PriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

export interface Attribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export interface Category {
  _id: string;
  name: string;
  priceConfiguration: PriceConfiguration;
  attributes: Attribute[];
}

export interface ProductAttribute {
  name: string;
  value: string;
}

export interface ProductPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: {
      [key: string]: number;
    };
  };
}

export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  isPublish: boolean;
  attributes: ProductAttribute[];
  priceConfiguration: ProductPriceConfiguration;
  categoryId: string;
  category: Category;
}

export type Topping = {
  _id: string;
  name: string;
  price: number;
  image: string;
  isPublish: boolean;
};
