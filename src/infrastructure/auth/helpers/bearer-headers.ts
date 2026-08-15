import AccessToken from "../../../domain/auth/value-objects/access-token.vo";

export function bearerHeaders(token: AccessToken): Record<string, string> {
    return {
        Authorization: `Bearer ${token.value}`,
    };
}

export default bearerHeaders;
