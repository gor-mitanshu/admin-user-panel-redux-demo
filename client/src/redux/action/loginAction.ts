import { TOKEN_UPDATE } from "../actionType/loginActionType";

export const loginTokenUpdate = (token: string) => ({
  type: TOKEN_UPDATE,
  payload: token,
});
