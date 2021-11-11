export type CredentialsPayload = {
    username: string;
    password: string;
    domain: string;
    ldapUrl: string;
}

export type LoginResponse = {
    result: string;
}
