export interface IPageParams {
  pageNumber: number;
  pageSize: number;
  totalElements?: number;
  totalPages?: number;
  firstPage?: boolean;
  lastPage?: boolean;
}
