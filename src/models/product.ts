export class Product {
    name: string; 
    size: string; 
    unit: string; 
    quantity: number; 
    upc: number; 
    perishable: boolean; 
    brand: string; 
    category: ProductCategory;
    ownerId: string;    
   
}

 export enum ProductCategory {
        ALCOHOL,
        FOOD_AND_DRINK, //EXCLUDING ALCOHOL AND BABY 
        LAUNDRY,
        CLEANING_SUPPLIES,
        PAPER_PRODUCTS,
        OFFICE_SUPPLIES,
        HYGIENE_AND_GROOMING,
        BABY_CARE, //INCLUDES FOOD, DIAPERS, AND WIPES 
        HEALTH_AND_WELLNESS
    }