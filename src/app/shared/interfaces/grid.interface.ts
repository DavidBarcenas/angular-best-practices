export interface GridColumns {
  name: string;
  key: string | string[];
}

export interface GridDataColumns extends GridColumns {
  slug: string;
}
