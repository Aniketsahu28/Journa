export const errorMessageMap: Record<string, string> = {
    OAuthSignin: "Couldn't start the login process. Please try again.",
    OAuthCallback: "There was a problem signing in with your account. Please try again.",
    OAuthCreateAccount: "We couldn't create your account using your social login. Please try again later.",
    EmailCreateAccount: "There was an issue creating your account. Please try again.",
    Callback: "Something went wrong during the sign-in process. Please try again.",
    OAuthAccountNotLinked: "This email is already linked with a different sign-in method. Please use the original method.",
    CredentialsSignin: "Incorrect email or password. Please try again.",
    SessionRequired: "You need to be signed in to view this page.",
    default: "Something went wrong. Please try again later.",
};
