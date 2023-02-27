import { UserState } from "src/user.slice";

export type UserGoogle = {
    email: string;
    name: string;
    family_name: string;
    given_name: string;
}

export type UserGoogleSend = {
    userData: Partial<UserState>;
    credential: string
}