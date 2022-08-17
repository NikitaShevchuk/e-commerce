export const splitByComma = (str: string): string[] => {
    if (str && str.includes(',')) return str.split(',')
    else return [str]
}