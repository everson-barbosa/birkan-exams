export type Order = 'desc' | 'asc';

export interface PaginationParams<T> {
  page: number;
  perPage: number;
  order: Order;
  orderBy: T;
}

export interface PaginationMetadata {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
}

export interface PaginationResponse<T> {
  data: T[];
  metadata: PaginationMetadata;
}
