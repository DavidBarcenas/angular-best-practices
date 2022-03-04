export interface ApiResponse<T> extends ApiPagination {
  succeeded: boolean;
  message: string;
  errors: null;
  data: T;
}

interface ApiPagination {
  pageNumber?: number;
  pageSize?: number;
  totalPages?: number;
  totalItems?: number;
}
