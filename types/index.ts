export type User = {
  id: string;
  data: {
    name?: string;
    phoneNumber?: string;
    email?: string;
    online?: boolean;
    address?: string;
    lastLoginTimestamp?: any;
    timestamp: any;
    city?: string;
    bio?: string;
    photoFile?: File | null;
  };
};

export type Recipe = {
  id: string;
  data: {
    title: string;
    cuisine: string;
    photos?: [];
    cookingTime: number;
    ingredients?: [];
    timestamp: any;
  };
};