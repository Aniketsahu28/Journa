export type TUserInfo = {
    id: string,
    name: string,
    email: string,
    image: string | null,
    dateOfBirth: Date | null,
    country: string | null
} | null;