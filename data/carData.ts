export const CAR = {
  name: "Mercedes-AMG ONE",
  tagline: "The One and Only",
  subtitle: "Born from Formula 1. Built for the road.",
  year: 2022,
  price: "€2.72M",
  units: 275,
  nurburgring: "6:29.09",

  hero: {
    headline: "ONE",
    prefix: "MERCEDES-AMG",
    description:
      "Built to become a legend. The most extraordinary road-legal racing car from Affalterbach. Formula 1 technology, directly transferred to the road.",
  },

  performance: {
    topSpeed: { value: "352", unit: "KM/H", label: "Electronically Limited Top Speed" },
    acceleration: { value: "2.9", unit: "SEC", label: "0–100 KM/H" },
    acceleration200: { value: "7.0", unit: "SEC", label: "0–200 KM/H" },
    acceleration300: { value: "15.6", unit: "SEC", label: "0–300 KM/H" },
    power: { value: "1,063", unit: "HP", label: "System Power Output" },
    torque: { value: "900", unit: "NM", label: "Combined Torque" },
    revLimit: { value: "11,000", unit: "RPM", label: "V6 Engine Redline" },
  },

  engine: {
    title: "F1 Hybrid Powertrain",
    specs: [
      "1.6L V6 Turbo + 4 Electric Motors",
      "800V Battery by Mercedes-AMG HPP",
      "Petronas F1 Technology",
      "Pneumatic Valve Springs",
      "MGU-K + MGU-H Energy Recovery",
    ],
    description:
      "The dream of bringing Formula 1 technology to the road. A 1.6-litre V6 turbo and four electric motors deliver 1,063 hp system performance. Combined with an 800-volt battery developed by High Performance Powertrains — the F1 engine builder.",
  },

  chassis: {
    title: "Carbon Monocoque",
    weight: "1,695 kg",
    distribution: "50:50",
    gearbox: "7-Speed Automated Manual",
    clutch: "4-Disc Carbon Racing Clutch",
    suspension: "Push-Rod with Multi-Link Aluminium",
    description:
      "F1 carbon monocoque construction. No anti-roll bar — the push-rod suspension geometry eliminates roll mechanically. Ceramic wheel bearings. Race+ mode drops 37mm front, 30mm rear.",
  },

  aero: {
    title: "Active Aerodynamics",
    features: [
      "Two-Part Extendable Rear Wing with DRS",
      "Active Front Diffuser Flaps",
      "Moveable Front Wheelhouse Slats",
      "Roof-Mounted Air Intake",
      "5× Downforce Increase in Race+ / Strat 2",
    ],
  },

  dimensions: {
    length: "4,756 mm",
    width: "2,010 mm",
    height: "1,261 mm",
    wheelbase: "2,720 mm",
  },

  records: [
    { track: "Nürburgring Nordschleife", time: "6:29.09", note: "Fastest road-legal production car" },
    { track: "Monza Circuit", time: "1:43.90", note: "Faster than AMG GT3 race car" },
    { track: "Hockenheimring", time: "1:38.56", note: "Production car record" },
    { track: "Red Bull Ring", time: "1:26.85", note: "Production car record" },
  ],
};
