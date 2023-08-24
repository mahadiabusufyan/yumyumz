export type User = {
  id: string;
  data: {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    email?: string;
    online?: boolean;
    address?: string;
    lastLoginTimestamp?: any;
    lastUpdateTimestamp?: any;
    timestamp: any;
    city?: string;
    bio?: string;
    photoURL?: string;
    photoFile?: File | null;
  };
};

export type Recipe = {
  id: string;
  data: {
    title: string;
    cuisine: string;
    imgUrls: string[];
    cookingTime: number;
    ingredients?: [];
    instructions: any;
    timestamp: any;
    slug: string;
    difficulty: string;
    ownerRef: string;
  };
};
