export interface ProductAttributesDef {
    [slug: string]: string | string[] | [true, string, ...string[]];
}

export interface ProductDef {
    name: string;
    slug: string;
    sku: string;
    price: number;
    compareAtPrice?: number;
    images: string[];
    badges?: string | string[];
    rating: number;
    reviews: number;
    availability: string;
    brand?: string;
    categories?: string[];
    attributes?: ProductAttributesDef;
    compatibility?: 'all' | 'unknown' | number[];
}

export interface PropertyModel {
    name: string;
    city: string;
    address: string;
    bathroomLabel: string;
    bedroomLabel: string;
    bedLabel: string;
    pictures: string[];
    rating: number;
    ameniyies: string;
    price: string;
}
