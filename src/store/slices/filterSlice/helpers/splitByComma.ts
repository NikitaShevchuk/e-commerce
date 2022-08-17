export const splitByComma = (str: string): string[] | null => {
    if (str && str.includes(',')) return str.split(',')
    else if(str && !str.includes(',')) return [str]
    else if (!str) return null
    else return null
}