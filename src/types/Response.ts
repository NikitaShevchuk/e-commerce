export interface Pagination {
    total: number;
    hasNextPage: boolean;
    nextPageNumber: number;
}

export interface DefaultResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    token?: string;
    isAuthorized?: boolean;
    validationErrors?: any[]; //TODO: add validation error interface
    total?: number;
    pagination?: Pagination;
}
