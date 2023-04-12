export interface Pagination {
    total: number;
    hasNextPage: boolean;
    nextPageNumber: number;
}

export interface ValidationError {
    location: string;
    msg: string;
    param: string;
    value: string;
}

export interface DefaultResponse<T> {
    success: boolean;
    data: T;
    message?: string;
    token?: string;
    isAuthorized?: boolean;
    validationErrors?: ValidationError[];
    total?: number;
    pagination?: Pagination;
}
