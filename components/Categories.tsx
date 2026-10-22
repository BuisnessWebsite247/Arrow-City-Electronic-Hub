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
  { name: "Double Bed", image: "/images/products/beds/bed-09-3.jpeg" },
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
  const [comboView, setComboView] = useState<"gallery" | "customize">("gallery");
  const [selectedComboBedId, setSelectedComboBedId] = useState("bed-9");
  const [activeComboItemIndex, setActiveComboItemIndex] = useState<number | null>(null);
  const [selectedComboProducts, setSelectedComboProducts] = useState<Record<number, string>>({});
  const [removedComboItems, setRemovedComboItems] = useState<number[]>([]);

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
              COMBO PACKAGE
          ========================== */}

          <section className="combo-package-card combo-blue-yellow-hero" aria-labelledby="combo-hero-title">
            <div className="combo-blueprint-pattern" aria-hidden="true" />
            <div className="combo-blue-yellow-copy">
              <span className="combo-blue-yellow-kicker"><span className="combo-kicker-dot" /> COMPLETE HOME COMBO · 21 ITEMS</span>
              <h3 id="combo-hero-title">Your home.<br /><em>All set.</em></h3>
              <p className="combo-blue-yellow-description">Furniture and everyday electronics bundled into one complete home package.</p>
              <div className="combo-blue-yellow-benefits">
                <span><b>21</b> essentials</span><i aria-hidden="true" /><span><b>1</b> easy combo</span>
              </div>
              <div className="combo-blue-yellow-price-row">
                <span className="combo-blue-yellow-price-label">Combo reference price</span>
                <strong>₹81,000</strong>
              </div>
              <div className="combo-blue-yellow-actions">
                <button type="button" className="combo-blue-yellow-button combo-blue-yellow-primary" onClick={() => { setComboView("gallery"); setShowCombo(true); }}>
                  View Products <span aria-hidden="true">→</span>
                </button>
              </div>
              <small className="combo-blue-yellow-note">*Final availability and pricing confirmed by the showroom.</small>
            </div>

            <div className="combo-blue-yellow-art" aria-label="Patterned illustrations of home essentials">
              <div className="combo-art-orbit combo-art-orbit-one" aria-hidden="true" />
              <div className="combo-art-orbit combo-art-orbit-two" aria-hidden="true" />
              <div className="combo-art-grid" aria-hidden="true" />
              <div className="combo-art-stamp"><strong>21</strong><span>HOME<br />ESSENTIALS</span></div>
              <div className="combo-art-tile combo-art-tile-bed"><span className="combo-art-icon" aria-hidden="true">▰</span><b>Furniture</b><small>Rest & relax</small></div>
              <div className="combo-art-tile combo-art-tile-tv"><span className="combo-art-icon" aria-hidden="true">▣</span><b>Smart TV</b><small>Entertainment</small></div>
              <div className="combo-art-tile combo-art-tile-fridge"><span className="combo-art-icon" aria-hidden="true">▤</span><b>Refrigerator</b><small>Everyday ease</small></div>
              <div className="combo-art-tile combo-art-tile-sofa"><span className="combo-art-icon" aria-hidden="true">▰</span><b>Sofa set</b><small>Gather together</small></div>
              <div className="combo-art-yellow-disc" aria-hidden="true">HOME<br />STARTS<br />HERE</div>
            </div>
          </section>

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

      {showCombo && (() => {
        const originalBed = products.find((product) => product.id === "bed-9");
        const selectedBed = products.find((product) => product.id === selectedComboBedId) ?? originalBed;
        const baseComboPrice = 81000;
        const originalBedPrice = originalBed?.price ?? 0;
        const selectedBedPrice = selectedBed?.price ?? originalBedPrice;
        // Base allowance for each item in the combo. These values are used
        // only by the combo customiser; the Shop With Us catalogue is unchanged.
        const baseItemPrices: Record<number, number> = {
          0: 11000, // Bed
          1: 11000, // Fridge
          2: 9000,  // LED / Smart TV
          3: 6000,  // Sofa
          4: 9000,  // Washing machine
          5: 3500,  // Cooler
          6: 4500,  // Almari
          7: 2000,  // Table
          8: 3000,  // Dressing
          9: 1000,  // Gas stove
          10: 2300, // Kitchen bartan set
          11: 2700, // Serving machine
          12: 3500, // Mattress
          13: 400,  // Pillow
          14: 1700, // Mixer grinder
          15: 500,  // Iron
          16: 900,  // Blanket
          17: 400,  // Bedsheet
          18: 900,  // Hand mixer
          19: 800,  // Watch / clock
          20: 300,  // Stool
        };
        // Upgrades are charged only when a customer actively selects an alternative.
        const isBedCustomized = selectedComboBedId !== (originalBed?.id ?? "bed-1");
        const bedExtraCharge = isBedCustomized ? Math.max(0, selectedBedPrice - baseItemPrices[0]) : 0;
        const categoryMap: Record<number, string> = {
          0: "beds", 1: "refrigerators", 2: "smart-tv", 3: "sofas", 4: "washing-machines",
          5: "coolers-ac", 6: "almira-wardrobes", 7: "tables", 8: "almira-wardrobes",
          9: "kitchen-appliances", 10: "kitchen-appliances", 11: "home-appliances", 12: "mattresses",
          13: "home-appliances", 14: "kitchen-appliances", 15: "home-appliances", 16: "home-appliances",
          17: "home-appliances", 18: "kitchen-appliances", 19: "home-appliances", 20: "tables"
        };
        // These package items currently have no selectable alternatives in the catalogue.
        const nonCustomizableItems = new Set([10, 13, 16, 17, 19, 20]);
        // Removing an item deducts its supplied base allowance, not its retail price.
        const itemPriceForRemoval = (index: number) => baseItemPrices[index] ?? 0;
        const removedDeduction = removedComboItems.reduce((total, index) => total + itemPriceForRemoval(index), 0);
        const selectedUpgradeCharges = Object.entries(selectedComboProducts).reduce((total, [rawIndex, productId]) => {
          const index = Number(rawIndex);
          if (removedComboItems.includes(index)) return total;
          const selectedProduct = products.find((product) => product.id === productId);
          if (!selectedProduct || selectedProduct.price <= 0) return total;
          return total + Math.max(0, selectedProduct.price - (baseItemPrices[index] ?? 0));
        }, 0);
        const customizationExtraTotal = (removedComboItems.includes(0) ? 0 : bedExtraCharge) + selectedUpgradeCharges;
        const customizedComboPrice = Math.max(0, baseComboPrice + customizationExtraTotal - removedDeduction);
        const comboSavings = 120000 - customizedComboPrice;
        const extraChargeForOption = (index: number, option: Product) =>
          index === 0 && option.id === (originalBed?.id ?? "bed-9")
            ? 0
            : Math.max(0, option.price - (baseItemPrices[index] ?? 0));
        const selectedNameFor = (index: number) => {
          if (index === 0) return isBedCustomized ? (selectedBed?.name ?? comboItems[0].name) : "Double Bed";
          const chosen = products.find((product) => product.id === selectedComboProducts[index]);
          return chosen?.name ?? comboItems[index].name;
        };
        const selectedImageFor = (index: number) => {
          // Use the exact Bed 09 image requested as the default combo bed.
          if (index === 0) {
            if (selectedBed?.id === "bed-9") return "/images/products/beds/bed-09-3.jpeg";
            return selectedBed?.images?.[2] ?? selectedBed?.images?.[0] ?? comboItems[0].image;
          }
          const chosen = products.find((product) => product.id === selectedComboProducts[index]);
          return chosen?.images?.[0] ?? comboItems[index].image;
        };
        // Keep combo alternatives specific to the item being customised.
        // This filter is used only by the combo customiser; the Shop With Us catalogue is unchanged.
        const optionsFor = (index: number) => products.filter((product) => {
          if (product.category !== categoryMap[index]) return false;
          const id = product.id.toLowerCase();
          const name = product.name.toLowerCase();
          switch (index) {
            case 5: return id.startsWith("cooler-") || name.startsWith("cooler");
            case 6: return id.startsWith("almira-") || name.startsWith("almira");
            case 8: return id.includes("dressing") || name.includes("dressing") || id.includes("wardrobe") || name.includes("wardrobe");
            case 11: return id.includes("sewing") || name.includes("sewing") || id.includes("serving") || name.includes("serving");
            case 9: return id.startsWith("gas-stove-") || name.includes("gas stove");
            case 14: return id.includes("mixer-grinder") || id.includes("mixer") || name.includes("mixer grinder");
            case 15: return id.startsWith("home-appliance-") && name.startsWith("iron");
            case 18: return id.includes("hand-mixer") || name.includes("hand mixer");
            default: return true;
          }
        });
        const comboMessage = [
          "Hello Arrow City Electronic Hub, I am interested in the Complete Home Combo Package.",
          `Current combo reference price: Rs. ${customizedComboPrice.toLocaleString("en-IN")} (subject to showroom confirmation).`,
          `Selected bed: ${selectedBed?.name ?? "Double Bed"}.`,
          ...comboItems.map((item, index) => removedComboItems.includes(index) ? `${item.name}: REMOVED from combo` : `${item.name}: ${selectedNameFor(index)}${index === 0 || selectedComboProducts[index] ? "" : " (default item)"}`),
          "Please confirm availability and the final prices for all selected items."
        ].join(" ");

        return (
          <div className="categories-modal-backdrop combo-backdrop" onClick={() => setShowCombo(false)}>
            <div className="combo-modal combo-customizer-modal combo-redesign" onClick={(event) => event.stopPropagation()}>
              <button type="button" className="modal-close" aria-label="Close combo customizer" onClick={() => setShowCombo(false)}>×</button>
              {comboView === "gallery" ? (
                <div className="combo-gallery-view">
                  <div className="combo-redesign-heading combo-gallery-heading">
                    
                    <h3>Home <span>Collection</span></h3>
                    <p>21 essentials, one considered package.</p>
                    <div className="combo-gallery-actions">
                      <button type="button" className="combo-top-customize" onClick={() => { setComboView("customize"); setActiveComboItemIndex(null); }}><span className="combo-top-customize-icon" aria-hidden="true">✦</span> Customize <span className="combo-top-customize-arrow" aria-hidden="true">↗</span></button>
                    </div>
                  </div>
                  <div className="combo-total-panel combo-gallery-total">
                    <div><span className="combo-total-label">PACKAGE PRICE</span><div className="modal-price"><span>₹1,20,000</span><strong>{formatPrice(customizedComboPrice)}</strong></div><p className="modal-saving">{comboSavings >= 0 ? `Save ${formatPrice(comboSavings)}*` : `${formatPrice(Math.abs(comboSavings))} above reference price`}</p></div>
                    <span className="combo-gallery-count">{21 - removedComboItems.length} ITEMS INCLUDED</span>
                  </div>
                  <p className="combo-price-disclaimer">*Final price and availability confirmed by showroom.</p>
                  <div className="combo-gallery-grid">
                    {comboItems.map((item, index) => {
                      if (removedComboItems.includes(index)) return null;
                      const isBed = index === 0;
                      const selected = isBed ? selectedBed : products.find((product) => product.id === selectedComboProducts[index]);
                      const image = isBed
                        ? (selected?.id === "bed-9"
                            ? "/images/products/beds/bed-09-3.jpeg"
                            : (selected?.images?.[2] ?? selected?.images?.[0] ?? item.image))
                        : (selected?.images?.[0] ?? item.image);
                      const name = isBed && !isBedCustomized ? "Double Bed" : (selected?.name ?? item.name);
                      return <article className="combo-gallery-card" key={item.name} style={{ animationDelay: `${Math.min(index, 10) * 25}ms` }}>
                        <div className="combo-gallery-image"><img src={image} alt={name} loading="lazy"/><span>{String(index + 1).padStart(2, "0")}</span></div>
                        <div className="combo-gallery-card-copy"><strong>{name}</strong><span>{item.name}</span></div>
                      </article>;
                    })}
                  </div>
                  <div className="combo-gallery-footer combo-gallery-footer-whatsapp">
                    <a
                      href={`https://wa.me/919729802008?text=${encodeURIComponent(`Hello Arrow City Electronic Hub! I’m interested in the Complete Home Combo Package. Current displayed price: ${formatPrice(customizedComboPrice)}. Please confirm availability and the final price for my selected items.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="combo-whatsapp-enquiry"
                    >
                      <span className="combo-whatsapp-mark" aria-hidden="true">↗</span>
                      <span>Enquire on WhatsApp</span>
                      <span className="combo-whatsapp-arrow" aria-hidden="true">→</span>
                    </a>
                  </div>
                </div>
              ) : (
                <>
              <div className="combo-redesign-heading">
                <span className="section-badge">SPECIAL COMBO PACKAGE · 21 ITEMS</span>
                <h3>Build your <span>Home Combo</span></h3>
                <p>Choose alternatives you like. We’ll confirm availability and final pricing with you.</p>
              </div>

              <div className="combo-total-panel combo-sticky-total">
                <div>
                  <span className="combo-total-label">Starting package price</span>
                  <div className="modal-price"><span>₹1,20,000</span><strong>{formatPrice(customizedComboPrice)}</strong></div>
                  <p className="modal-saving">{comboSavings >= 0 ? `Save ${formatPrice(comboSavings)}*` : `${formatPrice(Math.abs(comboSavings))} above reference price`}</p>
                </div>
                <span className="combo-price-change">{customizationExtraTotal === 0 ? "Base package" : `+${formatPrice(customizationExtraTotal)} customisation`}</span>
              </div>
              <p className="combo-price-disclaimer">*The total reflects the bed adjustment and confirmed item deductions. Any item without a confirmed included price must be verified by the showroom.</p>

              <div className="combo-redesign-list">
                {comboItems.map((item, index) => {
                  if (removedComboItems.includes(index)) return null;
                  const isOpen = activeComboItemIndex === index;
                  const options = optionsFor(index);
                  const isBed = index === 0;
                  return (
                    <article className={`combo-line ${isOpen ? "is-expanded" : ""}`} key={item.name}>
                      <div
                        className="combo-line-main"
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        aria-label={`${isOpen ? "Close" : "Customise"} ${item.name} options`}
                        onClick={() => setActiveComboItemIndex(isOpen ? null : index)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setActiveComboItemIndex(isOpen ? null : index);
                          }
                        }}
                      >
                        <div className="combo-line-image"><img src={selectedImageFor(index)} alt={selectedNameFor(index)} /><span>{String(index + 1).padStart(2, "0")}</span></div>
                        <div className="combo-line-copy"><strong>{selectedNameFor(index)}</strong><span>{item.name}</span></div>
                        <div className="combo-line-actions">
                          <button type="button" className="combo-remove-item-btn" onClick={(event) => { event.stopPropagation(); setRemovedComboItems((prev) => [...prev, index]); setActiveComboItemIndex(null); }} aria-label={`Remove ${item.name} from combo`}>Remove</button>
                        </div>
                      </div>
                      {isOpen && (
                        <div className="combo-options-panel">
                          {nonCustomizableItems.has(index) ? (
                            <p className="combo-unavailable-note"><strong>Customization options aren’t available for this item yet.</strong><span>You can keep it in your package or remove it using the Remove button.</span></p>
                          ) : <>
                          <div className="combo-options-heading"><strong>{index === 5 ? "Choose a cooler or AC" : index === 6 || index === 8 ? "Choose an almira or dressing unit" : index === 9 || index === 14 || index === 18 ? "Choose a kitchen appliance" : `Choose ${item.name.toLowerCase()}`}</strong><span>{options.length ? `${options.length} catalogue options` : "Ask showroom for alternatives"}</span></div>
                          {options.length ? <div className="combo-option-strip">
                            {options.map((option) => {
                              const isSelected = isBed ? selectedComboBedId === option.id : selectedComboProducts[index] === option.id;
                              return <button type="button" key={option.id} className={`combo-option-card ${isSelected ? "selected" : ""}`} onClick={() => { if (isBed) setSelectedComboBedId(option.id); else setSelectedComboProducts((prev) => ({ ...prev, [index]: option.id })); }}>
                                <img src={isBed && option.id === "bed-9" ? "/images/products/beds/bed-09-3.jpeg" : (option.images?.[0] ?? item.image)} alt={option.name} loading="lazy" />
                                <span className="combo-option-name">{option.name}</span>
                                {option.price > 0 && (
                                  <b className="combo-option-extra">+{formatPrice(extraChargeForOption(index, option))}</b>
                                )}
                                <small>{isSelected ? "Selected ✓" : "Select option"}</small>
                              </button>;
                            })}
                          </div> : <p className="combo-no-options">We’ll help you choose a suitable alternative. Contact the showroom to confirm options and prices.</p>}
                          </>}
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
              <div className="combo-redesign-footer"><button type="button" className="combo-back-btn" onClick={() => setComboView("gallery")}>← Back to 21 items</button><span>Review your choices, then save your combo.</span><button type="button" className="combo-modal-button" onClick={() => { setComboView("gallery"); setActiveComboItemIndex(null); }}>Save combo <span>✓</span></button></div>
                </>
              )}
            </div>
          </div>
        );
      })()}

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
          /* Wider desktop layout: reduce the side gaps while keeping mobile spacing. */
          width: min(1350px, calc(100% - 48px));
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

        .combo-customizer-modal {
          width: min(1040px, 100%);
        }

        .combo-total-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 18px 20px;
          margin: 18px 0 10px;
          border: 1px solid #e8edf4;
          border-radius: 18px;
          background: linear-gradient(135deg, #f8fafc, #fffaf0);
        }

        .combo-total-label {
          display: block;
          margin-bottom: 7px;
          color: #667085;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .combo-price-change {
          flex-shrink: 0;
          padding: 9px 12px;
          border-radius: 999px;
          background: #eef2f7;
          color: #344054;
          font-size: 12px;
          font-weight: 800;
        }

        .combo-price-change.is-up { background: #fff0e8; color: #b54708; }
        .combo-price-change.is-down { background: #eaf8ef; color: #167344; }
        .combo-price-change.is-same { background: #eef2f7; color: #344054; }

        .combo-customizer-note {
          margin: 10px 0 18px;
          color: #667085;
          font-size: 13px;
          line-height: 1.6;
        }

        .combo-item-customizable {
          border-color: #f5a000;
          box-shadow: 0 8px 22px rgba(245, 160, 0, .12);
        }

        .combo-bed-picker {
          display: grid;
          gap: 7px;
          padding: 10px;
        }

        .combo-bed-picker label {
          color: #667085;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .combo-bed-picker select {
          width: 100%;
          min-width: 0;
          padding: 10px 11px;
          border: 1px solid #d9e0ea;
          border-radius: 10px;
          background: #fff;
          color: #172e63;
          font: inherit;
          font-size: 13px;
          outline-offset: 2px;
        }

        .combo-bed-price {
          color: #172e63;
          font-size: 13px;
          font-weight: 800;
        }

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

        .combo-customizer-modal {
          width: min(1040px, 100%);
        }

        .combo-total-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 18px 20px;
          margin: 18px 0 10px;
          border: 1px solid #e8edf4;
          border-radius: 18px;
          background: linear-gradient(135deg, #f8fafc, #fffaf0);
        }

        .combo-total-label {
          display: block;
          margin-bottom: 7px;
          color: #667085;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .combo-price-change {
          flex-shrink: 0;
          padding: 9px 12px;
          border-radius: 999px;
          background: #eef2f7;
          color: #344054;
          font-size: 12px;
          font-weight: 800;
        }

        .combo-price-change.is-up { background: #fff0e8; color: #b54708; }
        .combo-price-change.is-down { background: #eaf8ef; color: #167344; }
        .combo-price-change.is-same { background: #eef2f7; color: #344054; }

        .combo-customizer-note {
          margin: 10px 0 18px;
          color: #667085;
          font-size: 13px;
          line-height: 1.6;
        }

        .combo-item-customizable {
          border-color: #f5a000;
          box-shadow: 0 8px 22px rgba(245, 160, 0, .12);
        }

        .combo-bed-picker {
          display: grid;
          gap: 7px;
          padding: 10px;
        }

        .combo-bed-picker label {
          color: #667085;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .combo-bed-picker select {
          width: 100%;
          min-width: 0;
          padding: 10px 11px;
          border: 1px solid #d9e0ea;
          border-radius: 10px;
          background: #fff;
          color: #172e63;
          font: inherit;
          font-size: 13px;
          outline-offset: 2px;
        }

        .combo-bed-price {
          color: #172e63;
          font-size: 13px;
          font-weight: 800;
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
          top: 12px;
          right: 12px;
          z-index: 10020;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          margin: 0;
          padding: 0;
          border: 1px solid #dce3ee;
          border-radius: 50%;
          background: #ffffff;
          color: #172e63;
          font-size: 27px;
          line-height: 1;
          cursor: pointer;
          pointer-events: auto;
          touch-action: manipulation;
          box-shadow: 0 4px 16px rgba(8, 18, 40, 0.16);
        }

        .modal-close:hover {
          background: #fff3d4;
        }

        .modal-close:focus-visible {
          outline: 3px solid #f5a000;
          outline-offset: 3px;
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

          .combo-customizer-modal {
          width: min(1040px, 100%);
        }

        .combo-total-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 18px 20px;
          margin: 18px 0 10px;
          border: 1px solid #e8edf4;
          border-radius: 18px;
          background: linear-gradient(135deg, #f8fafc, #fffaf0);
        }

        .combo-total-label {
          display: block;
          margin-bottom: 7px;
          color: #667085;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .combo-price-change {
          flex-shrink: 0;
          padding: 9px 12px;
          border-radius: 999px;
          background: #eef2f7;
          color: #344054;
          font-size: 12px;
          font-weight: 800;
        }

        .combo-price-change.is-up { background: #fff0e8; color: #b54708; }
        .combo-price-change.is-down { background: #eaf8ef; color: #167344; }
        .combo-price-change.is-same { background: #eef2f7; color: #344054; }

        .combo-customizer-note {
          margin: 10px 0 18px;
          color: #667085;
          font-size: 13px;
          line-height: 1.6;
        }

        .combo-item-customizable {
          border-color: #f5a000;
          box-shadow: 0 8px 22px rgba(245, 160, 0, .12);
        }

        .combo-bed-picker {
          display: grid;
          gap: 7px;
          padding: 10px;
        }

        .combo-bed-picker label {
          color: #667085;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .combo-bed-picker select {
          width: 100%;
          min-width: 0;
          padding: 10px 11px;
          border: 1px solid #d9e0ea;
          border-radius: 10px;
          background: #fff;
          color: #172e63;
          font: inherit;
          font-size: 13px;
          outline-offset: 2px;
        }

        .combo-bed-price {
          color: #172e63;
          font-size: 13px;
          font-weight: 800;
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

          .combo-customizer-modal {
          width: min(1040px, 100%);
        }

        .combo-total-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 18px 20px;
          margin: 18px 0 10px;
          border: 1px solid #e8edf4;
          border-radius: 18px;
          background: linear-gradient(135deg, #f8fafc, #fffaf0);
        }

        .combo-total-label {
          display: block;
          margin-bottom: 7px;
          color: #667085;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .combo-price-change {
          flex-shrink: 0;
          padding: 9px 12px;
          border-radius: 999px;
          background: #eef2f7;
          color: #344054;
          font-size: 12px;
          font-weight: 800;
        }

        .combo-price-change.is-up { background: #fff0e8; color: #b54708; }
        .combo-price-change.is-down { background: #eaf8ef; color: #167344; }
        .combo-price-change.is-same { background: #eef2f7; color: #344054; }

        .combo-customizer-note {
          margin: 10px 0 18px;
          color: #667085;
          font-size: 13px;
          line-height: 1.6;
        }

        .combo-item-customizable {
          border-color: #f5a000;
          box-shadow: 0 8px 22px rgba(245, 160, 0, .12);
        }

        .combo-bed-picker {
          display: grid;
          gap: 7px;
          padding: 10px;
        }

        .combo-bed-picker label {
          color: #667085;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .combo-bed-picker select {
          width: 100%;
          min-width: 0;
          padding: 10px 11px;
          border: 1px solid #d9e0ea;
          border-radius: 10px;
          background: #fff;
          color: #172e63;
          font: inherit;
          font-size: 13px;
          outline-offset: 2px;
        }

        .combo-bed-price {
          color: #172e63;
          font-size: 13px;
          font-weight: 800;
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
        .combo-customizer-modal {
          width: min(1040px, 100%);
        }

        .combo-total-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 18px 20px;
          margin: 18px 0 10px;
          border: 1px solid #e8edf4;
          border-radius: 18px;
          background: linear-gradient(135deg, #f8fafc, #fffaf0);
        }

        .combo-total-label {
          display: block;
          margin-bottom: 7px;
          color: #667085;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .combo-price-change {
          flex-shrink: 0;
          padding: 9px 12px;
          border-radius: 999px;
          background: #eef2f7;
          color: #344054;
          font-size: 12px;
          font-weight: 800;
        }

        .combo-price-change.is-up { background: #fff0e8; color: #b54708; }
        .combo-price-change.is-down { background: #eaf8ef; color: #167344; }
        .combo-price-change.is-same { background: #eef2f7; color: #344054; }

        .combo-customizer-note {
          margin: 10px 0 18px;
          color: #667085;
          font-size: 13px;
          line-height: 1.6;
        }

        .combo-item-customizable {
          border-color: #f5a000;
          box-shadow: 0 8px 22px rgba(245, 160, 0, .12);
        }

        .combo-bed-picker {
          display: grid;
          gap: 7px;
          padding: 10px;
        }

        .combo-bed-picker label {
          color: #667085;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .combo-bed-picker select {
          width: 100%;
          min-width: 0;
          padding: 10px 11px;
          border: 1px solid #d9e0ea;
          border-radius: 10px;
          background: #fff;
          color: #172e63;
          font: inherit;
          font-size: 13px;
          outline-offset: 2px;
        }

        .combo-bed-price {
          color: #172e63;
          font-size: 13px;
          font-weight: 800;
        }

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
          .combo-customizer-modal {
          width: min(1040px, 100%);
        }

        .combo-total-panel {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          padding: 18px 20px;
          margin: 18px 0 10px;
          border: 1px solid #e8edf4;
          border-radius: 18px;
          background: linear-gradient(135deg, #f8fafc, #fffaf0);
        }

        .combo-total-label {
          display: block;
          margin-bottom: 7px;
          color: #667085;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: .08em;
          text-transform: uppercase;
        }

        .combo-price-change {
          flex-shrink: 0;
          padding: 9px 12px;
          border-radius: 999px;
          background: #eef2f7;
          color: #344054;
          font-size: 12px;
          font-weight: 800;
        }

        .combo-price-change.is-up { background: #fff0e8; color: #b54708; }
        .combo-price-change.is-down { background: #eaf8ef; color: #167344; }
        .combo-price-change.is-same { background: #eef2f7; color: #344054; }

        .combo-customizer-note {
          margin: 10px 0 18px;
          color: #667085;
          font-size: 13px;
          line-height: 1.6;
        }

        .combo-item-customizable {
          border-color: #f5a000;
          box-shadow: 0 8px 22px rgba(245, 160, 0, .12);
        }

        .combo-bed-picker {
          display: grid;
          gap: 7px;
          padding: 10px;
        }

        .combo-bed-picker label {
          color: #667085;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .06em;
          text-transform: uppercase;
        }

        .combo-bed-picker select {
          width: 100%;
          min-width: 0;
          padding: 10px 11px;
          border: 1px solid #d9e0ea;
          border-radius: 10px;
          background: #fff;
          color: #172e63;
          font: inherit;
          font-size: 13px;
          outline-offset: 2px;
        }

        .combo-bed-price {
          color: #172e63;
          font-size: 13px;
          font-weight: 800;
        }

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

        @media (max-width: 600px) {
          .combo-customizer-modal { padding: 22px 14px; border-radius: 20px; }
          .combo-total-panel { align-items: flex-start; flex-direction: column; padding: 14px; }
          .combo-total-panel .modal-price { flex-wrap: wrap; gap: 8px; }
          .combo-total-panel .modal-price strong { font-size: 23px; }
          .combo-price-change { white-space: normal; }
          .combo-bed-picker { padding: 8px; }
        }
      

        .combo-gallery-view { animation: comboGalleryEnter .3s ease both; }
        .combo-gallery-heading { padding-right:42px; }
        .combo-gallery-total { display:flex;align-items:center;justify-content:space-between;gap:16px;margin:20px 0 0;padding:16px 18px;border:1px solid #f2e6ce;border-radius:16px;background:linear-gradient(110deg,#fff 0%,#fff8eb 100%); }
        .combo-gallery-count { flex:0 0 auto;padding:10px 13px;border-radius:99px;background:#eef2f7;color:#253653;font-size:11px;font-weight:850;letter-spacing:.04em; }
        .combo-gallery-grid { display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px;margin-top:16px; }
        .combo-gallery-card { min-width:0;overflow:hidden;border:1px solid #e5eaf1;border-radius:16px;background:#fff;box-shadow:0 5px 16px rgba(20,40,75,.035);animation:comboGalleryEnter .35s ease both;transition:transform .22s,border-color .22s,box-shadow .22s; }
        .combo-gallery-card:hover { transform:translateY(-3px);border-color:#f2bd53;box-shadow:0 12px 25px rgba(20,40,75,.09); }
        .combo-gallery-image { height:clamp(145px,20vw,220px);position:relative;background:#f2f4f7;overflow:hidden; }
        .combo-gallery-image img { width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s; }
        .combo-gallery-card:hover .combo-gallery-image img { transform:scale(1.045); }
        .combo-gallery-image span { position:absolute;top:10px;left:10px;padding:5px 7px;border-radius:7px;background:#102958;color:#fff;font-size:10px;font-weight:850;box-shadow:0 3px 8px #10295833; }
        .combo-gallery-card-copy { display:flex;flex-direction:column;gap:5px;padding:12px 13px 14px; }
        .combo-gallery-card-copy strong { overflow:hidden;text-overflow:ellipsis;white-space:nowrap;color:#102958;font-size:14px; }
        .combo-gallery-card-copy span { color:#8791a3;font-size:11px; }
        .combo-gallery-card-copy b { color:#d88700;font-size:13px; }
        .combo-gallery-footer { position:sticky;bottom:-1px;display:flex;align-items:center;justify-content:space-between;gap:14px;margin-top:20px;padding:15px 0 2px;background:#fffdfa;border-top:1px solid #e9edf3; }
        .combo-gallery-footer > span { color:#718096;font-size:12px; }
        .combo-gallery-footer .combo-modal-button { margin:0;white-space:nowrap; }
        .combo-back-btn { flex:0 0 auto;border:1px solid #dbe2ec;border-radius:10px;background:#fff;color:#19345f;padding:11px 13px;font-size:12px;font-weight:750;cursor:pointer; }
        .combo-back-btn:hover { background:#f5f7fa; }
        @keyframes comboGalleryEnter { from { opacity:0;transform:translateY(8px); } to { opacity:1;transform:translateY(0); } }
        @media(max-width:700px) { .combo-gallery-grid { grid-template-columns:repeat(2,minmax(0,1fr));gap:9px; } .combo-gallery-image { height:150px; } .combo-gallery-card-copy { padding:10px; } .combo-gallery-card-copy strong { font-size:12px; } .combo-gallery-card-copy b { font-size:12px; } .combo-gallery-total { padding:12px;align-items:flex-start; } .combo-gallery-count { font-size:9px;padding:8px; } .combo-gallery-footer { align-items:stretch;flex-direction:column;gap:10px; } .combo-gallery-footer .combo-modal-button { width:100%; } .combo-gallery-heading { padding-right:28px; } }
        @media(max-width:380px) { .combo-gallery-grid { grid-template-columns:1fr 1fr; } .combo-gallery-image { height:125px; } }

        .combo-redesign { width:min(920px,100%); padding:clamp(18px,3vw,30px); border-radius:24px; background:#fffdfa; color:#13264b; }
        .combo-redesign-heading { padding-right:42px; }
        .combo-redesign-heading h3 { margin:12px 0 6px; font-size:clamp(28px,4vw,40px); line-height:1.08; letter-spacing:-1.2px; }
        .combo-redesign-heading h3 span { color:#f59b00; display:inline; }
        .combo-redesign-heading p { margin:0 0 18px; color:#64748b; font-size:14px; }
        .combo-sticky-total { position:sticky; top:-1px; z-index:5; border:1px solid #f2e6ce; box-shadow:0 8px 20px rgba(24,39,75,.06); background:linear-gradient(110deg,#fff 0%,#fff8eb 100%); border-radius:16px; padding:15px 18px; }
        .combo-price-disclaimer { margin:8px 0 16px; color:#778196; font-size:11px; line-height:1.5; }
        .combo-redesign-list { display:flex; flex-direction:column; gap:8px; }
        .combo-line { border:1px solid #e7ebf2; border-radius:15px; overflow:hidden; background:#fff; transition:border-color .25s,box-shadow .25s,transform .25s; }
        .combo-line:hover,.combo-line.is-expanded { border-color:#f3b43e; box-shadow:0 8px 22px rgba(19,38,75,.07); }
        .combo-line-main { display:flex; align-items:center; gap:13px; padding:10px 12px; }
        .combo-line-image { width:76px; height:68px; flex:0 0 76px; position:relative; border-radius:10px; overflow:hidden; background:#f2f4f8; }
        .combo-line-image img { width:100%;height:100%;object-fit:cover;transition:transform .35s; }
        .combo-line:hover .combo-line-image img { transform:scale(1.06); }
        .combo-line-image span { position:absolute;top:5px;left:5px;background:#102958;color:white;border-radius:6px;padding:3px 5px;font-size:9px;font-weight:800; }
        .combo-line-copy { min-width:0; flex:1; display:flex; flex-direction:column; gap:3px; }
        .combo-line-copy strong { font-size:14px; color:#102958; overflow:hidden;text-overflow:ellipsis;white-space:nowrap; }
        .combo-line-copy span { font-size:11px; color:#8490a3; }
        .combo-line-copy b { font-size:12px; color:#d88700; }
        .combo-change-btn { border:1px solid #e8a321; color:#142b54; background:#fff8e9; border-radius:9px; padding:9px 13px; font-weight:750; font-size:12px; cursor:pointer; transition:background .2s,color .2s,transform .2s; }
        .combo-change-btn:hover,.combo-change-btn.active { background:#f5a900;color:#14264a; transform:translateY(-1px); }
        .combo-options-panel { padding:0 13px 14px; animation:comboReveal .24s ease both; border-top:1px solid #f0f2f6; }
        .combo-options-heading { display:flex;align-items:center;justify-content:space-between;gap:10px;padding:13px 0 10px;font-size:12px; }
        .combo-options-heading span { color:#8791a3;font-size:10px; }
        .combo-option-strip { display:grid;grid-template-columns:repeat(auto-fill,minmax(135px,1fr));gap:10px; }
        .combo-option-card { text-align:left; min-width:0; padding:7px; border:1px solid #e5e9f0; border-radius:12px; background:#fff; cursor:pointer; transition:transform .22s,border-color .22s,box-shadow .22s; }
        .combo-option-card:hover { transform:translateY(-3px);box-shadow:0 8px 18px rgba(20,40,75,.1); }
        .combo-option-card.selected { border:2px solid #efa800; padding:6px; background:#fffaf0; }
        .combo-option-card img { width:100%;height:90px;object-fit:cover;border-radius:8px;background:#f3f4f6;display:block;margin-bottom:8px; }
        .combo-option-name { display:block;font-size:11px;font-weight:750;color:#162b50;line-height:1.35;min-height:29px; }
        .combo-option-card b { display:block;margin-top:5px;font-size:11px;color:#d88700; }
        .combo-option-card .combo-option-extra { margin-top:7px;font-size:12px;font-weight:800;color:#a8792e; }
        .combo-option-card small { display:block;margin-top:6px;font-size:10px;color:#6f7b8f; }
        .combo-no-options { padding:12px;border-radius:10px;background:#f8fafc;color:#667085;font-size:12px; }
        .combo-redesign-footer { display:flex;align-items:center;justify-content:space-between;gap:16px;margin-top:18px;padding-top:15px;border-top:1px solid #e9edf3; }
        .combo-redesign-footer > span { font-size:11px;color:#718096; }
        .combo-redesign .combo-modal-button { margin:0;white-space:nowrap; }
        @keyframes comboReveal { from { opacity:0;transform:translateY(-7px); } to { opacity:1;transform:translateY(0); } }
        @media(max-width:600px) {
          .combo-redesign { padding:17px 12px;border-radius:19px; }
          .combo-redesign-heading { padding-right:28px; }
          .combo-redesign-heading p { font-size:12px; }
          .combo-sticky-total { padding:12px;gap:8px;align-items:flex-start; }
          .combo-sticky-total .modal-price strong { font-size:23px; }
          .combo-price-change { font-size:10px!important;max-width:110px;text-align:right; }
          .combo-line-main { gap:9px;padding:8px; }
          .combo-line-image { width:61px;height:59px;flex-basis:61px; }
          .combo-line-copy strong { font-size:12px; }
          .combo-change-btn { padding:8px 10px;font-size:11px; }
          .combo-option-strip { grid-template-columns:repeat(2,minmax(0,1fr)); }
          .combo-option-card img { height:100px; }
          .combo-redesign-footer { align-items:stretch;flex-direction:column;gap:10px; }
          .combo-redesign-footer .combo-modal-button { width:100%; }
        }
        @media(prefers-reduced-motion:reduce) { .combo-redesign *, .combo-redesign *::before, .combo-redesign *::after { animation:none!important;transition:none!important; } }

        /* Premium editorial redesign: deep forest, warm ivory and brushed champagne */
        .combo-backdrop { background:rgba(8,18,24,.72)!important;backdrop-filter:blur(14px) saturate(125%); }
        .combo-redesign { width:min(1040px,100%);padding:clamp(22px,3.2vw,38px);border:1px solid rgba(255,255,255,.72);border-radius:28px;background:radial-gradient(ellipse at 95% 0%,rgba(202,169,104,.13),transparent 34%),linear-gradient(145deg,#fffdf8 0%,#f8f5ed 100%);color:#183b35;box-shadow:0 32px 100px rgba(3,17,19,.38),inset 0 1px 0 rgba(255,255,255,.9); }
        .combo-redesign .modal-close { border:1px solid #e4e0d5;background:rgba(255,255,255,.82);color:#183b35;box-shadow:0 4px 14px rgba(17,49,43,.08);transition:transform .25s,background .25s; }
        .combo-redesign .modal-close:hover { transform:rotate(90deg);background:#e8d5a8; }
        .combo-redesign-heading .section-badge { color:#a8792e;letter-spacing:.19em;font-size:10px; }
        .combo-redesign-heading h3 { color:#173c35;font-family:Georgia,'Times New Roman',serif;font-weight:500;font-size:clamp(32px,4.5vw,48px);letter-spacing:-1.5px; }
        .combo-redesign-heading h3 span { color:#b18a48; }
        .combo-redesign-heading p { color:#687b73;line-height:1.65; }
        .combo-gallery-topline { display:flex;align-items:center;justify-content:space-between;gap:14px;padding-right:40px; }
        .combo-top-customize { display:inline-flex;align-items:center;justify-content:center;gap:10px;flex:0 0 auto;border:1px solid #234b41;border-radius:999px;padding:12px 17px;background:linear-gradient(135deg,#214c41,#12352e);color:#fffdf6;font-size:12px;font-weight:750;letter-spacing:.015em;box-shadow:0 8px 22px rgba(24,63,53,.2),inset 0 1px 0 rgba(255,255,255,.16);cursor:pointer;transition:transform .25s,box-shadow .25s,background .25s; }
        .combo-top-customize:hover { transform:translateY(-2px);box-shadow:0 13px 28px rgba(24,63,53,.28);background:linear-gradient(135deg,#2b5b4e,#194338); }
        .combo-top-customize-icon { color:#e5c783;font-size:15px; }
        .combo-gallery-total { margin-top:23px;padding:20px 22px;border:1px solid #e8dcc3;border-radius:19px;background:linear-gradient(115deg,rgba(255,255,255,.95),rgba(250,244,229,.92));box-shadow:0 12px 28px rgba(44,63,51,.055); }
        .combo-total-label { color:#6c7b70;letter-spacing:.12em;font-size:10px; }
        .combo-gallery-total .modal-price strong { color:#173c35;font-size:29px;letter-spacing:-.7px; }
        .combo-gallery-total .modal-price span { color:#9ba49a; }
        .combo-gallery-total .modal-saving { color:#a8792e; }
        .combo-gallery-count { background:#e4ece5;color:#254b3f;border:1px solid #d1dfd4;letter-spacing:.08em; }
        .combo-price-disclaimer { color:#78867c; }
        .combo-gallery-grid { gap:17px;margin-top:20px; }
        .combo-gallery-card { border:1px solid #e5e4da;border-radius:18px;background:#fffefa;box-shadow:0 7px 22px rgba(28,55,46,.055);animation:comboPremiumEnter .55s cubic-bezier(.2,.75,.25,1) both; }
        .combo-gallery-card:hover { transform:translateY(-5px);border-color:#c6a66a;box-shadow:0 18px 34px rgba(28,55,46,.13); }
        .combo-gallery-image { height:clamp(160px,21vw,235px);background:#e9e9df; }
        .combo-gallery-image img { transition:transform .65s cubic-bezier(.2,.7,.2,1),filter .45s; }
        .combo-gallery-card:hover .combo-gallery-image img { transform:scale(1.07);filter:saturate(1.06); }
        .combo-gallery-image span { top:12px;left:12px;padding:6px 8px;border:1px solid rgba(255,255,255,.3);border-radius:8px;background:rgba(22,59,50,.92);color:#f6e7c1;backdrop-filter:blur(8px); }
        .combo-gallery-card-copy { gap:7px;padding:15px 15px 17px; }
        .combo-gallery-card-copy strong { color:#193e35;font-size:14px;font-weight:750; }
        .combo-gallery-card-copy span { color:#89948a;font-size:11px; }
        .combo-gallery-card-copy b { color:#a8792e;font-size:13px; }
        .combo-gallery-footer { position:static;align-items:center;margin-top:24px;padding:18px 0 0;background:transparent;border-top:1px solid #e5e0d4; }
        .combo-gallery-footer > span:first-child { max-width:60%;color:#62776d;line-height:1.6; }
        .combo-gallery-footer > span:first-child strong { display:block;color:#21483d;font-size:13px;margin-bottom:2px; }
        .combo-footer-hint { color:#9a8b6b;font-size:10px;letter-spacing:.08em;text-transform:uppercase; }
        .combo-sticky-total { border:1px solid #e6d8bc;background:linear-gradient(115deg,#fffefa,#f8f0df);box-shadow:0 12px 28px rgba(30,60,48,.08); }
        .combo-redesign .combo-modal-button { border:1px solid #214b40;background:linear-gradient(135deg,#234f43,#12372f);color:#fffdf7;border-radius:12px;padding:13px 19px;box-shadow:0 8px 18px rgba(22,62,51,.18);transition:transform .25s,box-shadow .25s; }
        .combo-redesign .combo-modal-button:hover { transform:translateY(-2px);box-shadow:0 13px 24px rgba(22,62,51,.24); }
        .combo-line { border-color:#e6e4da;background:rgba(255,255,252,.9);border-radius:16px; }
        .combo-line:hover,.combo-line.is-expanded { border-color:#c7a96c;box-shadow:0 10px 25px rgba(24,59,49,.09); }
        .combo-line-image span { background:#1e493d;color:#f7e7bd; }
        .combo-line-copy strong { color:#1d4338; }
        .combo-line-copy b { color:#a8792e; }
        .combo-change-btn { border-color:#d6c49f;background:#fbf5e8;color:#23483d;border-radius:999px;padding:10px 15px; }
        .combo-change-btn:hover,.combo-change-btn.active { background:#214a3e;color:#fff9ec;border-color:#214a3e; }
        .combo-options-panel { border-top-color:#e9e3d5; }
        .combo-option-card { border-color:#e4e2d8;border-radius:14px;background:#fffefa; }
        .combo-option-card:hover { border-color:#c7a96c; }
        .combo-option-card.selected { border-color:#234b40;background:#f2f6ef; }
        .combo-option-name { color:#21473b; }
        .combo-option-card b { color:#a8792e; }
        .combo-redesign-footer { border-top-color:#e5e0d4; }
        .combo-back-btn { border-color:#d8ded5;color:#21473b;background:#fffefa;border-radius:999px; }
        .combo-back-btn:hover { background:#edf2eb; }
        @keyframes comboPremiumEnter { from { opacity:0;transform:translateY(16px) scale(.985); } to { opacity:1;transform:translateY(0) scale(1); } }
        @media(max-width:700px) { .combo-gallery-topline { align-items:flex-start;flex-direction:column;gap:12px;padding-right:28px; } .combo-top-customize { padding:11px 15px; } .combo-gallery-footer > span:first-child { max-width:100%; } .combo-footer-hint { display:none; } }
        @media(max-width:600px) { .combo-redesign { padding:19px 13px;border-radius:22px; } .combo-redesign-heading h3 { font-size:32px; } .combo-gallery-total .modal-price strong { font-size:25px; } }

        /* Seamless blue wave pattern + yellow accent palette for the combo modal */
        .combo-redesign.combo-customizer-modal {
          --combo-blue: #12366f;
          --combo-blue-deep: #0a214b;
          --combo-yellow: #ffd02f;
          background-color: #fffdf7;
          background-image:
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='42' viewBox='0 0 160 42'%3E%3Cpath d='M-20 10 C0 -2 20 -2 40 10 S80 22 100 10 S140 -2 160 10 S200 22 220 10' fill='none' stroke='%2300A9E8' stroke-width='1.7' stroke-opacity='.23'/%3E%3Cpath d='M-20 31 C0 19 20 19 40 31 S80 43 100 31 S140 19 160 31 S200 43 220 31' fill='none' stroke='%2312366F' stroke-width='1.1' stroke-opacity='.11'/%3E%3C/svg%3E"),
            radial-gradient(ellipse at 8% 4%, rgba(255,208,47,.12), transparent 30%),
            linear-gradient(145deg,#fffefa 0%,#f8fbff 58%,#fffdf4 100%);
          background-size: 160px 42px, 100% 100%, 100% 100%;
          background-repeat: repeat, no-repeat, no-repeat;
          background-position: 0 0, left top, center;
          background-attachment: local;
        }
        .combo-redesign .combo-gallery-actions {
          display:flex; justify-content:flex-start; align-items:center; margin:18px 0 20px;
        }
        .combo-redesign .combo-top-customize {
          min-height:58px; min-width:280px; padding:17px 27px; gap:14px;
          justify-content:center; border:1px solid #0c2d62; border-radius:15px;
          background:linear-gradient(115deg,#16458c 0%,#0c2d62 70%,#08224e 100%);
          color:#fff; font-size:15px; font-weight:800; letter-spacing:.01em;
          box-shadow:0 12px 28px rgba(13,49,104,.25), inset 0 1px 0 rgba(255,255,255,.2);
          position:relative; overflow:hidden;
        }
        .combo-redesign .combo-top-customize::before {
          content:""; position:absolute; inset:0; pointer-events:none; opacity:.22;
          background:repeating-linear-gradient(135deg,transparent 0 12px,rgba(255,255,255,.18) 12px 13px,transparent 13px 25px);
        }
        .combo-redesign .combo-top-customize > * { position:relative; }
        .combo-redesign .combo-top-customize:hover { transform:translateY(-3px); background:linear-gradient(115deg,#2058a8,#10356f); box-shadow:0 17px 32px rgba(13,49,104,.3); }
        .combo-redesign .combo-top-customize-icon { color:#ffd02f; font-size:20px; }
        .combo-redesign .combo-top-customize-arrow { font-size:20px; color:#ffd02f; }
        .combo-redesign .combo-gallery-total {
          position:relative; overflow:hidden; isolation:isolate;
          border:1px solid rgba(218,174,38,.55); border-radius:20px;
          background:linear-gradient(115deg,#fffdf5 0%,#fff8dc 56%,#fffdf6 100%);
          box-shadow:0 12px 30px rgba(31,65,108,.08);
        }
        .combo-redesign .combo-gallery-total::before {
          content:""; position:absolute; z-index:-1; inset:0; pointer-events:none;
          background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='100' viewBox='0 0 260 100'%3E%3Cpath d='M-20 22 C20 -2 55 46 95 22 S170 -2 210 22 S270 46 290 22' fill='none' stroke='%23f0c32b' stroke-width='2' stroke-opacity='.38'/%3E%3Cpath d='M-20 36 C20 12 55 60 95 36 S170 12 210 36 S270 60 290 36' fill='none' stroke='%23f0c32b' stroke-width='1.5' stroke-opacity='.26'/%3E%3Cpath d='M-20 50 C20 26 55 74 95 50 S170 26 210 50 S270 74 290 50' fill='none' stroke='%23f0c32b' stroke-width='1' stroke-opacity='.2'/%3E%3C/svg%3E");
          background-repeat:repeat; background-position:right center; opacity:.95;
        }
        .combo-redesign .combo-gallery-total .combo-total-label { color:#173b70; }
        .combo-redesign .combo-gallery-total .modal-price strong { color:#12366f; }
        .combo-redesign .combo-gallery-total .modal-saving { color:#a66e00; }
        .combo-redesign .combo-gallery-count { background:#e8f0fc; border-color:#cfddf2; color:#12366f; }
        .combo-redesign .combo-gallery-card { border-color:#dbe5f3; box-shadow:0 8px 20px rgba(16,50,100,.07); }
        .combo-redesign .combo-gallery-card:hover { border-color:#f0c32b; box-shadow:0 16px 30px rgba(16,50,100,.14); }
        .combo-redesign .combo-gallery-card-copy strong { color:#12366f; }
        .combo-redesign .combo-gallery-card-copy b { color:#a66e00; }
        .combo-redesign .combo-gallery-number { background:#12366f; color:#ffd02f; }
        .combo-redesign .combo-gallery-footer-whatsapp {
          display:flex; justify-content:flex-start; align-items:center;
          margin-top:26px; padding:22px 0 4px; border-top:1px solid rgba(18,54,111,.14);
          background:transparent;
        }
        .combo-redesign .combo-whatsapp-enquiry {
          display:inline-flex; align-items:center; justify-content:center; gap:13px;
          min-height:62px; padding:17px 30px; border:1px solid #0b2d62; border-radius:16px;
          background:linear-gradient(120deg,#16458c 0%,#0c2d62 72%,#081f48 100%);
          color:#fff; font-size:16px; font-weight:800; text-decoration:none;
          box-shadow:0 13px 28px rgba(13,49,104,.22),inset 0 1px 0 rgba(255,255,255,.2);
          transition:transform .24s ease,box-shadow .24s ease,filter .24s ease;
        }
        .combo-redesign .combo-whatsapp-enquiry:hover { transform:translateY(-3px);filter:brightness(1.08);box-shadow:0 18px 34px rgba(13,49,104,.3); }
        .combo-redesign .combo-whatsapp-mark { display:grid;place-items:center;width:29px;height:29px;border-radius:9px;background:#ffd02f;color:#12366f;font-size:19px; }
        .combo-redesign .combo-whatsapp-arrow { color:#ffd02f;font-size:21px;transition:transform .2s ease; }
        .combo-redesign .combo-whatsapp-enquiry:hover .combo-whatsapp-arrow { transform:translateX(4px); }
        @media(max-width:700px) {
          .combo-redesign .combo-gallery-actions { margin:16px 0 18px; }
          .combo-redesign .combo-top-customize { width:100%; min-width:0; min-height:56px; padding:16px 18px; }
          .combo-redesign .combo-whatsapp-enquiry { width:100%; min-height:60px; padding:16px 18px; }
        }
        .combo-line-actions { display:flex; flex-direction:column; align-items:stretch; gap:7px; flex:0 0 auto; }
        .combo-remove-item-btn { border:1px solid rgba(190,45,45,.25); border-radius:10px; padding:8px 12px; background:#fff5f4; color:#a52b2b; font-size:12px; font-weight:750; cursor:pointer; transition:background .2s,transform .2s; }
        .combo-remove-item-btn:hover { background:#ffe5e2; transform:translateY(-1px); }
        .combo-unavailable-note { display:flex; flex-direction:column; gap:6px; margin:0; padding:16px 18px; border:1px solid rgba(255,201,40,.6); border-radius:14px; background:linear-gradient(135deg,rgba(255,201,40,.13),rgba(16,45,99,.04)); color:#18345f; font-size:13px; line-height:1.5; }
        .combo-unavailable-note strong { font-size:14px; }
        .combo-unavailable-note span { color:#64748b; }
        @media(max-width:600px) { .combo-line-actions { flex-direction:row; } .combo-remove-item-btn { padding:8px 10px; } }

        /* Premium reference-inspired combo hero */
        .combo-package-card.combo-reference-hero{isolation:isolate;min-height:460px;margin:18px 0 30px;padding:0;display:grid;grid-template-columns:minmax(0,.92fr) minmax(0,1.08fr);align-items:stretch;gap:0;border-radius:14px;overflow:hidden;background:#fff8ec;border:1px solid rgba(255,190,44,.55);box-shadow:0 18px 42px rgba(24,43,73,.09);cursor:default}
        .combo-package-card.combo-reference-hero::before{content:"";position:absolute;inset:0;z-index:-1;pointer-events:none;background-image:radial-gradient(rgba(255,184,31,.14) .8px,transparent .8px),linear-gradient(120deg,rgba(255,255,255,.95),rgba(255,248,236,.72));background-size:17px 17px,100% 100%}
        .combo-package-card.combo-reference-hero::after{content:"";position:absolute;z-index:1;pointer-events:none;width:230px;height:230px;left:-160px;top:-150px;border:1px solid rgba(255,190,44,.42);border-radius:50%;box-shadow:0 0 0 24px rgba(255,190,44,.08),0 0 0 48px rgba(255,190,44,.06)}
        .combo-reference-copy{padding:30px 20px 28px 34px;display:flex;flex-direction:column;align-items:flex-start;justify-content:center;min-width:0}
        .combo-reference-hero .combo-badge{background:#ffb91f;color:#102d58;padding:8px 13px;font-size:10px;letter-spacing:.1em;box-shadow:0 4px 10px rgba(255,185,31,.18)}
        .combo-reference-hero .combo-content h3{margin:17px 0 8px;color:#102d58;font-size:clamp(30px,3.3vw,48px);line-height:1.02;letter-spacing:-.045em;font-weight:500}
        .combo-reference-hero .combo-content h3 strong{color:#ffb91f;font-weight:850}
        .combo-reference-hero .combo-description{margin:0;color:#65758c;font-size:14px;line-height:1.55;max-width:470px}
        .combo-benefits{display:flex;align-items:center;gap:17px;margin:23px 0 21px}.combo-benefit{display:flex;align-items:center;gap:9px;color:#18355f;font-size:12px;line-height:1.25}.combo-benefit span{display:grid;place-items:center;flex:0 0 43px;width:43px;height:43px;border-radius:50%;background:#ffedc4;color:#173663;font-size:25px;font-weight:800}.combo-benefit b{font-weight:650}.combo-benefits i{height:28px;width:1px;background:#e7dfd1}
        .combo-reference-hero .combo-price-row{display:flex;align-items:center;gap:13px;flex-wrap:wrap}.combo-reference-hero .combo-old-price{font-size:18px;color:#8793a1}.combo-reference-hero .combo-new-price{font-size:clamp(27px,3vw,36px);color:#102d58;letter-spacing:-.035em}.combo-saving-pill{padding:9px 13px;border-radius:9px;background:#ffbd27;color:#102d58;font-size:14px;font-weight:850;box-shadow:0 5px 12px rgba(255,185,31,.2)}
        .combo-hero-actions{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-top:23px}.combo-reference-hero .combo-button{min-height:58px;margin:0;padding:16px 22px;border-radius:999px;font-size:14px;gap:13px}.combo-reference-hero .combo-view-button{background:#ffb91f;color:#102d58;min-width:205px;justify-content:space-between;box-shadow:0 8px 18px rgba(255,185,31,.2)}.combo-reference-hero .combo-customize-button{background:transparent;color:#102d58;border:2px solid #18355f;min-width:230px;justify-content:space-between}.combo-reference-hero .combo-button:hover{transform:translateY(-3px);box-shadow:0 12px 22px rgba(16,45,88,.15)}.combo-cta-arrow{font-size:22px;line-height:1}
        .combo-reference-visual{align-self:stretch;position:relative;display:block;min-width:0;min-height:460px;margin:0;overflow:hidden;background:linear-gradient(135deg,#eac69c,#f8e5ca 55%,#d9b083)}.combo-reference-visual::before{content:"";position:absolute;inset:0;z-index:2;pointer-events:none;background:linear-gradient(90deg,rgba(255,248,236,.1),transparent 22%),linear-gradient(0deg,rgba(39,29,16,.14),transparent 30%)}.combo-hero-photo{position:absolute;overflow:hidden;border:4px solid rgba(255,255,255,.78);box-shadow:0 15px 32px rgba(43,35,24,.2);background:#ead9c2}.combo-hero-photo img{display:block;width:100%;height:100%;object-fit:cover;transition:transform .7s cubic-bezier(.2,.7,.2,1)}.combo-reference-hero:hover .combo-hero-photo img{transform:scale(1.045)}.combo-hero-photo-main{inset:0;border:0;border-radius:0}.combo-hero-photo-main img{object-fit:cover;filter:saturate(.9)}.combo-hero-photo-bed{width:35%;height:31%;left:4%;bottom:5%;border-radius:12px;transform:rotate(-4deg)}.combo-hero-photo-tv{width:31%;height:28%;right:5%;bottom:12%;border-radius:12px;transform:rotate(3deg)}.combo-hero-photo-fridge{width:23%;height:30%;right:7%;top:9%;border-radius:12px;transform:rotate(3deg)}
        .combo-hero-note{position:absolute;right:7%;top:5%;z-index:3;color:#102d58;font-family:Georgia,serif;font-style:italic;font-weight:700;font-size:clamp(17px,2vw,27px);line-height:1.08;text-align:center;transform:rotate(-7deg);text-shadow:0 1px 0 rgba(255,255,255,.6)}.combo-hero-note span{color:#ffb91f;font-size:24px}.combo-reference-hero .combo-number{position:absolute;z-index:4;left:51%;bottom:2%;width:130px;height:98px;border-radius:55% 45% 50% 48%;display:flex;justify-content:center;align-items:center;background:#ffbd27;color:#fff;transform:rotate(-10deg);box-shadow:0 12px 24px rgba(165,103,8,.22)}.combo-reference-hero .combo-number strong{font-size:39px;line-height:.9}.combo-reference-hero .combo-number span{font-size:16px}.combo-hero-sparkles{position:absolute;z-index:3;left:4%;top:7%;color:#ffbf28;font-size:22px;line-height:1.3;text-shadow:0 2px 7px rgba(255,255,255,.8)}
        @media(max-width:900px){.combo-package-card.combo-reference-hero{grid-template-columns:minmax(0,1fr) minmax(0,.9fr)}.combo-reference-copy{padding:24px 18px 24px 24px}.combo-reference-hero .combo-content h3{font-size:clamp(29px,4vw,38px)}.combo-benefits{gap:9px;margin:18px 0}.combo-benefit{gap:6px;font-size:10px}.combo-benefit span{width:35px;height:35px;flex-basis:35px;font-size:20px}.combo-benefits i{height:22px}.combo-reference-hero .combo-button{min-width:0;padding:13px 16px;min-height:50px;font-size:12px}.combo-reference-hero .combo-customize-button,.combo-reference-hero .combo-view-button{min-width:0}.combo-reference-visual{min-height:410px}}
        @media(max-width:640px){.combo-package-card.combo-reference-hero{display:flex;flex-direction:column;margin:18px 0 42px;border-radius:18px}.combo-reference-copy{padding:24px 20px 22px}.combo-reference-hero .combo-content h3{font-size:clamp(32px,9vw,42px)}.combo-reference-hero .combo-description{font-size:13px}.combo-benefits{width:100%;justify-content:space-between;gap:7px;margin:18px 0}.combo-benefit{gap:6px;font-size:10px}.combo-benefit span{width:32px;height:32px;flex-basis:32px;font-size:18px}.combo-reference-hero .combo-price-row{gap:9px}.combo-reference-hero .combo-new-price{font-size:29px}.combo-saving-pill{font-size:12px;padding:8px 10px}.combo-hero-actions{width:100%;display:grid;grid-template-columns:1fr;gap:10px;margin-top:20px}.combo-reference-hero .combo-button{width:100%;min-height:54px;font-size:14px;padding:14px 18px}.combo-reference-visual{width:100%;min-height:300px;height:300px}.combo-hero-photo-bed{width:34%;height:31%}.combo-hero-photo-tv{width:32%;height:28%}.combo-hero-photo-fridge{width:24%;height:30%}.combo-hero-note{font-size:19px}.combo-reference-hero .combo-number{width:105px;height:76px;left:43%}.combo-reference-hero .combo-number strong{font-size:32px}.combo-reference-hero .combo-number span{font-size:13px}}
        /* Complete home combo: layered blue/yellow patterns and patterned product cards */
        .combo-package-card.combo-blue-yellow-hero {
          --combo-navy:#092653; --combo-blue:#124b96; --combo-sky:#4c9de8; --combo-yellow:#ffd12e;
          position:relative; isolation:isolate; display:grid; grid-template-columns:minmax(0,1.03fr) minmax(0,.97fr);
          width:100%; min-height:440px; margin:20px 0 34px; padding:0; overflow:hidden; border:1px solid rgba(255,209,46,.7);
          border-radius:24px; background:linear-gradient(125deg,#f8fbff 0%,#edf5ff 52%,#fff7d8 100%);
          box-shadow:0 22px 52px rgba(9,38,83,.14); cursor:default;
        }
        .combo-blueprint-pattern { position:absolute; inset:0; z-index:-1; pointer-events:none; opacity:.65;
          background-image:radial-gradient(circle at 1px 1px,rgba(18,75,150,.13) 1.2px,transparent 1.4px),linear-gradient(115deg,transparent 0 58%,rgba(255,209,46,.15) 58% 59%,transparent 59%);
          background-size:18px 18px,100% 100%; }
        .combo-blue-yellow-copy { position:relative; z-index:2; display:flex; flex-direction:column; align-items:flex-start; justify-content:center; min-width:0; padding:38px 22px 34px 42px; }
        .combo-blue-yellow-kicker { display:inline-flex; align-items:center; gap:9px; padding:9px 13px; border:1px solid rgba(18,75,150,.16); border-radius:999px; background:repeating-linear-gradient(135deg,#fff 0 7px,#eaf3ff 7px 14px); color:#12427f; font-size:10px; font-weight:900; letter-spacing:.12em; }
        .combo-kicker-dot { width:8px; height:8px; border-radius:50%; background:#ffc928; box-shadow:0 0 0 4px rgba(255,201,40,.2); }
        .combo-blue-yellow-copy h3 { margin:22px 0 13px; color:#092653; font-size:clamp(42px,5vw,68px); line-height:.94; letter-spacing:-.065em; font-weight:900; }
        .combo-blue-yellow-copy h3 em { color:#1455a0; font-style:normal; text-shadow:3px 3px 0 rgba(255,209,46,.7); }
        .combo-blue-yellow-description { max-width:400px; margin:0; color:#536985; font-size:15px; line-height:1.65; }
        .combo-blue-yellow-benefits { display:flex; align-items:center; gap:17px; margin:23px 0 20px; color:#183d6d; font-size:12px; }
        .combo-blue-yellow-benefits span { display:flex; align-items:center; gap:6px; } .combo-blue-yellow-benefits b { color:#0b2e62; font-size:17px; }
        .combo-blue-yellow-benefits i { width:1px; height:24px; background:#c6d6e9; }
        .combo-blue-yellow-price-row { display:flex; flex-direction:column; gap:3px; }
        .combo-blue-yellow-price-label { color:#61758e; font-size:11px; font-weight:700; text-transform:uppercase; letter-spacing:.1em; }
        .combo-blue-yellow-price-row strong { color:#0b2e62; font-size:clamp(30px,3.3vw,42px); line-height:1.1; letter-spacing:-.04em; }
        .combo-blue-yellow-actions { display:flex; flex-wrap:wrap; gap:10px; margin-top:22px; }
        .combo-blue-yellow-button { display:inline-flex; align-items:center; justify-content:space-between; gap:16px; min-height:51px; padding:14px 17px; border-radius:12px; font-family:inherit; font-size:12px; font-weight:800; line-height:1.2; cursor:pointer; transition:transform .2s ease,box-shadow .2s ease,background .2s ease; }
        .combo-blue-yellow-button:hover { transform:translateY(-3px); box-shadow:0 10px 20px rgba(9,38,83,.16); }
        .combo-blue-yellow-primary { border:1px solid #ffd12e; color:#092653; background:repeating-linear-gradient(135deg,#ffd12e 0 10px,#ffdf67 10px 20px); }
        .combo-blue-yellow-secondary { border:1px solid #174c8d; color:#fff; background:repeating-linear-gradient(135deg,#124b96 0 11px,#1a5ca9 11px 22px); }
        .combo-blue-yellow-button span { font-size:18px; }
        .combo-blue-yellow-note { max-width:390px; margin-top:15px; color:#71829a; font-size:10px; line-height:1.5; }
        .combo-blue-yellow-art { position:relative; isolation:isolate; min-height:440px; overflow:hidden; background:repeating-linear-gradient(135deg,#0b2b5c 0 16px,#0d326b 16px 32px); }
        .combo-blue-yellow-art::before { content:""; position:absolute; z-index:-1; inset:0; background:radial-gradient(circle at 50% 50%,rgba(54,135,220,.4),transparent 58%),linear-gradient(145deg,rgba(255,209,46,.08),transparent 48%); }
        .combo-art-grid { position:absolute; inset:0; opacity:.22; background-image:linear-gradient(rgba(255,255,255,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.2) 1px,transparent 1px); background-size:28px 28px; mask-image:linear-gradient(135deg,#000,transparent 85%); }
        .combo-art-orbit { position:absolute; border:1px solid rgba(255,209,46,.45); border-radius:50%; pointer-events:none; }
        .combo-art-orbit-one { width:380px; height:380px; top:35px; left:50%; transform:translateX(-50%); box-shadow:0 0 0 25px rgba(255,209,46,.035),0 0 0 52px rgba(255,209,46,.03); }
        .combo-art-orbit-two { width:250px; height:250px; top:100px; left:50%; transform:translateX(-50%); border-style:dashed; }
        .combo-art-tile { position:absolute; z-index:2; display:flex; flex-direction:column; justify-content:center; gap:5px; width:39%; min-height:115px; padding:15px; overflow:hidden; border:1px solid rgba(255,255,255,.68); border-radius:17px; color:#092653; box-shadow:0 16px 28px rgba(0,0,0,.22); }
        .combo-art-tile::before { content:""; position:absolute; inset:0; z-index:-1; opacity:.85; background-image:radial-gradient(circle at 1px 1px,rgba(9,38,83,.15) 1px,transparent 1.4px),linear-gradient(135deg,rgba(255,255,255,.9),rgba(255,255,255,.15)); background-size:12px 12px,100% 100%; }
        .combo-art-icon { display:grid; place-items:center; width:38px; height:35px; margin-bottom:3px; border-radius:10px; background:repeating-linear-gradient(135deg,#ffd12e 0 6px,#ffe681 6px 12px); color:#092653; font-size:25px; font-weight:900; }
        .combo-art-tile b { font-size:14px; line-height:1.1; } .combo-art-tile small { color:#526a87; font-size:10px; }
        .combo-art-tile-bed { left:7%; top:17%; transform:rotate(-7deg); background:#dcecff; }
        .combo-art-tile-tv { right:7%; top:26%; transform:rotate(6deg); background:#fff0a9; }
        .combo-art-tile-fridge { left:8%; bottom:15%; transform:rotate(5deg); background:#fff9e8; }
        .combo-art-tile-sofa { right:7%; bottom:13%; transform:rotate(-5deg); background:#b8dcff; }
        .combo-art-stamp { position:absolute; z-index:4; top:7%; right:8%; display:flex; align-items:center; gap:7px; padding:9px 12px; border:2px solid #092653; border-radius:8px; background:repeating-linear-gradient(135deg,#ffd12e 0 7px,#ffe16a 7px 14px); color:#092653; transform:rotate(5deg); box-shadow:4px 5px 0 rgba(0,0,0,.15); }
        .combo-art-stamp strong { font-size:29px; line-height:1; } .combo-art-stamp span { font-size:8px; font-weight:950; line-height:1.1; letter-spacing:.06em; }
        .combo-art-yellow-disc { position:absolute; z-index:3; left:50%; top:50%; display:grid; place-content:center; width:94px; height:94px; border:5px solid #0b2b5c; border-radius:50%; background:repeating-linear-gradient(135deg,#ffd12e 0 8px,#ffe16a 8px 16px); color:#092653; text-align:center; font-size:9px; font-weight:950; line-height:1.2; transform:translate(-50%,-50%) rotate(-9deg); box-shadow:0 8px 0 rgba(0,0,0,.12); }
        @media(max-width:850px) { .combo-package-card.combo-blue-yellow-hero { grid-template-columns:minmax(0,1fr) minmax(0,.85fr); } .combo-blue-yellow-copy { padding:30px 18px 28px 25px; } .combo-blue-yellow-copy h3 { font-size:clamp(38px,5vw,52px); } .combo-blue-yellow-art { min-height:420px; } .combo-art-tile { width:43%; min-height:100px; padding:11px; } .combo-art-tile b { font-size:12px; } .combo-art-tile small { font-size:9px; } .combo-art-stamp { right:5%; } }
        @media(max-width:640px) { .combo-package-card.combo-blue-yellow-hero { display:flex; flex-direction:column; margin:16px 0 28px; border-radius:20px; } .combo-blue-yellow-copy { padding:27px 22px 25px; } .combo-blue-yellow-kicker { font-size:9px; letter-spacing:.08em; } .combo-blue-yellow-copy h3 { margin-top:19px; font-size:clamp(43px,12vw,58px); } .combo-blue-yellow-description { font-size:13px; } .combo-blue-yellow-benefits { margin:18px 0; } .combo-blue-yellow-actions { display:grid; grid-template-columns:1fr; width:100%; } .combo-blue-yellow-button { width:100%; min-height:52px; font-size:13px; } .combo-blue-yellow-art { min-height:360px; height:360px; } .combo-art-orbit-one { width:310px; height:310px; top:28px; } .combo-art-orbit-two { width:210px; height:210px; top:78px; } .combo-art-tile { width:39%; min-height:100px; padding:10px; } .combo-art-tile-bed { left:5%; top:17%; } .combo-art-tile-tv { right:5%; top:25%; } .combo-art-tile-fridge { left:5%; bottom:12%; } .combo-art-tile-sofa { right:5%; bottom:11%; } .combo-art-stamp { top:5%; right:5%; } .combo-art-yellow-disc { width:78px; height:78px; font-size:8px; } }




        /* Smooth scroll behavior; leaves combo artwork and thumbnails unchanged. */
        html {
          scroll-behavior: smooth;
        }

        /* =====================================================
           COMBO SECTION + VIEW PRODUCTS — BLUE/YELLOW REDESIGN
           Remove decorative background patterns from the homepage
           combo banner; keep the item cards patterned but readable.
        ===================================================== */
        .combo-package-card.combo-blue-yellow-hero {
          background: #f7faff !important;
          border: 1px solid rgba(18, 54, 111, .16) !important;
          box-shadow: 0 18px 42px rgba(18, 54, 111, .10) !important;
        }
        .combo-package-card.combo-blue-yellow-hero::before,
        .combo-package-card.combo-blue-yellow-hero::after,
        .combo-package-card.combo-blue-yellow-hero .combo-blueprint-pattern,
        .combo-package-card.combo-blue-yellow-hero .combo-art-grid,
        .combo-package-card.combo-blue-yellow-hero .combo-art-orbit {
          display: none !important;
          background-image: none !important;
          box-shadow: none !important;
        }
        .combo-package-card.combo-blue-yellow-hero .combo-blue-yellow-art {
          background: #12366f !important;
        }
        .combo-package-card.combo-blue-yellow-hero .combo-blue-yellow-art::before {
          background: linear-gradient(135deg, rgba(255, 209, 46, .12), transparent 60%) !important;
        }
        .combo-package-card.combo-blue-yellow-hero .combo-art-tile::before {
          background-image: linear-gradient(135deg, rgba(255,255,255,.8), rgba(255,255,255,.18)) !important;
          background-size: 100% 100% !important;
        }
        .combo-package-card.combo-blue-yellow-hero .combo-art-icon,
        .combo-package-card.combo-blue-yellow-hero .combo-art-stamp,
        .combo-package-card.combo-blue-yellow-hero .combo-art-yellow-disc {
          background: #ffd12e !important;
        }
        .combo-package-card.combo-blue-yellow-hero .combo-blue-yellow-primary {
          background: #ffd12e !important;
          border-color: #e8b900 !important;
        }
        .combo-package-card.combo-blue-yellow-hero .combo-blue-yellow-secondary {
          background: #12366f !important;
          border-color: #12366f !important;
        }


        /* Mobile combo card: simpler hierarchy, one premium action.
           The combo artwork/thumbnail is intentionally untouched. */
        @media (max-width: 640px) {
          .combo-package-card.combo-blue-yellow-hero {
            display: block !important;
            min-height: 0 !important;
            height: auto !important;
            margin-bottom: 18px !important;
            padding: 0 !important;
            border-radius: 18px !important;
            overflow: hidden;
            background: linear-gradient(145deg, #ffffff 0%, #f3f7ff 72%, #fff8d8 100%) !important;
          }
          /* On mobile keep the compact text thumbnail; prevent an empty art column
             from creating a large blank block below the button. Desktop art is unchanged. */
          .combo-package-card.combo-blue-yellow-hero .combo-blue-yellow-art {
            display: none !important;
          }
          .combo-package-card.combo-blue-yellow-hero .combo-blue-yellow-copy {
            display: flex !important;
            min-height: 0 !important;
            height: auto !important;
            padding: 24px 20px 22px !important;
            background: transparent !important;
          }
          .combo-package-card.combo-blue-yellow-hero .combo-blue-yellow-kicker {
            background: repeating-linear-gradient(135deg, #fff1a8 0 7px, #ffdf67 7px 14px) !important;
            border: 1px solid #f0c22d !important;
            color: #12366f !important;
          }
          .combo-package-card.combo-blue-yellow-hero .combo-blue-yellow-copy h3 em {
            color: #12366f !important;
            text-decoration: underline;
            text-decoration-color: #ffd12e;
            text-decoration-thickness: 5px;
            text-underline-offset: -2px;
          }
          .combo-package-card.combo-blue-yellow-hero .combo-blue-yellow-price-row {
            padding: 12px 14px;
            border-left: 4px solid #ffd12e;
            border-radius: 0 10px 10px 0;
            background: #edf4ff;
          }
          .combo-package-card.combo-blue-yellow-hero .combo-blue-yellow-actions {
            display: block !important;
            margin-top: 20px !important;
          }
          .combo-package-card.combo-blue-yellow-hero .combo-blue-yellow-primary {
            width: 100% !important;
            min-height: 54px !important;
            border-radius: 14px !important;
            display: flex !important;
            align-items: center;
            justify-content: center;
            gap: 14px;
            background: linear-gradient(135deg, #ffd12e 0%, #ffb914 100%) !important;
            border: 1px solid rgba(18, 54, 111, .12) !important;
            box-shadow: 0 8px 18px rgba(18, 54, 111, .14) !important;
            color: #12366f !important;
            font-weight: 800 !important;
            letter-spacing: .01em;
          }
          .combo-package-card.combo-blue-yellow-hero .combo-blue-yellow-secondary {
            display: none !important;
          }
        }

        /* View Products modal: clean blue frame, yellow highlights, patterned cards */
        .combo-redesign.combo-customizer-modal {
          background: linear-gradient(180deg, #ffffff 0%, #f4f8ff 100%) !important;
          border: 1px solid #d5e2f7 !important;
          color: #102f63 !important;
          box-shadow: 0 30px 90px rgba(5, 27, 65, .34) !important;
        }
        .combo-redesign .modal-close {
          color: #12366f !important;
          border-color: #d5e2f7 !important;
          background: #fff !important;
        }
        .combo-redesign .modal-close:hover { background: #fff1a8 !important; }
        .combo-redesign .combo-gallery-heading .section-badge {
          display: inline-flex;
          padding: 7px 10px;
          border: 1px solid #f0d15b;
          border-radius: 999px;
          background: #fff7ce;
          color: #12366f !important;
          letter-spacing: .12em;
        }
        .combo-redesign .combo-redesign-heading h3,
        .combo-redesign .combo-gallery-heading h3 {
          color: #12366f !important;
          font-family: inherit !important;
          font-weight: 850 !important;
        }
        .combo-redesign .combo-redesign-heading h3 span,
        .combo-redesign .combo-gallery-heading h3 span { color: #d99b00 !important; }
        .combo-redesign .combo-redesign-heading p { color: #5f7190 !important; }
        .combo-redesign .combo-gallery-total,
        .combo-redesign .combo-sticky-total {
          border-color: #e5d276 !important;
          background-color: #fff9db !important;
          background-image: radial-gradient(rgba(18,54,111,.10) .8px, transparent .8px), linear-gradient(110deg, #fffdf2, #fff6c9) !important;
          background-size: 12px 12px, 100% 100% !important;
        }
        .combo-redesign .combo-gallery-count {
          border: 1px solid #cbdaf3 !important;
          background: #eaf1ff !important;
          color: #12366f !important;
        }
        .combo-redesign .combo-gallery-grid { gap: 15px !important; }
        .combo-redesign .combo-gallery-card {
          position: relative;
          isolation: isolate;
          border: 1px solid #d6e2f5 !important;
          border-radius: 17px !important;
          background-color: #f8fbff !important;
          background-image: radial-gradient(rgba(18,54,111,.10) .8px, transparent .8px), linear-gradient(145deg, #ffffff 0%, #eef4ff 100%) !important;
          background-size: 13px 13px, 100% 100% !important;
          box-shadow: 0 8px 22px rgba(18,54,111,.08) !important;
        }
        .combo-redesign .combo-gallery-card:hover {
          border-color: #efc62c !important;
          box-shadow: 0 15px 30px rgba(18,54,111,.15) !important;
        }
        .combo-redesign .combo-gallery-image {
          background: linear-gradient(135deg, #e7efff, #fff4bf) !important;
          border-bottom: 1px solid rgba(18,54,111,.10);
        }
        .combo-redesign .combo-gallery-image span,
        .combo-redesign .combo-gallery-number {
          background: #12366f !important;
          color: #ffd12e !important;
          border: 1px solid rgba(255,209,46,.55) !important;
        }
        .combo-redesign .combo-gallery-card-copy {
          background-image: repeating-linear-gradient(135deg, rgba(18,54,111,.035) 0 1px, transparent 1px 9px) !important;
        }
        .combo-redesign .combo-gallery-card-copy strong { color: #12366f !important; }
        .combo-redesign .combo-gallery-card-copy span { color: #647794 !important; }
        .combo-redesign .combo-gallery-card-copy b { color: #a87300 !important; }
        .combo-redesign .combo-gallery-footer {
          border-top-color: #d8e3f5 !important;
          background: linear-gradient(180deg, rgba(255,255,255,.96), #f4f8ff) !important;
        }
        .combo-redesign .combo-gallery-footer > span { color: #60728e !important; }
        .combo-redesign .combo-back-btn {
          border-color: #cbdaf3 !important;
          background: #edf3ff !important;
          color: #12366f !important;
        }
        .combo-redesign .combo-back-btn:hover { background: #fff2ad !important; }
        .combo-redesign .combo-modal-button,
        .combo-redesign .combo-top-customize,
        .combo-redesign .combo-whatsapp-enquiry {
          background: #12366f !important;
          border-color: #12366f !important;
          color: #fff !important;
          box-shadow: 0 10px 24px rgba(18,54,111,.20) !important;
        }
        .combo-redesign .combo-modal-button:hover,
        .combo-redesign .combo-top-customize:hover,
        .combo-redesign .combo-whatsapp-enquiry:hover { background: #0b2855 !important; }
        .combo-redesign .combo-top-customize-icon,
        .combo-redesign .combo-top-customize-arrow,
        .combo-redesign .combo-whatsapp-arrow { color: #ffd12e !important; }
        .combo-redesign .combo-whatsapp-mark { background: #ffd12e !important; color: #12366f !important; }
        .combo-redesign .combo-line {
          border-color: #d7e3f5 !important;
          background-image: radial-gradient(rgba(18,54,111,.07) .7px, transparent .7px), linear-gradient(135deg, #fff 0%, #f1f6ff 100%) !important;
          background-size: 12px 12px, 100% 100% !important;
        }
        .combo-redesign .combo-line:hover,
        .combo-redesign .combo-line.is-expanded { border-color: #efc62c !important; }
        .combo-redesign .combo-line-copy strong { color: #12366f !important; }
        .combo-redesign .combo-line-copy b { color: #a87300 !important; }
        .combo-redesign .combo-change-btn { border-color: #e3b91d !important; background: #fff6c7 !important; color: #12366f !important; }
        .combo-redesign .combo-change-btn:hover,
        .combo-redesign .combo-change-btn.active { background: #ffd12e !important; color: #12366f !important; }
        .combo-redesign .combo-option-card {
          background-image: radial-gradient(rgba(18,54,111,.08) .7px, transparent .7px), linear-gradient(145deg, #fff, #f2f6ff) !important;
          background-size: 12px 12px, 100% 100% !important;
          border-color: #d6e2f5 !important;
        }
        .combo-redesign .combo-option-card.selected { border-color: #e5b800 !important; background-color: #fff8d7 !important; }
        @media(max-width:700px) {
          .combo-redesign .combo-gallery-grid { gap: 10px !important; }
          .combo-redesign .combo-gallery-card { border-radius: 14px !important; }
          .combo-redesign .combo-gallery-card-copy strong { white-space: normal !important; line-height: 1.25; }
        }

        /* Premium light redesign for the View Products modal */
        .combo-redesign.combo-customizer-modal {
          --lux-ink: #24251f;
          --lux-muted: #77786f;
          --lux-line: #e9e6de;
          --lux-gold: #b18a4a;
          background: #fbfaf7 !important;
          background-image: none !important;
          color: var(--lux-ink) !important;
          font-family: Inter, "Helvetica Neue", Arial, sans-serif !important;
          border: 1px solid rgba(255,255,255,.8) !important;
          border-radius: 24px !important;
          box-shadow: 0 28px 90px rgba(15,18,20,.22) !important;
          scrollbar-color: #c8c2b6 transparent;
        }
        .combo-redesign .combo-gallery-heading {
          position: relative;
          padding: 7px 175px 0 0 !important;
          margin-bottom: 18px !important;
        }
        .combo-redesign .combo-gallery-heading h3 {
          margin: 0 0 7px !important;
          color: var(--lux-ink) !important;
          font-size: clamp(27px, 3vw, 42px) !important;
          line-height: 1.08 !important;
          letter-spacing: -.055em !important;
          font-weight: 680 !important;
        }
        .combo-redesign .combo-gallery-heading h3 span {
          color: var(--lux-gold) !important;
          font-weight: 680 !important;
        }
        .combo-redesign .combo-gallery-heading p {
          margin: 0 !important;
          color: var(--lux-muted) !important;
          font-size: 13px !important;
          line-height: 1.5 !important;
          font-weight: 400 !important;
        }
        .combo-redesign .combo-gallery-actions {
          position: absolute !important;
          top: 8px !important;
          right: 0 !important;
          margin: 0 !important;
          display: flex !important;
          align-items: flex-start !important;
        }
        .combo-redesign .combo-top-customize {
          min-width: 0 !important;
          min-height: 42px !important;
          padding: 0 17px !important;
          gap: 9px !important;
          border: 1px solid #262720 !important;
          border-radius: 999px !important;
          background: #262720 !important;
          color: #fff !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          letter-spacing: .01em !important;
          box-shadow: none !important;
          transition: transform .2s ease, background .2s ease !important;
        }
        .combo-redesign .combo-top-customize::before { display: none !important; }
        .combo-redesign .combo-top-customize:hover {
          transform: translateY(-1px) !important;
          background: #45463d !important;
          box-shadow: none !important;
        }
        .combo-redesign .combo-top-customize-icon,
        .combo-redesign .combo-top-customize-arrow { color: #e2c28d !important; }
        .combo-redesign .combo-gallery-total {
          margin: 0 0 8px !important;
          padding: 15px 18px !important;
          min-height: 82px !important;
          border: 1px solid #e9e0ce !important;
          border-radius: 16px !important;
          background: #f4f0e7 !important;
          box-shadow: none !important;
        }
        .combo-redesign .combo-total-label {
          color: #777064 !important;
          font-size: 9px !important;
          letter-spacing: .14em !important;
          font-weight: 700 !important;
        }
        .combo-redesign .combo-gallery-total .modal-price {
          display: flex !important;
          align-items: baseline !important;
          gap: 12px !important;
          margin-top: 3px !important;
        }
        .combo-redesign .combo-gallery-total .modal-price span {
          color: #a19b8e !important;
          font-size: 13px !important;
          font-weight: 450 !important;
        }
        .combo-redesign .combo-gallery-total .modal-price strong {
          color: #292a23 !important;
          font-size: 28px !important;
          line-height: 1.1 !important;
          letter-spacing: -.045em !important;
          font-weight: 700 !important;
        }
        .combo-redesign .combo-gallery-total .modal-saving {
          margin: 4px 0 0 !important;
          color: #7d744f !important;
          font-size: 10px !important;
          font-weight: 600 !important;
        }
        .combo-redesign .combo-gallery-count {
          padding: 8px 11px !important;
          border: 1px solid #dfd5c1 !important;
          border-radius: 999px !important;
          background: #fbfaf7 !important;
          color: #605b4f !important;
          font-size: 9px !important;
          letter-spacing: .09em !important;
          font-weight: 700 !important;
        }
        .combo-redesign .combo-price-disclaimer {
          margin: 7px 2px 13px !important;
          color: #858278 !important;
          font-size: 10px !important;
          line-height: 1.4 !important;
        }
        .combo-redesign .combo-gallery-grid {
          grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
          gap: 12px !important;
          margin-top: 0 !important;
        }
        .combo-redesign .combo-gallery-card {
          border: 1px solid var(--lux-line) !important;
          border-radius: 14px !important;
          background: #fff !important;
          box-shadow: 0 3px 12px rgba(35,33,25,.025) !important;
          transition: border-color .2s ease, transform .2s ease !important;
        }
        .combo-redesign .combo-gallery-card:hover {
          transform: translateY(-2px) !important;
          border-color: #c8b58f !important;
          box-shadow: 0 8px 20px rgba(35,33,25,.07) !important;
        }
        .combo-redesign .combo-gallery-image {
          height: clamp(135px, 17vw, 195px) !important;
          background: #f0eee9 !important;
        }
        .combo-redesign .combo-gallery-image img { object-fit: cover !important; }
        .combo-redesign .combo-gallery-image span {
          top: 9px !important;
          left: 9px !important;
          padding: 5px 7px !important;
          border-radius: 5px !important;
          background: rgba(37,38,32,.88) !important;
          color: #fff !important;
          font-size: 9px !important;
          font-weight: 600 !important;
          box-shadow: none !important;
        }
        .combo-redesign .combo-gallery-card-copy {
          gap: 4px !important;
          padding: 11px 12px 13px !important;
        }
        .combo-redesign .combo-gallery-card-copy strong {
          color: #2b2b25 !important;
          font-size: 13px !important;
          font-weight: 650 !important;
          letter-spacing: -.015em !important;
        }
        .combo-redesign .combo-gallery-card-copy > span {
          color: #969287 !important;
          font-size: 10px !important;
        }
        .combo-redesign .combo-gallery-card-copy b {
          margin-top: 3px !important;
          color: #9b783e !important;
          font-size: 11px !important;
          font-weight: 650 !important;
        }
        .combo-redesign .modal-close {
          z-index: 20 !important;
          width: 38px !important;
          height: 38px !important;
          border: 1px solid #e8e4dc !important;
          border-radius: 50% !important;
          background: rgba(255,255,255,.94) !important;
          color: #36372f !important;
          box-shadow: 0 3px 12px rgba(0,0,0,.04) !important;
        }
        .combo-redesign .combo-gallery-footer-whatsapp { margin-top: 18px !important; }
        .combo-redesign .combo-whatsapp-enquiry {
          min-height: 47px !important;
          border-radius: 999px !important;
          background: #262720 !important;
          border-color: #262720 !important;
          color: #fff !important;
          box-shadow: none !important;
          font-size: 12px !important;
        }
        .combo-redesign .combo-whatsapp-mark {
          background: #e2c28d !important;
          color: #262720 !important;
        }
        @media (max-width: 700px) {
          .combo-redesign.combo-customizer-modal {
            width: calc(100vw - 20px) !important;
            max-width: none !important;
            max-height: calc(100dvh - 20px) !important;
            padding: 22px 13px 16px !important;
            border-radius: 20px !important;
          }
          .combo-redesign .combo-gallery-heading {
            padding: 5px 0 0 !important;
            margin-bottom: 14px !important;
          }
          .combo-redesign .combo-gallery-heading h3 {
            max-width: calc(100% - 5px) !important;
            padding-right: 30px !important;
            font-size: clamp(25px, 7vw, 32px) !important;
          }
          .combo-redesign .combo-gallery-heading p {
            max-width: 85% !important;
            font-size: 11px !important;
          }
          .combo-redesign .combo-gallery-actions {
            position: static !important;
            margin-top: 13px !important;
          }
          .combo-redesign .combo-top-customize {
            min-height: 38px !important;
            padding: 0 15px !important;
          }
          .combo-redesign .combo-gallery-total {
            min-height: 0 !important;
            margin-top: 0 !important;
            padding: 12px !important;
            gap: 8px !important;
            border-radius: 13px !important;
          }
          .combo-redesign .combo-gallery-total .modal-price strong { font-size: 24px !important; }
          .combo-redesign .combo-gallery-count {
            padding: 7px 8px !important;
            font-size: 8px !important;
            white-space: nowrap !important;
          }
          .combo-redesign .combo-price-disclaimer {
            margin: 7px 1px 11px !important;
            font-size: 9px !important;
          }
          .combo-redesign .combo-gallery-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 9px !important;
          }
          .combo-redesign .combo-gallery-image { height: clamp(115px, 36vw, 165px) !important; }
          .combo-redesign .combo-gallery-card-copy { padding: 10px !important; }
          .combo-redesign .combo-gallery-card-copy strong { font-size: 12px !important; }
          .combo-redesign .combo-gallery-card-copy > span { font-size: 9px !important; }
          .combo-redesign .combo-gallery-card-copy b { font-size: 10px !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          .combo-redesign .combo-gallery-view,
          .combo-redesign .combo-gallery-card { animation: none !important; transition: none !important; }
        }

        /* Premium ivory + champagne styling for the Customize view */
        .combo-redesign .combo-redesign-heading:not(.combo-gallery-heading) {
          padding: 2px 42px 15px 2px !important;
          margin: 0 0 16px !important;
          border-bottom: 1px solid #eee8dd !important;
        }
        .combo-redesign .combo-redesign-heading:not(.combo-gallery-heading) h3 {
          margin: 0 0 7px !important;
          color: #252821 !important;
          font-family: Inter, "Segoe UI", Arial, sans-serif !important;
          font-size: clamp(25px, 3.1vw, 36px) !important;
          line-height: 1.08 !important;
          font-weight: 750 !important;
          letter-spacing: -.055em !important;
        }
        .combo-redesign .combo-redesign-heading:not(.combo-gallery-heading) h3 span {
          color: #ad8545 !important;
        }
        .combo-redesign .combo-redesign-heading:not(.combo-gallery-heading) p {
          margin: 0 !important;
          color: #77766f !important;
          font-size: 12px !important;
          line-height: 1.55 !important;
        }
        .combo-redesign .combo-total-panel:not(.combo-gallery-total) {
          margin: 0 0 10px !important;
          padding: 15px 17px !important;
          border: 1px solid #e9dfc9 !important;
          border-radius: 16px !important;
          background: linear-gradient(135deg, #fbf8f0 0%, #f5efe1 100%) !important;
          box-shadow: none !important;
        }
        .combo-redesign .combo-total-label {
          color: #82765e !important;
          font-size: 9px !important;
          letter-spacing: .15em !important;
          font-weight: 800 !important;
        }
        .combo-redesign .modal-price { gap: 9px !important; align-items: baseline !important; }
        .combo-redesign .modal-price > span {
          color: #aaa397 !important;
          font-size: 13px !important;
          text-decoration-thickness: 1px !important;
        }
        .combo-redesign .modal-price strong {
          color: #252821 !important;
          font-size: clamp(24px, 3vw, 30px) !important;
          letter-spacing: -.045em !important;
          font-weight: 800 !important;
        }
        .combo-redesign .modal-saving {
          margin: 5px 0 0 !important;
          color: #98713a !important;
          font-size: 11px !important;
          font-weight: 750 !important;
        }
        .combo-redesign .combo-price-change {
          display: inline-flex !important;
          margin-top: 9px !important;
          padding: 6px 10px !important;
          border: 1px solid #e8dfce !important;
          border-radius: 999px !important;
          background: rgba(255,255,255,.72) !important;
          color: #6f6a5e !important;
          font-size: 10px !important;
          font-weight: 650 !important;
        }
        .combo-redesign .combo-price-disclaimer {
          margin: 8px 2px 14px !important;
          color: #858078 !important;
          font-size: 10px !important;
          line-height: 1.5 !important;
        }
        .combo-redesign .combo-redesign-list {
          display: grid !important;
          gap: 9px !important;
        }
        .combo-redesign .combo-line {
          border: 1px solid #e9e4da !important;
          border-radius: 16px !important;
          background: #fffefa !important;
          box-shadow: 0 2px 9px rgba(42, 37, 27, .025) !important;
          transition: border-color .2s ease, box-shadow .2s ease !important;
        }
        .combo-redesign .combo-line:hover,
        .combo-redesign .combo-line.is-expanded {
          border-color: #c7ad7c !important;
          box-shadow: 0 6px 18px rgba(64, 51, 28, .07) !important;
        }
        .combo-redesign .combo-line-main {
          gap: 12px !important;
          padding: 10px !important;
        }
        .combo-redesign .combo-line-image {
          width: 68px !important;
          height: 66px !important;
          flex-basis: 68px !important;
          border-radius: 12px !important;
          background: #f1eee7 !important;
        }
        .combo-redesign .combo-line-image span {
          top: 5px !important;
          left: 5px !important;
          padding: 4px 5px !important;
          border: 1px solid rgba(255,255,255,.65) !important;
          border-radius: 6px !important;
          background: #30362e !important;
          color: #f5dfad !important;
          font-size: 9px !important;
        }
        .combo-redesign .combo-line-copy { gap: 3px !important; }
        .combo-redesign .combo-line-copy strong {
          color: #292c26 !important;
          font-size: 13px !important;
          font-weight: 750 !important;
          letter-spacing: -.015em !important;
        }
        .combo-redesign .combo-line-copy span {
          color: #8b877f !important;
          font-size: 10px !important;
        }
        .combo-redesign .combo-line-copy b {
          color: #9b753b !important;
          font-size: 11px !important;
          font-weight: 750 !important;
        }
        .combo-redesign .combo-line-actions { gap: 6px !important; }
        .combo-redesign .combo-change-btn {
          min-height: 36px !important;
          padding: 8px 12px !important;
          border: 1px solid #c4a56b !important;
          border-radius: 999px !important;
          background: #f5eddd !important;
          color: #55452c !important;
          font-size: 10px !important;
          font-weight: 750 !important;
          box-shadow: none !important;
        }
        .combo-redesign .combo-change-btn:hover,
        .combo-redesign .combo-change-btn.active {
          border-color: #353b31 !important;
          background: #353b31 !important;
          color: #fffdf7 !important;
        }
        .combo-redesign .combo-remove-item-btn {
          min-height: 36px !important;
          padding: 8px 11px !important;
          border: 1px solid #e5d9d2 !important;
          border-radius: 999px !important;
          background: transparent !important;
          color: #8b6d60 !important;
          font-size: 10px !important;
          font-weight: 650 !important;
        }
        .combo-redesign .combo-remove-item-btn:hover {
          border-color: #cba99b !important;
          background: #f8efeb !important;
          color: #7b4030 !important;
        }
        .combo-redesign .combo-options-panel {
          padding: 13px !important;
          border-top: 1px solid #eee8dd !important;
          background: #fcfaf5 !important;
        }
        .combo-redesign .combo-options-heading { gap: 8px !important; margin-bottom: 11px !important; }
        .combo-redesign .combo-options-heading strong {
          color: #33372f !important;
          font-size: 12px !important;
          font-weight: 750 !important;
        }
        .combo-redesign .combo-options-heading span { color: #8b8579 !important; font-size: 10px !important; }
        .combo-redesign .combo-option-strip { gap: 9px !important; }
        .combo-redesign .combo-option-card {
          border: 1px solid #e8e1d4 !important;
          border-radius: 13px !important;
          background: #fffefa !important;
          box-shadow: none !important;
        }
        .combo-redesign .combo-option-card:hover { border-color: #c7ad7c !important; }
        .combo-redesign .combo-option-card.selected {
          border-color: #9d855b !important;
          background: #f5f0e5 !important;
          box-shadow: 0 0 0 1px rgba(157,133,91,.12) !important;
        }
        .combo-redesign .combo-option-name { color: #33372f !important; font-size: 11px !important; }
        .combo-redesign .combo-option-card b { color: #98713a !important; font-size: 11px !important; }
        .combo-redesign .combo-option-card small { color: #817a6d !important; font-size: 9px !important; }
        .combo-redesign .combo-unavailable-note,
        .combo-redesign .combo-no-options {
          border-radius: 12px !important;
          background: #f5f0e5 !important;
          color: #777064 !important;
          font-size: 11px !important;
        }
        .combo-redesign .combo-redesign-footer {
          gap: 9px !important;
          margin-top: 16px !important;
          padding-top: 13px !important;
          border-top: 1px solid #e9e3d8 !important;
        }
        .combo-redesign .combo-redesign-footer > span {
          color: #8a857b !important;
          font-size: 10px !important;
        }
        .combo-redesign .combo-back-btn {
          min-height: 39px !important;
          padding: 9px 13px !important;
          border: 1px solid #e2dbce !important;
          border-radius: 999px !important;
          background: #fffefa !important;
          color: #4c5047 !important;
          font-size: 10px !important;
          font-weight: 700 !important;
        }
        .combo-redesign .combo-modal-button {
          min-height: 39px !important;
          padding: 9px 15px !important;
          border: 1px solid #30372f !important;
          border-radius: 999px !important;
          background: #30372f !important;
          color: #fffdf7 !important;
          box-shadow: none !important;
          font-size: 11px !important;
          font-weight: 750 !important;
        }
        .combo-redesign .modal-close {
          border: 1px solid #e9e2d7 !important;
          background: rgba(255,254,250,.96) !important;
          color: #383b33 !important;
          box-shadow: 0 3px 12px rgba(44,38,27,.06) !important;
        }
        @media (max-width: 600px) {
          .combo-redesign .combo-redesign-heading:not(.combo-gallery-heading) { padding: 0 38px 13px 0 !important; margin-bottom: 12px !important; }
          .combo-redesign .combo-redesign-heading:not(.combo-gallery-heading) h3 { font-size: 29px !important; }
          .combo-redesign .combo-total-panel:not(.combo-gallery-total) { padding: 13px !important; border-radius: 14px !important; }
          .combo-redesign .combo-line-main { display: grid !important; grid-template-columns: 58px minmax(0,1fr) auto !important; gap: 9px !important; padding: 9px !important; }
          .combo-redesign .combo-line-image { width: 58px !important; height: 60px !important; }
          .combo-redesign .combo-line-copy strong { font-size: 12px !important; }
          .combo-redesign .combo-line-copy span { font-size: 10px !important; }
          .combo-redesign .combo-line-copy b { font-size: 10px !important; }
          .combo-redesign .combo-line-actions { display: flex !important; flex-direction: column !important; gap: 5px !important; }
          .combo-redesign .combo-change-btn,
          .combo-redesign .combo-remove-item-btn { min-height: 31px !important; padding: 6px 10px !important; font-size: 10px !important; }
          .combo-redesign .combo-redesign-footer { display: grid !important; grid-template-columns: 1fr 1fr !important; }
          .combo-redesign .combo-redesign-footer > span { display: none !important; }
          .combo-redesign .combo-back-btn,
          .combo-redesign .combo-modal-button { width: 100% !important; justify-content: center !important; }
        }
        /* Combo customiser interaction improvements */
        .combo-redesign .combo-line-main { cursor: pointer !important; }
        .combo-redesign .combo-line-main:focus-visible { outline: 2px solid #c4a56b; outline-offset: -3px; border-radius: 14px; }
        .combo-redesign .combo-line-actions { margin-left: auto !important; }
        .combo-redesign .combo-remove-item-btn { min-height: 44px !important; min-width: 76px !important; padding: 10px 16px !important; font-size: 12px !important; font-weight: 750 !important; cursor: pointer !important; }
        @media (max-width: 600px) { .combo-redesign .combo-remove-item-btn { min-height: 40px !important; min-width: 70px !important; padding: 9px 12px !important; font-size: 11px !important; } }
        @media (prefers-reduced-motion: reduce) {
          .combo-redesign .combo-line,
          .combo-redesign .combo-line-image img { transition: none !important; }
        }

        /* Combo cards: hide per-product prices and give product imagery more room. */
        .combo-redesign .combo-gallery-image { height: clamp(190px, 23vw, 285px) !important; }
        .combo-redesign .combo-gallery-card-copy { min-height: 66px; justify-content: center; }
        .combo-redesign .combo-line-image { width: 92px !important; height: 82px !important; flex-basis: 92px !important; }
        .combo-redesign .combo-option-card img { height: 135px !important; object-fit: contain !important; padding: 4px; }
        .combo-redesign .combo-option-card { display: flex; flex-direction: column; }
        .combo-redesign .combo-option-name { flex: 1; }
        @media (max-width: 700px) {
          .combo-redesign .combo-gallery-image { height: 180px !important; }
          .combo-redesign .combo-line-image { width: 78px !important; height: 74px !important; flex-basis: 78px !important; }
          .combo-redesign .combo-option-card img { height: 125px !important; }
        }
        @media (max-width: 380px) {
          .combo-redesign .combo-gallery-image { height: 155px !important; }
          .combo-redesign .combo-option-card img { height: 108px !important; }
        }
      `}</style>
    </>
  );
}
