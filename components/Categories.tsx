"use client";

import { useEffect, useMemo, useState } from "react";

type Category = {
  id: string;
  name: string;
  icon: string;
  image: string;
  description: string;
};

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  images?: string[];
};

type CartItem = Product & {
  quantity: number;
};

const categories: Category[] = [
  {
    id: "beds",
    name: "Beds",
    icon: "🛏️",
    image: "/images/categories/01-beds.png",
    description: "Explore available beds for your home.",
  },
  {
    id: "sofas",
    name: "Sofa Sets",
    icon: "🛋️",
    image: "/images/categories/02-sofa-sets.png",
    description: "Comfortable sofa sets for your living space.",
  },
  {
    id: "almira-wardrobes",
    name: "Almira & Wardrobes",
    icon: "🚪",
    image: "/images/categories/almira-wardrobes.png",
    description: "Smart storage and stylish wardrobes for your home.",
  },
  {
    id: "tables",
    name: "Tables",
    icon: "🪑",
    image: "/images/categories/05-tables.png",
    description: "Tables for different home requirements.",
  },
  {
    id: "smart-tv",
    name: "Smart TVs",
    icon: "📺",
    image: "/images/categories/06-smart-tvs.png",
    description: "Smart entertainment options for your home.",
  },
  {
    id: "refrigerators",
    name: "Refrigerators",
    icon: "🧊",
    image: "/images/categories/07-refrigerators.png",
    description: "Refrigerators and cooling solutions.",
  },
  {
    id: "washing-machines",
    name: "Washing Machines",
    icon: "🧺",
    image: "/images/categories/08-washing-machines.png",
    description: "Washing machines for everyday convenience.",
  },
  {
    id: "coolers-ac",
    name: "Coolers & AC",
    icon: "❄️",
    image: "/images/categories/coolers-ac.png",
    description: "Cooling solutions for every season.",
  },
  {
    id: "kitchen-appliances",
    name: "Kitchen Appliances",
    icon: "🍳",
    image: "/images/categories/11-kitchen-appliances.png",
    description: "Useful appliances for everyday cooking.",
  },
  {
    id: "mattresses",
    name: "Mattresses",
    icon: "🛏️",
    image: "/images/categories/12-mattresses.png",
    description: "Comfortable mattresses for better sleep.",
  },
  {
    id: "home-appliances",
    name: "Home Appliances",
    icon: "🏠",
    image: "/images/categories/home-appliances.png",
    description: "Everyday appliances to make home life easier.",
  },
  {
    id: "heaters-geysers",
    name: "Heaters & Geysers",
    icon: "♨️",
    image: "/images/categories/heaters-geysers.png",
    description: "Warmth and hot water for cooler days.",
  },
];

/*
  PRICE SETUP

  Prices are currently kept at 0 because you said
  we will add the actual product details and prices later.

  When you have the prices, simply change:
  price: 0
  to something like:
  price: 25000
*/

const products: Product[] = [
  // BEDS — put the 27 JPEG files in public/images/products/beds/.
  // Prices are set to 0 until you provide the actual showroom prices.
  {
    id: "bed-1",
    name: "Bed 01",
    category: "beds",
    price: 15999,
    images: [
      "/images/products/beds/bed-01-1.jpeg",
      "/images/products/beds/bed-01-2.jpeg",
      "/images/products/beds/-01-3.jpeg",
    ],
  },
  {
    id: "bed-2",
    name: "Bed 02",
    category: "beds",
    price: 22999,
    images: [
      "/images/products/beds/bed-02-1.jpeg",
      "/images/products/beds/bed-02-2.jpeg",
      "/images/products/beds/bed-02-3.jpeg",
    ],
  },
  {
    id: "bed-3",
    name: "Bed 03",
    category: "beds",
    price: 20999,
    images: [
      "/images/products/beds/bed-03-1.jpeg",
      "/images/products/beds/bed-03-2.jpeg",
      "/images/products/beds/bed-03-3.jpeg",
    ],
  },
  {
    id: "bed-4",
    name: "Bed 04",
    category: "beds",
    price: 15999,
    images: [
      "/images/products/beds/bed-04-1.jpeg",
      "/images/products/beds/bed-04-2.jpeg",
      "/images/products/beds/bed-04-3.jpeg",
    ],
  },
  {
    id: "bed-5",
    name: "Bed 05",
    category: "beds",
    price: 19999,
    images: [
      "/images/products/beds/bed-05-1.jpeg",
      "/images/products/beds/bed-05-2.jpeg",
      "/images/products/beds/bed-05-3.jpeg",
    ],
  },
  {
    id: "bed-6",
    name: "Bed 06",
    category: "beds",
    price: 16999,
    images: [
      "/images/products/beds/bed-06-1.jpeg",
      "/images/products/beds/bed-06-2.jpeg",
      "/images/products/beds/bed-06-3.jpeg",
    ],
  },
  {
    id: "bed-7",
    name: "Bed 07",
    category: "beds",
    price: 19999,
    images: [
      "/images/products/beds/bed-07-1.jpeg",
      "/images/products/beds/bed-07-2.jpeg",
      "/images/products/beds/bed-07-3.jpeg",
    ],
  },
  {
    id: "bed-8",
    name: "Bed 08",
    category: "beds",
    price: 14999,
    images: [
      "/images/products/beds/bed-08-1.jpeg",
      "/images/products/beds/bed-08-2.jpeg",
      "/images/products/beds/bed-08-3.jpeg",
    ],
  },
  {
    id: "bed-9",
    name: "Bed 09",
    category: "beds",
    price: 12999,
    images: [
      "/images/products/beds/bed-09-1.jpeg",
      "/images/products/beds/bed-09-2.jpeg",
      "/images/products/beds/bed-09-3.jpeg",
    ],
  },
  // SOFAS — place the 24 JPEG images in public/images/products/sofas/.
  // Each sofa has one main image and three additional product views.
  {
    id: "sofa-1",
    name: "Sofa 01",
    category: "sofas",
    price: 9999,
    images: [
      "/images/products/sofas/sofa-01-1.jpeg",
      "/images/products/sofas/sofa-01-2.jpeg",
      "/images/products/sofas/sofa-01-3.jpeg",
      "/images/products/sofas/sofa-01-4.jpeg",
    ],
  },
  {
    id: "sofa-2",
    name: "Sofa 02",
    category: "sofas",
    price: 9999,
    images: [
      "/images/products/sofas/sofa-02-1.jpeg",
      "/images/products/sofas/sofa-02-2.jpeg",
      "/images/products/sofas/sofa-02-3.jpeg",
      "/images/products/sofas/sofa-02-4.jpeg",
    ],
  },
  {
    id: "sofa-3",
    name: "Sofa 03",
    category: "sofas",
    price: 17999,
    images: [
      "/images/products/sofas/sofa-03-1.jpeg",
      "/images/products/sofas/sofa-03-2.jpeg",
      "/images/products/sofas/sofa-03-3.jpeg",
      "/images/products/sofas/sofa-03-4.jpeg",
    ],
  },
  {
    id: "sofa-4",
    name: "Sofa 04",
    category: "sofas",
    price: 11999,
    images: [
      "/images/products/sofas/sofa-04-1.jpeg",
      "/images/products/sofas/sofa-04-2.jpeg",
      "/images/products/sofas/sofa-04-3.jpeg",
      "/images/products/sofas/sofa-04-4.jpeg",
    ],
  },
  {
    id: "sofa-5",
    name: "Sofa 05",
    category: "sofas",
    price: 9999,
    images: [
      "/images/products/sofas/sofa-05-1.jpeg",
      "/images/products/sofas/sofa-05-2.jpeg",
      "/images/products/sofas/sofa-05-3.jpeg",
      "/images/products/sofas/sofa-05-4.jpeg",
    ],
  },
  {
    id: "sofa-6",
    name: "Sofa 06",
    category: "sofas",
    price: 20999,
    images: [
      "/images/products/sofas/sofa-06-1.jpeg",
      "/images/products/sofas/sofa-06-2.jpeg",
      "/images/products/sofas/sofa-06-3.jpeg",
      "/images/products/sofas/sofa-06-4.jpeg",
    ],
  },

  // ALMIRAS — place all 18 JPEG images in public/images/products/almiras/.
  // Each almira has one main image and two additional views.
  {
    id: "almira-1",
    name: "Almira 01",
    category: "almira-wardrobes",
    price: 11499,
    images: [
      "/images/products/almiras/almira-01-1.jpeg",
      "/images/products/almiras/almira-01-2.jpeg",
      "/images/products/almiras/almira-01-3.jpeg",
    ],
  },
  {
    id: "almira-2",
    name: "Almira 02",
    category: "almira-wardrobes",
    price: 14999,
    images: [
      "/images/products/almiras/almira-02-1.jpeg",
      "/images/products/almiras/almira-02-2.jpeg",
      "/images/products/almiras/almira-02-3.jpeg",
    ],
  },
  {
    id: "almira-3",
    name: "Almira 03",
    category: "almira-wardrobes",
    price: 17999,
    images: [
      "/images/products/almiras/almira-03-1.jpeg",
      "/images/products/almiras/almira-03-2.jpeg",
      "/images/products/almiras/almira-03-3.jpeg",
    ],
  },
  {
    id: "almira-4",
    name: "Almira 04",
    category: "almira-wardrobes",
    price: 11499,
    images: [
      "/images/products/almiras/almira-04-1.jpeg",
      "/images/products/almiras/almira-04-2.jpeg",
      "/images/products/almiras/almira-04-3.jpeg",
    ],
  },
  {
    id: "almira-5",
    name: "Almira 05",
    category: "almira-wardrobes",
    price: 7999,
    images: [
      "/images/products/almiras/almira-05-1.jpeg",
      "/images/products/almiras/almira-05-2.jpeg",
      "/images/products/almiras/almira-05-3.jpeg",
    ],
  },
  {
    id: "almira-6",
    name: "Almira 06",
    category: "almira-wardrobes",
    price: 12499,
    images: [
      "/images/products/almiras/almira-06-1.jpeg",
      "/images/products/almiras/almira-06-2.jpeg",
      "/images/products/almiras/almira-06-3.jpeg",
    ],
  },

  // WARDROBES — place 9 JPEG images in public/images/products/wardrobes/.
  // Each wardrobe has one main image and two additional views.
  {
    id: "wardrobe-1",
    name: "Wardrobe 01",
    category: "almira-wardrobes",
    price: 2999,
    images: [
      "/images/products/wardrobes/wardrobe-01-1.jpeg",
      "/images/products/wardrobes/wardrobe-01-2.jpeg",
      "/images/products/wardrobes/wardrobe-01-3.jpeg",
    ],
  },
  {
    id: "wardrobe-2",
    name: "Wardrobe 02",
    category: "almira-wardrobes",
    price: 2999,
    images: [
      "/images/products/wardrobes/wardrobe-02-1.jpeg",
      "/images/products/wardrobes/wardrobe-02-2.jpeg",
      "/images/products/wardrobes/wardrobe-02-3.jpeg",
    ],
  },
  {
    id: "wardrobe-3",
    name: "Wardrobe 03",
    category: "almira-wardrobes",
    price: 4999,
    images: [
      "/images/products/wardrobes/wardrobe-03-1.jpeg",
      "/images/products/wardrobes/wardrobe-03-2.jpeg",
      "/images/products/wardrobes/wardrobe-03-3.jpeg",
    ],
  },

  // TABLES — place 3 JPEG images in public/images/products/tables/.
  {
    id: "table-1",
    name: "Table 01",
    category: "tables",
    price: 4999,
    images: ["/images/products/tables/table-01-1.jpeg"],
  },
  {
    id: "table-2",
    name: "Table 02",
    category: "tables",
    price: 2999,
    images: ["/images/products/tables/table-02-1.jpeg"],
  },
  {
    id: "table-3",
    name: "Table 03",
    category: "tables",
    price: 4999,
    images: ["/images/products/tables/table-03-1.jpeg"],
  },

  // SMART TVs — place 8 JPEG images in public/images/products/tvs/.
  // Each TV has one main image.
  {
    id: "tv-1",
    name: "Panasonic 32 inch",
    category: "smart-tv",
    price: 16499,
    images: ["/images/products/tvs/tv-01-1.jpeg"],
  },
  {
    id: "tv-2",
    name: "Samsung 43 inch",
    category: "smart-tv",
    price: 26499,
    images: ["/images/products/tvs/tv-02-1.jpeg"],
  },
  {
    id: "tv-3",
    name: "T-Series 50 inch",
    category: "smart-tv",
    price: 34499,
    images: ["/images/products/tvs/tv-03-1.jpeg"],
  },
  {
    id: "tv-4",
    name: "Samsung 32 inch",
    category: "smart-tv",
    price: 16499,
    images: ["/images/products/tvs/tv-04-1.jpeg"],
  },
  {
    id: "tv-5",
    name: "Panasonic 42 inch",
    category: "smart-tv",
    price: 29499,
    images: ["/images/products/tvs/tv-05-1.jpeg"],
  },
  {
    id: "tv-6",
    name: "Samsung 50 inch",
    category: "smart-tv",
    price: 41999,
    images: ["/images/products/tvs/tv-06-1.jpeg"],
  },


  // REFRIGERATORS — place all 28 JPEG images in public/images/products/refrigerators/.
  // Each refrigerator has one main image and three additional views.
  {
    id: "fridge-1",
    name: "Refrigerator 01",
    category: "refrigerators",
    price: 24999,
    images: [
      "/images/products/refrigerators/fridge-01-1.jpeg",
      "/images/products/refrigerators/fridge-01-2.jpeg",
      "/images/products/refrigerators/fridge-01-3.jpeg",
      "/images/products/refrigerators/fridge-01-4.jpeg",
    ],
  },
  {
    id: "fridge-2",
    name: "Refrigerator 02",
    category: "refrigerators",
    price: 25499,
    images: [
      "/images/products/refrigerators/fridge-02-1.jpeg",
      "/images/products/refrigerators/fridge-02-2.jpeg",
      "/images/products/refrigerators/fridge-02-3.jpeg",
      "/images/products/refrigerators/fridge-02-4.jpeg",
    ],
  },
  {
    id: "fridge-3",
    name: "Refrigerator 03",
    category: "refrigerators",
    price: 31999,
    images: [
      "/images/products/refrigerators/fridge-03-1.jpeg",
      "/images/products/refrigerators/fridge-03-2.jpeg",
      "/images/products/refrigerators/fridge-03-3.jpeg",
      "/images/products/refrigerators/fridge-03-4.jpeg",
    ],
  },
  {
    id: "fridge-4",
    name: "Refrigerator 04",
    category: "refrigerators",
    price: 24499,
    images: [
      "/images/products/refrigerators/fridge-04-1.jpeg",
      "/images/products/refrigerators/fridge-04-2.jpeg",
      "/images/products/refrigerators/fridge-04-3.jpeg",
      "/images/products/refrigerators/fridge-04-4.jpeg",
    ],
  },
  {
    id: "fridge-5",
    name: "Refrigerator 05",
    category: "refrigerators",
    price: 24999,
    images: [
      "/images/products/refrigerators/fridge-05-1.jpeg",
      "/images/products/refrigerators/fridge-05-2.jpeg",
      "/images/products/refrigerators/fridge-05-3.jpeg",
      "/images/products/refrigerators/fridge-05-4.jpeg",
    ],
  },
  {
    id: "fridge-6",
    name: "Refrigerator 06",
    category: "refrigerators",
    price: 17499,
    images: [
      "/images/products/refrigerators/fridge-06-1.jpeg",
      "/images/products/refrigerators/fridge-06-2.jpeg",
      "/images/products/refrigerators/fridge-06-3.jpeg",
      "/images/products/refrigerators/fridge-06-4.jpeg",
    ],
  },
  {
    id: "fridge-7",
    name: "Refrigerator 07",
    category: "refrigerators",
    price: 17299,
    images: [
      "/images/products/refrigerators/fridge-07-1.jpeg",
      "/images/products/refrigerators/fridge-07-2.jpeg",
      "/images/products/refrigerators/fridge-07-3.jpeg",
      "/images/products/refrigerators/fridge-07-4.jpeg",
    ],
  },

  // WASHING MACHINES — place 30 JPEG images in public/images/products/washing-machines/.
  // Each washing machine has one main image and two additional views.
  {
    id: "washing-1",
    name: "Washing Machine 01",
    category: "washing-machines",
    price: 11999,
    images: [
      "/images/products/washing-machines/washing-machine-01-1.jpeg",
      "/images/products/washing-machines/washing-machine-01-2.jpeg",
      "/images/products/washing-machines/washing-machine-01-3.jpeg",
    ],
  },
  {
    id: "washing-2",
    name: "Washing Machine 02",
    category: "washing-machines",
    price: 15799,
    images: [
      "/images/products/washing-machines/washing-machine-02-1.jpeg",
      "/images/products/washing-machines/washing-machine-02-2.jpeg",
      "/images/products/washing-machines/washing-machine-02-3.jpeg",
    ],
  },
  {
    id: "washing-3",
    name: "Washing Machine 03",
    category: "washing-machines",
    price: 14799,
    images: [
      "/images/products/washing-machines/washing-machine-03-1.jpeg",
      "/images/products/washing-machines/washing-machine-03-2.jpeg",
      "/images/products/washing-machines/washing-machine-03-3.jpeg",
    ],
  },
  {
    id: "washing-4",
    name: "Washing Machine 04",
    category: "washing-machines",
    price: 14499,
    images: [
      "/images/products/washing-machines/washing-machine-04-1.jpeg",
      "/images/products/washing-machines/washing-machine-04-2.jpeg",
      "/images/products/washing-machines/washing-machine-04-3.jpeg",
    ],
  },
  {
    id: "washing-5",
    name: "Washing Machine 05",
    category: "washing-machines",
    price: 15499,
    images: [
      "/images/products/washing-machines/washing-machine-05-1.jpeg",
      "/images/products/washing-machines/washing-machine-05-2.jpeg",
      "/images/products/washing-machines/washing-machine-05-3.jpeg",
    ],
  },
  {
    id: "washing-6",
    name: "Washing Machine 06",
    category: "washing-machines",
    price: 14999,
    images: [
      "/images/products/washing-machines/washing-machine-06-1.jpeg",
      "/images/products/washing-machines/washing-machine-06-2.jpeg",
      "/images/products/washing-machines/washing-machine-06-3.jpeg",
    ],
  },
  {
    id: "washing-7",
    name: "Washing Machine 07",
    category: "washing-machines",
    price: 11999,
    images: [
      "/images/products/washing-machines/washing-machine-07-1.jpeg",
      "/images/products/washing-machines/washing-machine-07-2.jpeg",
      "/images/products/washing-machines/washing-machine-07-3.jpeg",
    ],
  },
  {
    id: "washing-8",
    name: "Washing Machine 08",
    category: "washing-machines",
    price: 15499,
    images: [
      "/images/products/washing-machines/washing-machine-08-1.jpeg",
      "/images/products/washing-machines/washing-machine-08-2.jpeg",
      "/images/products/washing-machines/washing-machine-08-3.jpeg",
    ],
  },
  {
    id: "washing-9",
    name: "Washing Machine 09",
    category: "washing-machines",
    price: 17799,
    images: [
      "/images/products/washing-machines/washing-machine-09-1.jpeg",
      "/images/products/washing-machines/washing-machine-09-2.jpeg",
      "/images/products/washing-machines/washing-machine-09-3.jpeg",
    ],
  },
  {
    id: "washing-10",
    name: "Washing Machine 10",
    category: "washing-machines",
    price: 20999,
    images: [
      "/images/products/washing-machines/washing-machine-10-1.jpeg",
      "/images/products/washing-machines/washing-machine-10-2.jpeg",
      "/images/products/washing-machines/washing-machine-10-3.jpeg",
    ],
  },

  // COOLERS — place 24 JPEG images in public/images/products/coolers/.
  // Each cooler has one main image and two additional views.
  {
    id: "cooler-1",
    name: "Cooler 01",
    category: "coolers-ac",
    price: 4499,
    images: [
      "/images/products/coolers/cooler-01-1.jpeg",
      "/images/products/coolers/cooler-01-2.jpeg",
      "/images/products/coolers/cooler-01-3.jpeg",
    ],
  },
  {
    id: "cooler-2",
    name: "Cooler 02",
    category: "coolers-ac",
    price: 5499,
    images: [
      "/images/products/coolers/cooler-02-1.jpeg",
      "/images/products/coolers/cooler-02-2.jpeg",
      "/images/products/coolers/cooler-02-3.jpeg",
    ],
  },
  {
    id: "cooler-3",
    name: "Cooler 03",
    category: "coolers-ac",
    price: 5499,
    images: [
      "/images/products/coolers/cooler-03-1.jpeg",
      "/images/products/coolers/cooler-03-2.jpeg",
      "/images/products/coolers/cooler-03-3.jpeg",
    ],
  },
  {
    id: "cooler-4",
    name: "Cooler 04",
    category: "coolers-ac",
    price: 4499,
    images: [
      "/images/products/coolers/cooler-04-1.jpeg",
      "/images/products/coolers/cooler-04-2.jpeg",
      "/images/products/coolers/cooler-04-3.jpeg",
    ],
  },
  {
    id: "cooler-5",
    name: "Cooler 05",
    category: "coolers-ac",
    price: 6999,
    images: [
      "/images/products/coolers/cooler-05-1.jpeg",
      "/images/products/coolers/cooler-05-2.jpeg",
      "/images/products/coolers/cooler-05-3.jpeg",
    ],
  },
  {
    id: "cooler-6",
    name: "Cooler 06",
    category: "coolers-ac",
    price: 6499,
    images: [
      "/images/products/coolers/cooler-06-1.jpeg",
      "/images/products/coolers/cooler-06-2.jpeg",
      "/images/products/coolers/cooler-06-3.jpeg",
    ],
  },
  {
    id: "cooler-7",
    name: "Cooler 07",
    category: "coolers-ac",
    price: 6999,
    images: [
      "/images/products/coolers/cooler-07-1.jpeg",
      "/images/products/coolers/cooler-07-2.jpeg",
      "/images/products/coolers/cooler-07-3.jpeg",
    ],
  },
  {
    id: "cooler-8",
    name: "Cooler 08",
    category: "coolers-ac",
    price: 8999,
    images: [
      "/images/products/coolers/cooler-08-1.jpeg",
      "/images/products/coolers/cooler-08-2.jpeg",
      "/images/products/coolers/cooler-08-3.jpeg",
    ],
  },

  // AIR CONDITIONERS — place all 18 JPEG images in public/images/products/acs/.
  // Each AC has one main image and one additional view.
  {
    id: "ac-1",
    name: "AC 01",
    category: "coolers-ac",
    price: 37499,
    images: [
      "/images/products/acs/ac-01-1.jpeg",
      "/images/products/acs/ac-01-2.jpeg",
    ],
  },
  {
    id: "ac-2",
    name: "AC 02",
    category: "coolers-ac",
    price: 30499,
    images: [
      "/images/products/acs/ac-02-1.jpeg",
      "/images/products/acs/ac-02-2.jpeg",
    ],
  },
  {
    id: "ac-3",
    name: "AC 03",
    category: "coolers-ac",
    price: 45499,
    images: [
      "/images/products/acs/ac-03-1.jpeg",
      "/images/products/acs/ac-03-2.jpeg",
    ],
  },
  {
    id: "ac-4",
    name: "AC 04",
    category: "coolers-ac",
    price: 37999,
    images: [
      "/images/products/acs/ac-04-1.jpeg",
      "/images/products/acs/ac-04-2.jpeg",
    ],
  },
  {
    id: "ac-5",
    name: "AC 05",
    category: "coolers-ac",
    price: 28499,
    images: [
      "/images/products/acs/ac-05-1.jpeg",
      "/images/products/acs/ac-05-2.jpeg",
    ],
  },
  {
    id: "ac-6",
    name: "AC 06",
    category: "coolers-ac",
    price: 28499,
    images: [
      "/images/products/acs/ac-06-1.jpeg",
      "/images/products/acs/ac-06-2.jpeg",
    ],
  },
  {
    id: "ac-7",
    name: "AC 07",
    category: "coolers-ac",
    price: 37999,
    images: [
      "/images/products/acs/ac-07-1.jpeg",
      "/images/products/acs/ac-07-2.jpeg",
    ],
  },
  {
    id: "ac-8",
    name: "AC 08",
    category: "coolers-ac",
    price: 33499,
    images: [
      "/images/products/acs/ac-08-1.jpeg",
      "/images/products/acs/ac-08-2.jpeg",
    ],
  },
  {
    id: "ac-9",
    name: "AC 09",
    category: "coolers-ac",
    price: 45999,
    images: [
      "/images/products/acs/ac-09-1.jpeg",
      "/images/products/acs/ac-09-2.jpeg",
    ],
  },

  // OVENS — place 15 JPEG images in public/images/products/ovens/.
  // Each oven has one main image and two additional views.
  {
    id: "oven-1",
    name: "Oven 01",
    category: "kitchen-appliances",
    price: 12499,
    images: [
      "/images/products/ovens/oven-01-1.jpeg",
      "/images/products/ovens/oven-01-2.jpeg",
      "/images/products/ovens/oven-01-3.jpeg",
    ],
  },
  {
    id: "oven-2",
    name: "Oven 02",
    category: "kitchen-appliances",
    price: 12499,
    images: [
      "/images/products/ovens/oven-02-1.jpeg",
      "/images/products/ovens/oven-02-2.jpeg",
      "/images/products/ovens/oven-02-3.jpeg",
    ],
  },
  {
    id: "oven-3",
    name: "Oven 03",
    category: "kitchen-appliances",
    price: 12499,
    images: [
      "/images/products/ovens/oven-03-1.jpeg",
      "/images/products/ovens/oven-03-2.jpeg",
      "/images/products/ovens/oven-03-3.jpeg",
    ],
  },
  {
    id: "oven-4",
    name: "Oven 04",
    category: "kitchen-appliances",
    price: 10299,
    images: [
      "/images/products/ovens/oven-04-1.jpeg",
      "/images/products/ovens/oven-04-2.jpeg",
      "/images/products/ovens/oven-04-3.jpeg",
    ],
  },
  {
    id: "oven-5",
    name: "Oven 05",
    category: "kitchen-appliances",
    price: 10499,
    images: [
      "/images/products/ovens/oven-05-1.jpeg",
      "/images/products/ovens/oven-05-2.jpeg",
      "/images/products/ovens/oven-05-3.jpeg",
    ],
  },

  // KITCHEN APPLIANCES


  // NEW COOLERS — 3 products, 1 main image + 1 additional image each.
  {
    id: "cooler-9",
    name: "Cooler 09",
    category: "coolers-ac",
    price: 11999,
    images: [
      "/images/products/coolers/cooler-09-1.jpeg",
      "/images/products/coolers/cooler-09-2.jpeg",
    ],
  },
  {
    id: "cooler-10",
    name: "Cooler 10",
    category: "coolers-ac",
    price: 13499,
    images: [
      "/images/products/coolers/cooler-10-1.jpeg",
      "/images/products/coolers/cooler-10-2.jpeg",
    ],
  },
  {
    id: "cooler-11",
    name: "Cooler 11",
    category: "coolers-ac",
    price: 12499,
    images: [
      "/images/products/coolers/cooler-11-1.jpeg",
      "/images/products/coolers/cooler-11-2.jpeg",
    ],
  },

  // NEW HEATERS — added to Heaters & Geysers.
  {
    id: "heater-1",
    name: "Heater 01",
    category: "heaters-geysers",
    price: 1499,
    images: [
      "/images/products/heaters/heater-01-1.jpeg",
      "/images/products/heaters/heater-01-2.jpeg",
      "/images/products/heaters/heater-01-3.jpeg",
    ],
  },
  {
    id: "heater-2",
    name: "Heater 02",
    category: "heaters-geysers",
    price: 1349,
    images: [
      "/images/products/heaters/heater-02-1.jpeg",
      "/images/products/heaters/heater-02-2.jpeg",
      "/images/products/heaters/heater-02-3.jpeg",
    ],
  },
  // GEYSERS — files are in public/images/products/heaters/.
  {
    id: "geyser-1",
    name: "Geyser 01",
    category: "heaters-geysers",
    price: 8199,
    images: [
      "/images/products/heaters/geyser-01-1.jpeg",
      "/images/products/heaters/geyser-01-2.jpeg",
      "/images/products/heaters/geyser-01-3.jpeg",
    ],
  },
  {
    id: "geyser-2",
    name: "Geyser 02",
    category: "heaters-geysers",
    price: 4499,
    images: [
      "/images/products/heaters/geyser-02-1.jpeg",
      "/images/products/heaters/geyser-02-2.jpeg",
      "/images/products/heaters/geyser-02-3.jpeg",
    ],
  },
  {
    id: "geyser-3",
    name: "Geyser 03",
    category: "heaters-geysers",
    price: 4499,
    images: [
      "/images/products/heaters/geyser-03-1.jpeg",
      "/images/products/heaters/geyser-03-2.jpeg",
      "/images/products/heaters/geyser-03-3.jpeg",
    ],
  },
  {
    id: "geyser-4",
    name: "Geyser 04",
    category: "heaters-geysers",
    price: 8199,
    images: [
      "/images/products/heaters/geyser-04-1.jpeg",
      "/images/products/heaters/geyser-04-2.jpeg",
      "/images/products/heaters/geyser-04-3.jpeg",
    ],
  },
  {
    id: "geyser-5",
    name: "Geyser 05",
    category: "heaters-geysers",
    price: 3199,
    images: [
      "/images/products/heaters/geyser-05-1.jpeg",
      "/images/products/heaters/geyser-05-2.jpeg",
      "/images/products/heaters/geyser-05-3.jpeg",
    ],
  },

  // NEW GAS STOVES — added to Kitchen Appliances.
  {
    id: "gas-stove-1",
    name: "Gas Stove 01",
    category: "kitchen-appliances",
    price: 0,
    images: [
      "/images/products/kitchen-appliances/gas-stove-01-1.jpeg",
      "/images/products/kitchen-appliances/gas-stove-01-2.jpeg",
      "/images/products/kitchen-appliances/gas-stove-01-3.jpeg",
    ],
  },
  {
    id: "gas-stove-2",
    name: "Gas Stove 02",
    category: "kitchen-appliances",
    price: 0,
    images: [
      "/images/products/kitchen-appliances/gas-stove-02-1.jpeg",
      "/images/products/kitchen-appliances/gas-stove-02-2.jpeg",
      "/images/products/kitchen-appliances/gas-stove-02-3.jpeg",
    ],
  },
  {
    id: "gas-stove-3",
    name: "Gas Stove 03",
    category: "kitchen-appliances",
    price: 0,
    images: [
      "/images/products/kitchen-appliances/gas-stove-03-1.jpeg",
      "/images/products/kitchen-appliances/gas-stove-03-2.jpeg",
      "/images/products/kitchen-appliances/gas-stove-03-3.jpeg",
    ],
  },

  // NEW REFRIGERATORS — filenames follow the files you showed (08–11).
  {
    id: "fridge-8",
    name: "Refrigerator 08",
    category: "refrigerators",
    price: 14499,
    images: [
      "/images/products/refrigerators/fridge-08-1.jpeg",
      "/images/products/refrigerators/fridge-08-2.jpeg",
      "/images/products/refrigerators/fridge-08-3.jpeg",
    ],
  },
  {
    id: "fridge-9",
    name: "Refrigerator 09",
    category: "refrigerators",
    price: 16499,
    images: [
      "/images/products/refrigerators/fridge-09-1.jpeg",
      "/images/products/refrigerators/fridge-09-2.jpeg",
      "/images/products/refrigerators/fridge-09-3.jpeg",
    ],
  },
  {
    id: "fridge-10",
    name: "Refrigerator 10",
    category: "refrigerators",
    price: 12499,
    images: [
      "/images/products/refrigerators/fridge-10-1.jpeg",
      "/images/products/refrigerators/fridge-10-2.jpeg",
      "/images/products/refrigerators/fridge-10-3.jpeg",
    ],
  },
  {
    id: "fridge-11",
    name: "Refrigerator 11",
    category: "refrigerators",
    price: 15499,
    images: [
      "/images/products/refrigerators/fridge-11-1.jpeg",
      "/images/products/refrigerators/fridge-11-2.jpeg",
      "/images/products/refrigerators/fridge-11-3.jpeg",
    ],
  },

  // NEW KITCHEN APPLIANCES — 5 products, 3 images each.
  {
    id: "kitchen-appliance-1",
    name: "Kitchen Appliance 01",
    category: "kitchen-appliances",
    price: 0,
    images: [
      "/images/products/kitchen-appliances/kitchen-appliance-01-1.jpeg",
      "/images/products/kitchen-appliances/kitchen-appliance-01-2.jpeg",
      "/images/products/kitchen-appliances/kitchen-appliance-01-3.jpeg",
    ],
  },
  {
    id: "kitchen-appliance-2",
    name: "Kitchen Appliance 02",
    category: "kitchen-appliances",
    price: 0,
    images: [
      "/images/products/kitchen-appliances/kitchen-appliance-02-1.jpeg",
      "/images/products/kitchen-appliances/kitchen-appliance-02-2.jpeg",
      "/images/products/kitchen-appliances/kitchen-appliance-02-3.jpeg",
    ],
  },
  {
    id: "kitchen-appliance-3",
    name: "Kitchen Appliance 03",
    category: "kitchen-appliances",
    price: 0,
    images: [
      "/images/products/kitchen-appliances/kitchen-appliance-03-1.jpeg",
      "/images/products/kitchen-appliances/kitchen-appliance-03-2.jpeg",
      "/images/products/kitchen-appliances/kitchen-appliance-03-3.jpeg",
    ],
  },
  {
    id: "kitchen-appliance-4",
    name: "Kitchen Appliance 04",
    category: "kitchen-appliances",
    price: 0,
    images: [
      "/images/products/kitchen-appliances/kitchen-appliance-04-1.jpeg",
      "/images/products/kitchen-appliances/kitchen-appliance-04-2.jpeg",
      "/images/products/kitchen-appliances/kitchen-appliance-04-3.jpeg",
    ],
  },
  

  // MATTRESSES
  {
    id: "mattress-1",
    name: "Mattress",
    category: "mattresses",
    price: 0,
  },
  {
    id: "mattress-2",
    name: "Double Bed Mattress",
    category: "mattresses",
    price: 0,
  },
  
  // HOME APPLIANCES — 6 products, 3 images each.
  {
    id: "home-appliance-1",
    name: "Iron 01",
    category: "home-appliances",
    price: 949,
    images: [
      "/images/products/home-appliances/home-appliance-01-1.jpeg",
      "/images/products/home-appliances/home-appliance-01-2.jpeg",
      "/images/products/home-appliances/home-appliance-01-3.jpeg",
    ],
  },
  {
    id: "home-appliance-2",
    name: "Iron 02",
    category: "home-appliances",
    price: 949,
    images: [
      "/images/products/home-appliances/home-appliance-02-1.jpeg",
      "/images/products/home-appliances/home-appliance-02-2.jpeg",
      "/images/products/home-appliances/home-appliance-02-3.jpeg",
    ],
  },
  {
    id: "home-appliance-3",
    name: "Iron 03",
    category: "home-appliances",
    price: 949,
    images: [
      "/images/products/home-appliances/home-appliance-03-1.jpeg",
      "/images/products/home-appliances/home-appliance-03-2.jpeg",
      "/images/products/home-appliances/home-appliance-03-3.jpeg",
    ],
  },
  {
    id: "home-appliance-4",
    name: "Iron 04",
    category: "home-appliances",
    price: 949,
    images: [
      "/images/products/home-appliances/home-appliance-04-1.jpeg",
      "/images/products/home-appliances/home-appliance-04-2.jpeg",
      "/images/products/home-appliances/home-appliance-04-3.jpeg",
    ],
  },
  {
    id: "home-appliance-5",
    name: "Iron 05",
    category: "home-appliances",
    price: 949,
    images: [
      "/images/products/home-appliances/home-appliance-05-1.jpeg",
      "/images/products/home-appliances/home-appliance-05-2.jpeg",
      "/images/products/home-appliances/home-appliance-05-3.jpeg",
    ],
  },
  {
    id: "home-appliance-6",
    name: "Iron 06",
    category: "home-appliances",
    price: 849,
    images: [
      "/images/products/home-appliances/home-appliance-06-1.jpeg",
      "/images/products/home-appliances/home-appliance-06-2.jpeg",
      "/images/products/home-appliances/home-appliance-06-3.jpeg",
    ],
  },

];

const comboItems = [
  { name: "Double Bed", image: "/images/combo/combo-01.jpeg" },
  { name: "Fridge", image: "/images/combo/combo-02.jpeg" },
  { name: "Smart TV", image: "/images/combo/combo-03.jpeg" },
  { name: "Sofa Set", image: "/images/combo/combo-04.jpeg" },
  { name: "Washing Machine", image: "/images/combo/combo-05.jpeg" },
  { name: "Cooler", image: "/images/combo/combo-06.jpeg" },
  { name: "Almira", image: "/images/combo/combo-07.jpeg" },
  { name: "Table", image: "/images/combo/combo-08.jpeg" },
  { name: "Dressing", image: "/images/combo/combo-09.jpeg" },
  { name: "Gas Stove", image: "/images/combo/combo-10.jpeg" },
  { name: "Kitchen Bartan Set (51 Piece)", image: "/images/combo/combo-11.jpeg" },
  { name: "Serving Machine", image: "/images/combo/combo-12.jpeg" },
  { name: "Mattress", image: "/images/combo/combo-13.jpeg" },
  { name: "Pillow", image: "/images/combo/combo-14.jpeg" },
  { name: "Mixer Grinder", image: "/images/combo/combo-15.jpeg" },
  { name: "Iron", image: "/images/combo/combo-16.jpeg" },
  { name: "Blanket", image: "/images/combo/combo-17.jpeg" },
  { name: "Bedsheet", image: "/images/combo/combo-18.jpeg" },
  { name: "Hand Mixer", image: "/images/combo/combo-19.jpeg" },
  { name: "Wall Clock", image: "/images/combo/combo-20.jpeg" },
  { name: "Stool", image: "/images/combo/combo-21.jpeg" },
];

const formatPrice = (price: number) => {
  return `₹${price.toLocaleString("en-IN")}`;
};

export default function Categories() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    null
  );

  const [showMoreCategories, setShowMoreCategories] = useState(false);

  const [cart, setCart] = useState<CartItem[]>([]);

  const [showCart, setShowCart] = useState(false);
  const [addedProductName, setAddedProductName] = useState<string | null>(null);

  const [showCombo, setShowCombo] = useState(false);

  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const [activeDetailImage, setActiveDetailImage] = useState(0);

  const selectedCategoryData = categories.find(
    (category) => category.id === selectedCategory
  );

  const categoryProducts = useMemo(() => {
    if (!selectedCategory) return [];

    return products.filter(
      (product) => product.category === selectedCategory
    );
  }, [selectedCategory]);

  const selectedProduct = products.find((product) => product.id === selectedProductId);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const cartTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Keep the navbar cart badge synchronized and allow its button to open this cart.
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("arrow-city-cart-count", { detail: { count: cartCount } })
    );
  }, [cartCount]);

  useEffect(() => {
    const openCart = () => setShowCart(true);
    window.addEventListener("arrow-city-open-cart", openCart);
    return () => window.removeEventListener("arrow-city-open-cart", openCart);
  }, []);

  const addToCart = (product: Product) => {
    setAddedProductName(product.name);
    window.setTimeout(() => setAddedProductName(null), 2200);

    setCart((currentCart) => {
      const existing = currentCart.find((item) => item.id === product.id);

      if (existing) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (id: string) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: string) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  const openCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedProductId(null);
    setActiveDetailImage(0);
  };

  const openProductDetails = (product: Product) => {
    setSelectedProductId(product.id);
    setActiveDetailImage(0);
  };

  const goBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedProductId(null);
    setActiveDetailImage(0);
  };

  const whatsappMessage = encodeURIComponent(
    `Hello Arrow City Electronic Hub,\n\nI would like to enquire about the following products:\n\n${cart
      .map(
        (item) =>
          `${item.name} × ${item.quantity} ${
            item.price > 0 ? `- ${formatPrice(item.price)}` : ""
          }`
      )
      .join(
        "\n"
      )}\n\nTotal: ${
      cartTotal > 0 ? formatPrice(cartTotal) : "Price to be confirmed"
    }`
  );

  return (
    <>
      <section id="categories" className="categories-section">
        {addedProductName && (
          <div className="cart-add-toast" role="status" aria-live="polite" key={addedProductName}>
            <span className="cart-add-toast-check">✓</span>
            <span><strong>{addedProductName}</strong> added to cart</span>
            <button type="button" onClick={() => setShowCart(true)}>View cart</button>
          </div>
        )}
        <div className="categories-container">
          {/* =========================
              SHOP WITH US HEADER
          ========================== */}

          <div className="categories-heading">
            <div className="section-badge">SHOP WITH US</div>

            <h2>
              Explore Our <span>Collection</span>
            </h2>

            <p>
              Browse our products, explore available options and check prices
              online.
            </p>
          </div>

          {/* =========================
              CART BUTTON
          ========================== */}

          <button
            type="button"
            className="categories-cart-button"
            onClick={() => setShowCart(true)}
          >
            <span className="cart-icon">🛒</span>

            <span>My Cart</span>

            {cartCount > 0 && (
              <span className="cart-count">{cartCount}</span>
            )}
          </button>

          {/* =========================
              COMBO PACKAGE
          ========================== */}

          <div
            className="combo-package-card"
            role="button"
            tabIndex={0}
            onClick={() => setShowCombo(true)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setShowCombo(true);
              }
            }}
          >
            <div className="combo-content">
              <div className="combo-badge">
                ★ SPECIAL COMBO PACKAGE
              </div>

              <h3>
                Complete Home
                <strong>Combo Package</strong>
              </h3>

              <p className="combo-description">
                21 furniture and electronic essentials in one complete
                package.
              </p>

              <div className="combo-price">
                <span className="combo-old-price">₹1,20,000</span>
                <span className="combo-new-price">₹81,000</span>
              </div>

              <div className="combo-saving">
                Save ₹39,000
              </div>

              <button
                type="button"
                className="combo-button"
                onClick={() => setShowCombo(true)}
              >
                View 21 Items
                <span>→</span>
              </button>
            </div>

            <div className="combo-visual">
              <div className="combo-number">
                <strong>21</strong>
                <span>Items</span>
              </div>

              <div className="combo-mini-grid" aria-label="A preview of products included in the combo">
                {comboItems.slice(0, 4).map((item) => (
                  <div className="combo-mini-product" key={item.name} title={item.name}>
                    <img src={item.image} alt={item.name} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* =========================
              CATEGORY VIEW
          ========================== */}

          {!selectedCategory ? (
            <>
              <div className="categories-list-header">
                <div>
                  <span className="small-label">OUR COLLECTION</span>

                  <h3>Shop by Category</h3>
                </div>

                <span className="category-count">
                  12 Categories
                </span>
              </div>

              <div
                className={`category-grid ${
                  showMoreCategories ? "categories-expanded" : ""
                }`}
              >
                {categories.map((category, index) => (
                  <button
                    type="button"
                    key={category.id}
                    className={`category-card ${
                      index >= 6 ? "mobile-hidden-category" : ""
                    }`}
                    onClick={() => openCategory(category.id)}
                  >
                    <div className="category-image-wrap">
                      <img
                        className="category-image"
                        src={category.image}
                        alt={category.name}
                        loading="lazy"
                      />
                    </div>

                    <div className="category-card-content">
                      <h4>{category.name}</h4>

                      <p>{category.description}</p>
                    </div>

                    <span className="category-arrow">
                      Explore →
                    </span>
                  </button>
                ))}
              </div>

              {/* MOBILE ONLY */}
              <button
                type="button"
                className="more-categories-button"
                onClick={() =>
                  setShowMoreCategories((current) => !current)
                }
              >
                {showMoreCategories
                  ? "Show Less Categories ↑"
                  : "More Categories ↓"}
              </button>
            </>
          ) : (
            /* =========================
               CATEGORY PRODUCTS VIEW
            ========================== */

            <div className="category-products-view">
              <div className="category-products-header">
                <button
                  type="button"
                  className="back-to-categories"
                  onClick={goBackToCategories}
                >
                  ← Back to Categories
                </button>

                <div className="selected-category-heading">
                  <div className="selected-category-icon">
                    {selectedCategoryData?.icon}
                  </div>

                  <div>
                    <span className="small-label">
                      AVAILABLE PRODUCTS
                    </span>

                    <h3>{selectedCategoryData?.name}</h3>

                    <p>
                      {selectedCategoryData?.description}
                    </p>
                  </div>
                </div>
              </div>

              {selectedProduct ? (
                <div className="product-detail-view">
                  <button
                    type="button"
                    className="back-to-categories product-detail-back"
                    onClick={() => {
                      setSelectedProductId(null);
                      setActiveDetailImage(0);
                    }}
                  >
                    ← Back to {selectedCategoryData?.name}
                  </button>

                  <div className="product-detail-layout">
                    <div className="product-detail-gallery">
                      <div className="product-detail-main-image">
                        {selectedProduct.images?.[activeDetailImage] ? (
                          <img
                            src={selectedProduct.images[activeDetailImage]}
                            alt={`${selectedProduct.name} view ${activeDetailImage + 1}`}
                          />
                        ) : (
                          <div className="product-image-placeholder"><span>+</span><small>Image coming soon</small></div>
                        )}
                      </div>
                      {selectedProduct.images && selectedProduct.images.length > 1 && (
                        <div className="product-detail-thumbnails">
                          {selectedProduct.images.map((image, index) => (
                            <button
                              key={image}
                              type="button"
                              className={`product-detail-thumbnail ${activeDetailImage === index ? "active" : ""}`}
                              onClick={() => setActiveDetailImage(index)}
                              aria-label={`Show ${selectedProduct.name} image ${index + 1}`}
                            >
                              <img src={image} alt={`${selectedProduct.name} thumbnail ${index + 1}`} />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="product-detail-info">
                      <span className="product-category-label">{selectedCategoryData?.name}</span>
                      <h4>{selectedProduct.name}</h4>
                      <p className="product-detail-copy">View the product photos to compare it from different angles. Visit or contact our showroom to confirm availability and specifications.</p>
                      <div className="product-price product-detail-price">
                        <span>Price</span>
                        {selectedProduct.price > 0 ? (
                          <strong>{formatPrice(selectedProduct.price)}</strong>
                        ) : (
                          <strong className="price-coming-soon">Price to be confirmed</strong>
                        )}
                      </div>
                      <button
                        type="button"
                        className="add-to-cart-button"
                        onClick={() => addToCart(selectedProduct)}
                      >
                        <span>Add to Cart</span><span className="add-cart-plus">+</span>
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="products-grid">
                  {categoryProducts.map((product) => (
                    <article key={product.id} className="category-product-card">
                      <button
                        type="button"
                        className="product-image-button"
                        onClick={() => openProductDetails(product)}
                        aria-label={`View details for ${product.name}`}
                      >
                        {product.images?.[0] ? (
                          <img className="product-card-image" src={product.images[0]} alt={product.name} />
                        ) : (
                          <div className="product-image-placeholder"><span>+</span><small>Product Image</small></div>
                        )}
                        <span className="product-image-view-label">View photos</span>
                      </button>

                      <div className="product-card-body">
                        <span className="product-category-label">{selectedCategoryData?.name}</span>
                        <h4>{product.name}</h4>
                        <div className="product-price">
                          <span>Price</span>
                          {product.price > 0 ? (
                            <strong>{formatPrice(product.price)}</strong>
                          ) : (
                            <strong className="price-coming-soon">Price to be confirmed</strong>
                          )}
                        </div>
                        <button type="button" className="view-product-button" onClick={() => openProductDetails(product)}>
                          View Details & Photos →
                        </button>
                        <button type="button" className="add-to-cart-button" onClick={() => addToCart(product)}>
                          <span>Add to Cart</span><span className="add-cart-plus">+</span>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* =========================
          COMBO MODAL
      ========================== */}

      {showCombo && (
        <div
          className="categories-modal-backdrop"
          onClick={() => setShowCombo(false)}
        >
          <div
            className="combo-modal"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="modal-close"
              onClick={() => setShowCombo(false)}
            >
              ×
            </button>

            <span className="section-badge">
              SPECIAL COMBO PACKAGE
            </span>

            <h3>
              Complete Home
              <span>Combo Package</span>
            </h3>

            <div className="modal-price">
              <span>₹1,20,000</span>
              <strong>₹81,000</strong>
            </div>

            <p className="modal-saving">
              Save ₹39,000
            </p>

            <div className="combo-items-grid">
              {comboItems.map((item, index) => (
                <article key={item.name} className="combo-item">
                  <div className="combo-item-image">
                    <img src={item.image} alt={item.name} />
                    <span>{index + 1}</span>
                  </div>
                  <strong>{item.name}</strong>
                </article>
              ))}
            </div>

            <button
              type="button"
              className="combo-modal-button"
              onClick={() => {
                setShowCombo(false);

                window.open(
                  "https://wa.me/919729802008?text=Hello%20Arrow%20City%20Electronic%20Hub%2C%20I%20am%20interested%20in%20the%20Complete%20Home%20Combo%20Package%20priced%20at%20Rs.%2081%2C000.",
                  "_blank"
                );
              }}
            >
              Enquire About Combo Package →
            </button>
          </div>
        </div>
      )}

      {/* =========================
          CART DRAWER
      ========================== */}

      {showCart && (
        <div
          className="cart-backdrop"
          onClick={() => setShowCart(false)}
        >
          <aside
            className="cart-drawer"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <div>
                <span className="small-label">YOUR SELECTION</span>
                <h3>My Cart</h3>
              </div>

              <button
                type="button"
                className="cart-close"
                onClick={() => setShowCart(false)}
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div className="empty-cart">
                <div className="empty-cart-icon">🛒</div>

                <h4>Your cart is empty</h4>

                <p>
                  Add products from our collection to see them
                  here.
                </p>

                <button
                  type="button"
                  onClick={() => setShowCart(false)}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div className="cart-items">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className="cart-item"
                    >
                      <div className="cart-item-image">
                        {item.images?.[0] ? (
                          <img src={item.images[0]} alt={item.name} />
                        ) : (
                          <span>🛍️</span>
                        )}
                      </div>

                      <div className="cart-item-info">
                        <strong>{item.name}</strong>

                        <span>
                          {item.price > 0
                            ? formatPrice(item.price)
                            : "Price Coming Soon"}
                        </span>

                        <div className="quantity-controls">
                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                          >
                            −
                          </button>

                          <span>{item.quantity}</span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="remove-cart-item"
                        onClick={() =>
                          removeFromCart(item.id)
                        }
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>

                <div className="cart-summary">
                  <div className="cart-summary-row">
                    <span>Total Items</span>
                    <strong>{cartCount}</strong>
                  </div>

                  <div className="cart-summary-total">
                    <span>Estimated Total</span>

                    <strong>
                      {cartTotal > 0
                        ? formatPrice(cartTotal)
                        : "Price to be confirmed"}
                    </strong>
                  </div>

                  <p className="cart-note">
                    Final prices and availability will be
                    confirmed by Arrow City Electronic Hub.
                  </p>

                  <a
                    href={`https://wa.me/919729802008?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cart-whatsapp-button"
                  >
                    Send Cart on WhatsApp →
                  </a>
                </div>
              </>
            )}
          </aside>
        </div>
      )}

      {/* =========================
          COMPONENT STYLES
      ========================== */}

      <style jsx>{`
        .categories-section {
          position: relative;
          padding: 105px 0 120px;
          background:
            radial-gradient(
              circle at 10% 20%,
              rgba(252, 163, 17, 0.08),
              transparent 28%
            ),
            linear-gradient(
              135deg,
              #ffffff 0%,
              #f7f9fd 100%
            );
          overflow: hidden;
        }

        .categories-container {
          width: min(1160px, calc(100% - 48px));
          margin: 0 auto;
          position: relative;
        }

        .categories-heading {
          text-align: center;
          max-width: 780px;
          margin: 0 auto 48px;
        }

        .section-badge {
          display: inline-block;
          margin-bottom: 12px;
          color: #f39a00;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.18em;
        }

        .categories-heading h2 {
          margin: 0;
          color: #172e63;
          font-size: clamp(40px, 5vw, 62px);
          line-height: 1.05;
          letter-spacing: -0.04em;
          font-weight: 800;
        }

        .categories-heading h2 span {
          color: #f5a000;
        }

        .categories-heading p {
          margin: 15px 0 0;
          color: #64779b;
          font-size: 16px;
        }

        .categories-cart-button {
          position: absolute;
          right: 0;
          top: 0;
          border: 1px solid rgba(24, 47, 99, 0.12);
          background: #ffffff;
          color: #172e63;
          border-radius: 999px;
          padding: 11px 17px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          cursor: pointer;
          box-shadow: 0 8px 25px rgba(20, 40, 80, 0.08);
          transition: 0.25s ease;
          z-index: 5;
        }

        .categories-cart-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(20, 40, 80, 0.13);
        }

        .cart-count {
          min-width: 22px;
          height: 22px;
          padding: 0 6px;
          border-radius: 50%;
          background: #f5a000;
          color: #172e63;
          display: grid;
          place-items: center;
          font-size: 11px;
          font-weight: 900;
        }

        /* COMBO */

        .combo-package-card {
          min-height: 290px;
          margin: 34px 0 72px;
          border-radius: 30px;
          padding: 34px 40px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            #ffab19 0%,
            #ffb52c 100%
          );
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 20px 50px rgba(235, 153, 10, 0.2);
        }

        .combo-package-card::after {
          content: "";
          position: absolute;
          width: 310px;
          height: 310px;
          right: -110px;
          top: -160px;
          border: 1px solid rgba(255, 255, 255, 0.35);
          border-radius: 50%;
          box-shadow:
            0 0 0 28px rgba(255, 255, 255, 0.08),
            0 0 0 56px rgba(255, 255, 255, 0.06);
        }

        .combo-content {
          position: relative;
          z-index: 2;
        }

        .combo-badge {
          display: inline-flex;
          padding: 7px 12px;
          border-radius: 999px;
          background: #17346e;
          color: #ffffff;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.08em;
        }

        .combo-content h3 {
          margin: 15px 0 4px;
          color: #17346e;
          font-size: clamp(30px, 4vw, 44px);
          line-height: 0.98;
          font-weight: 500;
          letter-spacing: -0.04em;
        }

        .combo-content h3 strong {
          display: block;
          color: #ffffff;
          font-weight: 850;
        }

        .combo-description {
          margin: 10px 0 14px;
          color: #674b19;
          font-size: 13px;
        }

        .combo-price {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .combo-old-price {
          color: #86631c;
          text-decoration: line-through;
          font-size: 16px;
        }

        .combo-new-price {
          color: #17346e;
          font-size: 27px;
          font-weight: 900;
        }

        .combo-saving {
          color: #17346e;
          font-size: 12px;
          font-weight: 800;
          margin-top: 2px;
        }

        .combo-button {
          margin-top: 15px;
          border: 0;
          background: #17346e;
          color: #ffffff;
          padding: 12px 16px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 15px;
          transition: 0.25s ease;
        }

        .combo-button:hover {
          transform: translateY(-2px);
        }

        .combo-visual {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 22px;
          margin-right: 35px;
        }

        .combo-number {
          color: #17346e;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .combo-number strong {
          font-size: 58px;
          line-height: 0.85;
          font-weight: 900;
        }

        .combo-number span {
          font-size: 14px;
          font-weight: 800;
        }

        .combo-mini-grid {
          display: grid;
          grid-template-columns: repeat(2, 90px);
          gap: 7px;
        }

        .combo-mini-grid div {
          height: 68px;
          border-radius: 12px;
          border: 2px solid rgba(255, 255, 255, 0.7);
          background: rgba(255, 255, 255, 0.55);
          display: grid;
          place-items: center;
          font-size: 30px;
        }

        /* CATEGORY HEADER */

        .categories-list-header {
          display: flex;
          justify-content: space-between;
          align-items: end;
          margin-bottom: 20px;
        }

        .small-label {
          display: block;
          color: #f39a00;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.16em;
          margin-bottom: 6px;
        }

        .categories-list-header h3 {
          margin: 0;
          color: #172e63;
          font-size: 28px;
          letter-spacing: -0.03em;
        }

        .category-count {
          color: #61779e;
          font-size: 12px;
          font-weight: 700;
        }

        /* 4 x 3 DESKTOP + TABLET */

        .category-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 18px;
        }

        .category-card {
          min-height: 220px;
          text-align: left;
          border: 1px solid rgba(23, 46, 99, 0.10);
          border-radius: 22px;
          padding: 18px;
          background: #ffffff;
          cursor: pointer;
          box-shadow: 0 10px 30px rgba(26, 50, 95, 0.055);
          transition:
            transform 0.25s ease,
            box-shadow 0.25s ease,
            border-color 0.25s ease;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .category-card:focus-visible {
          outline: 3px solid #f5a000;
          outline-offset: 3px;
        }

        .category-card:hover {
          transform: translateY(-5px);
          border-color: #f5a000;
          box-shadow: 0 16px 35px rgba(26, 50, 95, 0.1);
        }

        .category-image-wrap {
          width: 100%;
          height: 112px;
          border-radius: 15px;
          background: linear-gradient(145deg, #f6f8fc, #edf1f8);
          display: grid;
          place-items: center;
          overflow: hidden;
        }

        .category-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 4px;
        }

        .category-icon {
          width: 45px;
          height: 45px;
          border-radius: 13px;
          background: #eef3ff;
          display: grid;
          place-items: center;
          font-size: 22px;
        }

        .category-card-content h4 {
          margin: 15px 0 6px;
          color: #172e63;
          font-size: 17px;
          letter-spacing: -0.02em;
        }

        .category-card-content p {
          margin: 0;
          color: #71819c;
          font-size: 11px;
          line-height: 1.5;
        }

        .category-arrow {
          margin-top: 13px;
          color: #2d63ed;
          font-size: 11px;
          font-weight: 800;
        }

        .mobile-hidden-category {
          display: flex;
        }

        .more-categories-button {
          display: none;
        }

        /* PRODUCTS INSIDE CATEGORY */

        .category-products-view {
          animation: categoryFade 0.3s ease;
        }

        @keyframes categoryFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .category-products-header {
          margin-bottom: 25px;
        }

        .back-to-categories {
          border: 0;
          background: transparent;
          padding: 0;
          color: #2d63ed;
          font-weight: 800;
          font-size: 13px;
          cursor: pointer;
          margin-bottom: 22px;
        }

        .selected-category-heading {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .selected-category-icon {
          width: 60px;
          height: 60px;
          border-radius: 18px;
          background: #eef3ff;
          display: grid;
          place-items: center;
          font-size: 30px;
        }

        .selected-category-heading h3 {
          margin: 0;
          color: #172e63;
          font-size: 32px;
        }

        .selected-category-heading p {
          margin: 4px 0 0;
          color: #71819c;
          font-size: 13px;
        }

        .products-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 15px;
        }

        .category-product-card {
          overflow: hidden;
          border-radius: 18px;
          background: #ffffff;
          border: 1px solid #e0e7f2;
          box-shadow: 0 8px 25px rgba(26, 50, 95, 0.05);
        }

        .product-image-placeholder {
          height: 185px;
          background: #f1f4f9;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: #a9b8cf;
        }

        .product-image-placeholder span {
          width: 42px;
          height: 42px;
          border: 1px dashed #b8c6da;
          border-radius: 11px;
          display: grid;
          place-items: center;
          font-size: 23px;
        }

        .product-image-placeholder small {
          margin-top: 8px;
          font-size: 9px;
        }

        .product-image-button {
          position: relative;
          display: block;
          width: 100%;
          height: 205px;
          padding: 0;
          border: 0;
          background: #f1f4f9;
          cursor: pointer;
          overflow: hidden;
        }

        .product-card-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
          padding: 8px;
          transition: transform 0.25s ease;
        }

        .product-image-button:hover .product-card-image {
          transform: scale(1.035);
        }

        .product-image-view-label {
          position: absolute;
          right: 10px;
          bottom: 10px;
          padding: 6px 9px;
          border-radius: 20px;
          background: rgba(23, 46, 99, 0.9);
          color: #fff;
          font-size: 10px;
          font-weight: 700;
        }

        .view-product-button {
          width: 100%;
          margin-bottom: 8px;
          padding: 9px 10px;
          border: 0;
          border-radius: 9px;
          background: #eef3ff;
          color: #172e63;
          font-size: 10px;
          font-weight: 800;
          cursor: pointer;
        }

        .view-product-button:hover {
          background: #e1eaff;
        }

        .product-detail-view {
          padding-top: 8px;
        }

        .product-detail-back {
          margin-bottom: 18px;
        }

        .product-detail-layout {
          display: grid;
          grid-template-columns: minmax(0, 1.15fr) minmax(260px, 0.85fr);
          gap: 28px;
          align-items: start;
          padding: 22px;
          border: 1px solid #e0e7f2;
          border-radius: 20px;
          background: #fff;
          box-shadow: 0 12px 35px rgba(26, 50, 95, 0.06);
        }

        .product-detail-main-image {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 420px;
          overflow: hidden;
          border-radius: 15px;
          background: #f5f7fb;
        }

        .product-detail-main-image > img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .product-detail-thumbnails {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 10px;
          margin-top: 10px;
        }

        .product-detail-thumbnail {
          height: 100px;
          padding: 4px;
          overflow: hidden;
          border: 2px solid #e0e7f2;
          border-radius: 11px;
          background: #f5f7fb;
          cursor: pointer;
        }

        .product-detail-thumbnail.active {
          border-color: #2d63ed;
          box-shadow: 0 0 0 2px rgba(45, 99, 237, 0.12);
        }

        .product-detail-thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }

        .product-detail-info {
          padding: 12px 4px;
        }

        .product-detail-info h4 {
          margin: 16px 0 10px;
          color: #172e63;
          font-size: 30px;
        }

        .product-detail-copy {
          margin: 0 0 24px;
          color: #71819c;
          font-size: 13px;
          line-height: 1.7;
        }

        .product-detail-price {
          padding: 14px 0;
          border-top: 1px solid #e7ecf4;
          border-bottom: 1px solid #e7ecf4;
        }

        .product-detail-price strong {
          font-size: 16px;
        }

        .product-card-body {
          padding: 13px;
        }

        .product-category-label {
          display: inline-block;
          padding: 4px 8px;
          border-radius: 6px;
          background: #172e63;
          color: #ffffff;
          font-size: 8px;
          font-weight: 800;
        }

        .product-card-body h4 {
          margin: 11px 0 8px;
          color: #172e63;
          font-size: 15px;
        }

        .product-price {
          display: flex;
          align-items: center;
          gap: 6px;
          margin-bottom: 12px;
        }

        .product-price span {
          color: #91a0b7;
          font-size: 10px;
        }

        .product-price strong {
          color: #172e63;
          font-size: 12px;
        }

        .price-coming-soon {
          font-weight: 700;
        }

        .add-to-cart-button {
          width: 100%;
          border: 1px solid #dce4f0;
          background: #ffffff;
          color: #172e63;
          border-radius: 9px;
          padding: 9px 11px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          cursor: pointer;
          font-size: 10px;
          font-weight: 800;
          transition: 0.2s ease;
        }

        .add-to-cart-button:hover {
          background: #172e63;
          color: #ffffff;
          border-color: #172e63;
        }

        .cart-add-toast {
          position: fixed;
          top: 96px;
          right: 24px;
          z-index: 12000;
          display: flex;
          align-items: center;
          gap: 10px;
          max-width: min(420px, calc(100vw - 32px));
          padding: 13px 15px;
          border: 1px solid rgba(34, 197, 94, 0.22);
          border-radius: 14px;
          background: #ffffff;
          color: #172e63;
          box-shadow: 0 16px 45px rgba(16, 35, 70, 0.20);
          animation: cartToastIn 0.32s cubic-bezier(.2,.8,.2,1) both;
          font-size: 12px;
        }

        .cart-add-toast-check {
          width: 27px;
          height: 27px;
          flex-shrink: 0;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #dcfce7;
          color: #15803d;
          font-weight: 900;
          animation: cartCheckPop 0.38s 0.08s ease both;
        }

        .cart-add-toast strong { color: #172e63; }
        .cart-add-toast button {
          margin-left: auto;
          border: 0;
          border-radius: 999px;
          padding: 8px 11px;
          background: #172e63;
          color: #ffffff;
          white-space: nowrap;
          font-size: 11px;
          font-weight: 800;
          cursor: pointer;
        }

        .add-to-cart-button:active { transform: scale(0.97); }
        .add-to-cart-button:hover .add-cart-plus { transform: rotate(90deg); }
        .add-cart-plus {
          display: inline-block;
          font-size: 18px;
          transition: transform 0.25s ease;
        }

        @keyframes cartToastIn {
          from { opacity: 0; transform: translateY(-12px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cartCheckPop {
          0% { transform: scale(0.4); }
          70% { transform: scale(1.18); }
          100% { transform: scale(1); }
        }

        /* MODALS */

        .categories-modal-backdrop,
        .cart-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          background: rgba(8, 18, 40, 0.55);
          backdrop-filter: blur(8px);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .combo-modal {
          width: min(980px, 100%);
          max-height: 90vh;
          overflow-y: auto;
          position: relative;
          border-radius: 25px;
          padding: 30px;
          background: #ffffff;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.2);
        }

        .combo-package-card {
          cursor: pointer;
        }

        .combo-package-card:focus-visible {
          outline: 3px solid #f5a000;
          outline-offset: 4px;
        }

        .modal-close {
          position: absolute;
          top: 15px;
          right: 17px;
          width: 35px;
          height: 35px;
          border: 0;
          border-radius: 50%;
          background: #f0f3f8;
          color: #172e63;
          font-size: 22px;
          cursor: pointer;
        }

        .combo-modal h3 {
          margin: 5px 0 10px;
          color: #172e63;
          font-size: 32px;
        }

        .combo-modal h3 span {
          display: block;
          color: #f5a000;
        }

        .modal-price {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .modal-price span {
          color: #8998b0;
          text-decoration: line-through;
        }

        .modal-price strong {
          color: #172e63;
          font-size: 25px;
        }

        .modal-saving {
          color: #f39a00;
          font-size: 12px;
          font-weight: 800;
        }

        .combo-items-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin: 24px 0;
        }

        .combo-item {
          overflow: hidden;
          border: 1px solid #e7ebf2;
          border-radius: 15px;
          background: #f8f9fc;
          box-shadow: 0 8px 22px rgba(23, 46, 99, 0.07);
          transition: transform 0.25s ease, box-shadow 0.25s ease;
        }

        .combo-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 14px 30px rgba(23, 46, 99, 0.12);
        }

        .combo-item-image {
          position: relative;
          aspect-ratio: 4 / 3;
          overflow: hidden;
          background: #eef1f6;
        }

        .combo-item-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
        }

        .combo-item-image span {
          position: absolute;
          top: 8px;
          left: 8px;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: #172e63;
          color: #ffffff;
          display: grid;
          place-items: center;
          font-size: 10px;
          font-weight: 800;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.18);
        }

        .combo-item strong {
          display: block;
          padding: 11px 12px 13px;
          color: #172e63;
          font-size: 12px;
          line-height: 1.35;
        }

        .combo-modal-button {
          width: 100%;
          border: 0;
          border-radius: 11px;
          padding: 13px;
          background: #172e63;
          color: #ffffff;
          font-weight: 800;
          cursor: pointer;
        }

        /* CART */

        .cart-backdrop {
          justify-content: flex-end;
          padding: 0;
        }

        .cart-drawer {
          width: min(430px, 100%);
          height: 100%;
          background: #ffffff;
          padding: 25px;
          display: flex;
          flex-direction: column;
          box-shadow: -20px 0 60px rgba(0, 0, 0, 0.15);
          animation: cartSlide 0.25s ease;
        }

        @keyframes cartSlide {
          from {
            transform: translateX(100%);
          }

          to {
            transform: translateX(0);
          }
        }

        .cart-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-bottom: 18px;
          border-bottom: 1px solid #e7ebf2;
        }

        .cart-header h3 {
          margin: 0;
          color: #172e63;
          font-size: 28px;
        }

        .cart-close {
          width: 36px;
          height: 36px;
          border: 0;
          border-radius: 50%;
          background: #f0f3f8;
          color: #172e63;
          font-size: 22px;
          cursor: pointer;
        }

        .cart-items {
          flex: 1;
          overflow-y: auto;
          padding: 15px 0;
        }

        .cart-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 0;
          border-bottom: 1px solid #edf0f5;
        }

        .cart-item-image {
          width: 55px;
          height: 55px;
          flex-shrink: 0;
          border-radius: 11px;
          background: #f1f4f9;
          color: #a7b5ca;
          display: grid;
          place-items: center;
          font-size: 20px;
        }

        .cart-item-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          border-radius: inherit;
        }

        .cart-item-info {
          flex: 1;
        }

        .cart-item-info strong {
          display: block;
          color: #172e63;
          font-size: 13px;
        }

        .cart-item-info > span {
          display: block;
          margin-top: 3px;
          color: #7f8da3;
          font-size: 10px;
        }

        .quantity-controls {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 8px;
        }

        .quantity-controls button {
          width: 24px;
          height: 24px;
          border: 1px solid #dce3ed;
          background: #ffffff;
          border-radius: 6px;
          color: #172e63;
          cursor: pointer;
        }

        .quantity-controls span {
          font-size: 11px;
          font-weight: 800;
          color: #172e63;
        }

        .remove-cart-item {
          border: 0;
          background: transparent;
          color: #a5b0c0;
          font-size: 19px;
          cursor: pointer;
        }

        .cart-summary {
          border-top: 1px solid #e7ebf2;
          padding-top: 18px;
        }

        .cart-summary-row,
        .cart-summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .cart-summary-row {
          color: #71819a;
          font-size: 12px;
        }

        .cart-summary-total {
          margin-top: 10px;
          color: #172e63;
          font-size: 15px;
        }

        .cart-summary-total strong {
          font-size: 20px;
        }

        .cart-note {
          color: #8997aa;
          font-size: 10px;
          line-height: 1.5;
        }

        .cart-whatsapp-button {
          display: block;
          text-align: center;
          text-decoration: none;
          background: #172e63;
          color: #ffffff;
          padding: 13px;
          border-radius: 10px;
          font-size: 12px;
          font-weight: 800;
          margin-top: 12px;
        }

        .empty-cart {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .empty-cart-icon {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: #f1f4f9;
          display: grid;
          place-items: center;
          font-size: 30px;
          margin-bottom: 15px;
        }

        .empty-cart h4 {
          margin: 0;
          color: #172e63;
          font-size: 19px;
        }

        .empty-cart p {
          max-width: 250px;
          color: #8795aa;
          font-size: 12px;
          line-height: 1.5;
        }

        .empty-cart button {
          border: 0;
          border-radius: 9px;
          background: #172e63;
          color: #ffffff;
          padding: 11px 16px;
          font-weight: 800;
          cursor: pointer;
        }

        /* =========================
           MOBILE
        ========================== */

        @media (max-width: 700px) {
          .categories-section {
            padding: 65px 0 75px;
          }

          .categories-container {
            width: min(100% - 28px, 520px);
          }

          .categories-heading {
            margin-bottom: 28px;
          }

          .categories-heading h2 {
            font-size: 35px;
          }

          .categories-heading p {
            font-size: 13px;
          }

          .categories-cart-button {
            position: relative;
            right: auto;
            top: auto;
            margin: 0 auto 22px;
            width: max-content;
          }

          .combo-package-card {
            min-height: 0;
            padding: 23px;
            margin-bottom: 45px;
            border-radius: 22px;
            display: block;
          }

          .combo-content h3 {
            font-size: 30px;
          }

          .combo-description {
            font-size: 11px;
          }

          .combo-visual {
            margin: 25px 0 0;
            justify-content: flex-start;
          }

          .combo-number strong {
            font-size: 45px;
          }

          .combo-mini-grid {
            grid-template-columns: repeat(2, 70px);
          }

          .combo-mini-grid div {
            height: 52px;
            font-size: 24px;
          }

          .categories-list-header {
            align-items: end;
          }

          .categories-list-header h3 {
            font-size: 24px;
          }

          .category-count {
            font-size: 10px;
          }

          /* EXACTLY 2 x 3 ON MOBILE */

          .category-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .mobile-hidden-category {
            display: none;
          }

          .categories-expanded .mobile-hidden-category {
            display: flex;
          }

          .category-card {
            min-height: 190px;
            padding: 13px;
            border-radius: 16px;
          }

          .category-image-wrap {
            height: 86px;
            border-radius: 12px;
          }

          .category-icon {
            width: 38px;
            height: 38px;
            font-size: 19px;
            border-radius: 11px;
          }

          .category-card-content h4 {
            margin-top: 10px;
            font-size: 14px;
          }

          .category-card-content p {
            font-size: 9px;
          }

          .category-arrow {
            font-size: 9px;
          }

          .more-categories-button {
            display: block;
            width: 100%;
            margin-top: 14px;
            padding: 12px;
            border: 1px solid #dce4f0;
            border-radius: 10px;
            background: #ffffff;
            color: #172e63;
            font-size: 11px;
            font-weight: 800;
            cursor: pointer;
          }

          .products-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .product-image-placeholder {
            height: 135px;
          }

          .product-image-button {
            height: 150px;
          }

          .product-detail-layout {
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
            padding: 12px;
          }

          .product-detail-main-image {
            height: min(68vw, 360px);
          }

          .product-detail-thumbnail {
            height: 78px;
          }

          .product-detail-info h4 {
            font-size: 24px;
          }

          .product-card-body {
            padding: 10px;
          }

          .product-card-body h4 {
            font-size: 12px;
          }

          .selected-category-heading h3 {
            font-size: 25px;
          }

          .selected-category-heading p {
            font-size: 11px;
          }

          .selected-category-icon {
            width: 50px;
            height: 50px;
            font-size: 24px;
          }

          .combo-items-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 10px;
          }

          .combo-modal {
            padding: 24px 18px;
            border-radius: 20px;
          }

          .combo-modal h3 {
            font-size: 26px;
          }

          .cart-drawer {
            width: 100%;
          }

          .cart-add-toast {
            top: 82px;
            right: 10px;
            left: 10px;
            max-width: none;
          }
        }

        /* TABLET:
           Keep ALL 12 categories in 4 x 3 */

        @media (min-width: 701px) and (max-width: 1000px) {
          .categories-container {
            width: min(94%, 850px);
          }

          .category-grid {
            grid-template-columns: repeat(4, minmax(0, 1fr));
          }

          .category-card {
            min-height: 165px;
            padding: 14px;
          }

          .category-card-content h4 {
            font-size: 14px;
          }

          .category-card-content p {
            font-size: 9px;
          }

          .combo-package-card {
            padding: 25px;
          }

          .combo-mini-grid {
            grid-template-columns: repeat(2, 70px);
          }

          .combo-mini-grid div {
            height: 55px;
          }

          .products-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .more-categories-button {
            display: none;
          }
        }

        /* =========================
           POLISHED COMBO, PRODUCT CARDS & BACK NAVIGATION
        ========================== */
        .combo-package-card {
          background: linear-gradient(120deg, #ffab19 0%, #ffb72f 58%, #ffc54f 100%);
          border: 1px solid rgba(255,255,255,.55);
          box-shadow: 0 22px 55px rgba(224, 145, 0, .22);
        }
        .combo-package-card::before {
          content: "";
          position: absolute;
          inset: 12px;
          border: 1px solid rgba(255,255,255,.22);
          border-radius: 22px;
          pointer-events: none;
        }
        .combo-visual { gap: 20px; margin-right: 14px; }
        .combo-mini-grid { grid-template-columns: repeat(2, 104px); gap: 10px; }
        .combo-mini-grid .combo-mini-product {
          height: 82px;
          padding: 7px;
          border: 2px solid rgba(255,255,255,.85);
          border-radius: 17px;
          background: rgba(255,255,255,.68);
          box-shadow: 0 8px 20px rgba(23,46,99,.09);
          overflow: hidden;
        }
        .combo-mini-product img { width: 100%; height: 100%; object-fit: contain; display: block; }
        .combo-old-price { font-size: 18px; }
        .combo-new-price { font-size: clamp(30px, 3vw, 36px); }
        .combo-saving { display: inline-block; margin-top: 7px; padding: 5px 9px; border-radius: 7px; background: rgba(255,255,255,.45); }

        .category-products-header { margin-bottom: 28px; }
        .back-to-categories {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-height: 42px;
          margin: 0 0 22px;
          padding: 10px 16px;
          border: 1px solid #d6e2fa;
          border-radius: 12px;
          background: #eef4ff;
          color: #1748b5;
          box-shadow: 0 4px 12px rgba(23, 70, 170, .08);
          font-size: 13px;
          font-weight: 850;
          line-height: 1.2;
          cursor: pointer;
          transition: background .2s ease, color .2s ease, transform .2s ease, box-shadow .2s ease;
        }
        .back-to-categories:hover { background: #1748b5; color: #fff; transform: translateY(-1px); box-shadow: 0 8px 18px rgba(23,70,170,.18); }
        .back-to-categories:focus-visible { outline: 3px solid #ffb21e; outline-offset: 3px; }
        .product-detail-view { padding-top: 4px; }
        .product-detail-back { margin-bottom: 20px; }

        .products-grid { gap: 18px; }
        .category-product-card {
          border: 1px solid #dce5f4;
          border-radius: 20px;
          background: linear-gradient(180deg, #fff 0%, #fbfcff 100%);
          box-shadow: 0 10px 28px rgba(23,46,99,.075);
          transition: transform .22s ease, box-shadow .22s ease, border-color .22s ease;
        }
        .category-product-card:hover { transform: translateY(-4px); border-color: #b8ccf4; box-shadow: 0 18px 34px rgba(23,46,99,.13); }
        .product-image-button { background: linear-gradient(145deg, #f2f6ff, #fff7e8); height: 218px; }
        .product-card-image { padding: 10px; }
        .product-card-body { padding: 16px 15px 15px; }
        .product-category-label { padding: 5px 9px; border-radius: 7px; background: #eaf0ff; color: #24458e; font-size: 10px; letter-spacing: .01em; }
        .product-card-body h4 { margin: 12px 0 10px; color: #122b5b; font-size: 18px; line-height: 1.25; font-weight: 750; letter-spacing: -.02em; }
        .product-price { align-items: baseline; flex-wrap: wrap; gap: 7px; margin-bottom: 14px; }
        .product-price span { color: #7786a1; font-size: 11px; }
        .product-price strong { color: #123a88; font-size: 21px; line-height: 1.15; font-weight: 900; letter-spacing: -.035em; }
        .product-price strong.price-coming-soon { font-size: 13px; letter-spacing: 0; }
        .view-product-button { min-height: 42px; margin-bottom: 9px; border: 1px solid #e1e9fb; background: #edf3ff; color: #173a82; border-radius: 11px; font-size: 11px; transition: background .2s ease, transform .2s ease; }
        .view-product-button:hover { background: #dfeaff; transform: translateY(-1px); }
        .add-to-cart-button { min-height: 44px; border: 1px solid #cfdbf2; border-radius: 11px; background: #fff; color: #17346e; font-size: 12px; }
        .add-to-cart-button:hover { border-color: #17346e; background: #f4f7ff; }
        .product-detail-layout { border-color: #dce5f4; box-shadow: 0 16px 40px rgba(26,50,95,.09); }
        .product-detail-price { color: #123a88; }
        .product-detail-price strong { font-size: 24px; font-weight: 900; }

        @media (max-width: 700px) {
          /* Mobile-only combo thumbnail layout; desktop remains unchanged. */
          .combo-package-card {
            display: grid;
            grid-template-columns: minmax(0, 1fr);
            gap: 18px;
            padding: 22px 18px;
            overflow: hidden;
          }
          .combo-content { min-width: 0; }
          .combo-content h3 { font-size: clamp(27px, 8vw, 34px); line-height: 1.06; }
          .combo-description { max-width: 30ch; font-size: 12px; line-height: 1.5; }
          .combo-visual {
            width: 100%;
            margin: 3px 0 0;
            display: grid;
            grid-template-columns: 62px minmax(0, 1fr);
            align-items: center;
            gap: 10px;
          }
          .combo-number { min-width: 0; }
          .combo-number strong { font-size: 40px; line-height: 1; }
          .combo-mini-grid {
            width: 100%;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 6px;
          }
          .combo-mini-grid .combo-mini-product {
            width: 100%;
            height: clamp(48px, 14vw, 66px);
            min-width: 0;
            padding: 4px;
            border-width: 1px;
            border-radius: 10px;
          }
          .combo-mini-product img { object-fit: contain; }
          .product-image-button { height: 175px; }
          .product-card-body { padding: 12px; }
          .product-card-body h4 { font-size: 16px; }
          .product-price strong { font-size: 18px; }
          .back-to-categories { min-height: 44px; padding: 11px 14px; font-size: 12px; }
        }
        @media (max-width: 380px) {
          .combo-package-card { padding: 18px 14px; }
          .combo-visual { grid-template-columns: 52px minmax(0, 1fr); gap: 8px; }
          .combo-number strong { font-size: 34px; }
          .combo-mini-grid { gap: 4px; }
          .combo-mini-grid .combo-mini-product { height: 46px; padding: 3px; }
        }

        /* Original product-card sizing retained for desktop. */
        @media (max-width: 700px) {
          .combo-package-card { padding: 25px 22px; margin-bottom: 48px; }
          .combo-visual { margin: 24px auto 0; gap: 14px; }
          .combo-mini-grid { grid-template-columns: repeat(2, 82px); gap: 7px; }
          .combo-mini-grid .combo-mini-product { height: 68px; border-radius: 13px; }
          .combo-number strong { font-size: 46px; }
          .product-image-button { height: 175px; }
          .product-card-body { padding: 12px; }
          .product-card-body h4 { font-size: 16px; }
          .product-price strong { font-size: 18px; }
          .back-to-categories { min-height: 44px; padding: 11px 14px; font-size: 12px; }
        }

      `}</style>
    </>
  );
}