export let googleApiKey: string;
export let googleClientId: string;

export function setEnvVariables(gApiKey: string, gClientId: string) {
  googleApiKey = gApiKey;
  googleClientId = gClientId;
}
