import SessionAccessToken from "../../../domain/session/value-objects/session-access-token.vo";

export function bearerHeaders(token: SessionAccessToken): Record<string, string> {
    return {
        Authorization: `Bearer ${token.value}`,
    };
}

export default bearerHeaders;
