export interface User {
    id: string;
    uuid: string;
    password: string;
    article: string;
    profile: Profile;
}

export interface Profile {
    username: string;
    profileImageURL: string;
    twitterURL: string;
    facebookURL: string;
    description: string;
}