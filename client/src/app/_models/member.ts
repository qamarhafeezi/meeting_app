import { Photo } from "./photo";

export interface Member {
    id: number;
    age: number;
    photoUrl: string;
    userName: string;
    dateOfBirth: Date;
    lastActive: Date;
    created: Date;
    gender: string;
    knownAs: string;
    interests: string;
    city: string;
    country: string;
    introduction: string;
    lookingFor: string;
    photos: Photo[];
}