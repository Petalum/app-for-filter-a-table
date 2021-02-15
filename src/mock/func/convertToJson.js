export const convertToJson = (arr) => {
    const json = JSON.stringify(arr, null, 2);
    return json;
}