export interface ProductDetail {
  id?: string;
  brand?: string;
  model?: string;
  price?: string;
  imgUrl?: string;
  cpu?: string;
  ram?: string;
  os?: string;
  displayResolution?: string;
  battery?: string;
  primaryCamera?: string[];
  secondaryCamera?: string[];
  dimentions?: string;
  weight?: string;
  colors?: string[];
  options?: Options;
}

export interface Option {
  code: number;
  name: string;
}

export interface Options {
  colors: Option[];
  storages: Option[];
}
