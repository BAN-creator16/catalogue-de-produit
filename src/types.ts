export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Kinder Bueno",
    description: "Un biscuit croustillant fourré d'une crème onctueuse aux noisettes, nappé d'un délicieux chocolat au lait. L'expérience Kinder Bueno revisitée par bkfamily.",
    price: "800 FCFA",
    image: "https://image2url.com/r2/default/images/1773055667621-7510d2ce-5e65-446e-a1ec-cf634c26ca41.png",
    category: "Biscuits Chocolat"
  },
  {
    id: 2,
    name: "Mini M&M'S",
    description: "De délicieuses petites billes de chocolat colorées pour un plaisir croquant à chaque bouchée. Un classique indémodable.",
    price: "450 FCFA",
    image: "https://imgs.search.brave.com/nFSleEr_DKNgbEDuq2eiOSLG-TF_r9CM26HumT7xmaw/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/ZmlkdWNpYWwtb2Zm/aWNlLXNvbHV0aW9u/cy5mci9JTlRFUlNI/T1Avc3RhdGljL1dG/Uy9GT1MtRlItU2l0/ZS8tL0ZPUy9mcl9G/Ui9aT09NLzEzNzI0/My8xMzcyNDNfYi53/ZWJw",
    category: "Confiserie"
  },
  {
    id: 3,
    name: "Biscuit Nutella",
    description: "Le croquant d'un biscuit doré allié au cœur onctueux du Nutella. Une gourmandise irrésistible pour les petits et les grands.",
    price: "3700 FCFA",
    image: "https://imgs.search.brave.com/mWlXUpYNeatQdyBO8tUGgm14VQZsJTrfrmZKPsqvrE0/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jb29r/aW5nd2l0aG5vbm5h/LmNvbS9pbWFnZXMv/c3Rvcmllcy9ib3R0/ZWdhL05VVEVMTEEt/YmlzY3VpdC1zbWFs/bC5qcGc",
    category: "Biscuits"
  },
  {
    id: 4,
    name: "Chocolat Dubai Bites",
    description: "Une expérience chocolatée luxueuse inspirée des saveurs de Dubaï. Un mélange exquis de chocolat fin et de textures croquantes.",
    price: "14000 FCFA",
    image: "https://imgs.search.brave.com/TOmnMe7yH2bsULsHPQvndxAN_66x18J95E0hdeNcMCM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9jZG4x/MS5iaWdjb21tZXJj/ZS5jb20vcy0xY2Zo/bHBkNzRvL2ltYWdl/cy9zdGVuY2lsLzUw/MHg2NTkvcHJvZHVj/dHMvMzgzMTUvOTI5/MjYvMTI4MTI0X3c1/X182MjMyOC4xNzUx/MDI4MTMzLmpwZz9j/PTE",
    category: "Chocolat"
  },
  {
    id: 5,
    name: "Chocolat Bostani Thin & Filled",
    description: "Une finesse incomparable et un cœur fondant. Les chocolats Bostani Thin & Filled offrent une harmonie parfaite entre craquant et onctuosité.",
    price: "11000 FCFA",
    image: "https://imgs.search.brave.com/9Z4dl2AHte2LL82BMU_cY9nGGJLhoF7zj--juvvpDJs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/a2lvc2NsdWIuY29t/L2Nkbi9zaG9wL2Zp/bGVzL2ZvdG9zc2hv/cGkyTWVzYWRldHJh/YmFqbzEwLTEwMC5q/cGc_dj0xNzQxMzcz/ODg0JndpZHRoPTQ2/MA",
    category: "Chocolat"
  },
  {
    id: 6,
    name: "Champagne BARON MAXIME",
    description: "Un champagne d'exception aux bulles fines et élégantes. Parfait pour célébrer vos moments les plus précieux avec bkfamily.",
    price: "10000 FCFA",
    image: "https://imgs.search.brave.com/58wJ72EEndWWUXAaJqG8DQwje7CJnDZsCNvIZ1niHn4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9kcmlu/a3Nob3VzZTI0Ny5j/by51ay9jZG4vc2hv/cC9maWxlcy9CYXJv/bk1heGltZUJydXRH/b2xkUmVzZXJ2ZS53/ZWJwP3Y9MTc0MzE1/OTE1OQ",
    category: "Boissons"
  },
  {
    id: 8,
    name: "Biscuit TUC",
    description: "Le célèbre biscuit salé, léger et croustillant. Idéal pour un petit creux ou pour accompagner vos apéritifs.",
    price: "500 FCFA",
    image: "https://imgs.search.brave.com/FgXMrlQ1UcfvfO-viM9sMnjUfdcINdT2apDYzH3w3oU/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly93d3cu/Z3JvY2VyeS5jb20v/c3RvcmUvaW1hZ2Uv/Y2FjaGUvY2F0YWxv/Zy9kZWJldWtlbGFl/ci90dWMtc25hY2st/Y3JhY2tlci1iaXNj/dWl0LW9yaWdpbmFs/LWNsYXNzaWMtOC14/LTMtNS1CMDBPOTQ4/TUQwLTUwMHg1MDB3/LmpwZw",
    category: "Biscuits Salés"
  }
];
