export class FirebaseAuthResult {
    auth: any;
    expires: number;
}

export class FirebaseAuthData {
    uid: string;
    provider: string;
    token: string;
    expires: number;
    auth: Object;
    google?: FirebaseAuthDataGoogle;
    twitter?: FirebaseAuthDataTwitter;
    github?: FirebaseAuthDataGithub;
    facebook?: FirebaseAuthDataFacebook;
    password?: FirebaseAuthDataPassword;
    anonymous?: any;
}
