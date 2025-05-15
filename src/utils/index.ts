export const toFullName = (lastName: string, middleName: string, firstName: string, language: string) => {
    if (language === "vi") {
        return `${lastName ? lastName : ""} ${middleName ? middleName : ""} ${firstName ? firstName : ""}`.trim();
    }
    return `${firstName ? firstName : ""} ${middleName ? middleName : ""} ${lastName ? lastName : ""}`;
};
export const convertBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
});