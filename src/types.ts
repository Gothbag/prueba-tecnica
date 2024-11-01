export enum Product {
  Color = 'color',
  Insider = 'insider',
  Both = 'both',
}

export enum Duration {
  Monthly = 'monthly',
  Yearly = 'yearly',
}

export interface ProductOption {
  name: Product;
  quantity: number;
  duration: Duration;
}
