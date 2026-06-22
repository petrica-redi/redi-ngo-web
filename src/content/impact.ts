export interface ImpactInitiative {
  slug: string;
  title: string;
  summary: string;
  description: string;
  image?: string;
  link?: string;
}

export const impactInitiatives: ImpactInitiative[] = [
  {
    slug: "fund",
    title: "REDI Fund",
    summary: "First microfinance investment vehicle focused on Roma entrepreneurs.",
    description:
      "Set up in Luxembourg in 2019 as a SOPARFI with OSF, SEDF, and CEB as anchor investors in 2021. REDI Fund facilitates access to finance for Roma entrepreneurs across Eastern Europe and the Balkans.",
    image: "/images/impact/fund.jpg",
    link: "https://redi-ngo.eu/fund",
  },
  {
    slug: "recycling",
    title: "REDI Recycling",
    summary: "Social enterprise led by Roma waste collectors for recycling secondary raw materials.",
    description:
      "Launched in 2020 in Skopje, supported by Helvetas, Ministry of Social Affairs Austria and OSF. REDI Recycling organizes and employs individual Roma collectors while building a sustainable circular economy.",
    image: "/images/impact/recycling.jpg",
    link: "https://redi-ngo.eu/recycling",
  },
  {
    slug: "network",
    title: "REDI Network",
    summary: "29 organizations from 15 countries working together across Europe.",
    description:
      "Members range from Norway to Spain and from France to Romania, pledging to improve the lives of vulnerable communities through economic empowerment and financial inclusion.",
    image: "/images/impact/network.jpg",
    link: "https://redi-ngo.eu/redi-network",
  },
  {
    slug: "business-club",
    title: "REDI Business Club",
    summary: "Connecting Roma entrepreneurs with mentors, investors, and markets.",
    description:
      "Regional business clubs offer training, mentoring, and networking opportunities to Roma entrepreneurs in Serbia, North Macedonia, and beyond.",
    image: "/images/impact/business-club.jpg",
  },
  {
    slug: "digital-boost",
    title: "Roma Digital Boost",
    summary: "Digital skills and tools for Roma entrepreneurs.",
    description:
      "A program enhancing digital competencies of Roma entrepreneurs, enabling them to access online markets, manage businesses digitally, and compete in the modern economy.",
    image: "/images/impact/digital-boost.jpg",
  },
];
