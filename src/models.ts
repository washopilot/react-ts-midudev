export interface Sub {
    nick: string;
    subMonths: number;
    avatar: string;
    description?: string;
}

export interface SubFromApi {
    description: string;
    months: number;
    nick: string;
    profileUrl: string;
}
