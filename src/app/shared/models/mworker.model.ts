export interface Mworker {
    id?: number;
    name: string;
    surname: string;
    patronymic: string;
    number: string;
    email: string;
    birthdate: string;
    type: number;
}

export enum MworkerType {
    it,
    sales,
    delivery,
    legal
}

export enum MworkerTypeRu {
    IT,
    Продажи,
    Доставка,
    Юридический
}