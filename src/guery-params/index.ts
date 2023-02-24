import qs from "qs";

export const getQueryParams = (query: object, categoryId: string | string[] | undefined) => {
    return qs
        .stringify(query)
        .replace(`categoryId=${categoryId}&`, "")
        .replace(`&categoryId=${categoryId}`, "")
        .replace(`?categoryId=${categoryId}`, "");
};
