// Only public facts already presented on the site belong in this markup.
export const person = {
  "@type": "Person",
  "@id": "https://aldoleka.com/about#aldo-leka",
  name: "Aldo Leka",
  url: "https://aldoleka.com/about",
  description:
    "Technical co-founder and software developer building independent apps, practical AI tools and automation.",
  sameAs: [
    "https://www.linkedin.com/in/aldo-leka/",
    "https://github.com/aldo-leka",
  ],
};

export const websiteIdentity = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://aldoleka.com/#website",
  name: "Aldo Leka",
  alternateName: "aldoleka.com",
  url: "https://aldoleka.com/",
  author: person,
};

export const profileIdentity = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://aldoleka.com/about#profile",
  url: "https://aldoleka.com/about",
  name: "About Aldo Leka",
  mainEntity: person,
};
