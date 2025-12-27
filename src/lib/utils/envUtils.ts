export let googleApiKey: string;
export let googleClientId: string;

export const setEnvVariables = (gApiKey: string, gClientId: string) => {
  googleApiKey = gApiKey;
  googleClientId = gClientId;
};
