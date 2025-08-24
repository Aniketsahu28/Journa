export const modifyCategoyNameStyleForUrl = (categoryName: string) => {
    return categoryName.split(" ").join("-").toLocaleLowerCase();
};