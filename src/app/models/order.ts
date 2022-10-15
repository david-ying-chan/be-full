export interface Order {
  id: string;
  dishes: string[];
  price: number;
  done?: boolean;
}
