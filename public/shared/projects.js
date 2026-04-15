/**
 * Field Studies Display — Project Data
 *
 * Each project represents a residential installation from the
 * "Field Studies — Design Review" catalogue.
 *
 * Replace placeholder values with real catalogue data.
 * Images should be placed in assets/images/{projectId}/
 * Plans should be placed in assets/plans/{projectId}.svg
 */

const PROJECTS = [
  {
    id: 'home-sanctuary',
    title: 'Home Sanctuary',
    location: 'Amsterdam, The Netherlands',
    architect: 'Barde vanVoltt',
    code: 'FS R22/01 IN EU',
    pages: '016 — 023',
    quote: {
      text: 'Nestling inside and watching the rain pass.',
      author: 'Barde vanVoltt',
    },
    products: [
      { number: 1, name: 'Memory', type: 'Taps' },
      { number: 2, name: 'In-Out', type: 'Bathtub' },
      { number: 3, name: 'Ottocento', type: 'Washbasin' },
      { number: 4, name: 'Sen', type: 'Shower' },
    ],
    images: {
      hero: 'assets/images/home-sanctuary/hero.jpg',
      gallery: [
        'assets/images/home-sanctuary/01.jpg',
        'assets/images/home-sanctuary/02.jpg',
        'assets/images/home-sanctuary/03.jpg',
        'assets/images/home-sanctuary/04.jpg',
      ],
      thumbnail: 'assets/images/home-sanctuary/thumb.jpg',
    },
    plan: 'assets/plans/home-sanctuary.svg',
  },
  {
    id: 'coastal-retreat',
    title: 'Coastal Retreat',
    location: 'Cascais, Portugal',
    architect: 'Studio Marlene Uldschmidt',
    code: 'FS R23/02 SO EU',
    pages: '024 — 031',
    quote: {
      text: 'Where the Atlantic light enters every room.',
      author: 'Marlene Uldschmidt',
    },
    products: [
      { number: 1, name: 'Drop', type: 'Bathtub' },
      { number: 2, name: 'Memory', type: 'Taps' },
      { number: 3, name: 'Spoon XL', type: 'Washbasin' },
    ],
    images: {
      hero: 'assets/images/coastal-retreat/hero.jpg',
      gallery: [
        'assets/images/coastal-retreat/01.jpg',
        'assets/images/coastal-retreat/02.jpg',
        'assets/images/coastal-retreat/03.jpg',
      ],
      thumbnail: 'assets/images/coastal-retreat/thumb.jpg',
    },
    plan: 'assets/plans/coastal-retreat.svg',
  },
  {
    id: 'alpine-residence',
    title: 'Alpine Residence',
    location: 'Kitzbuhel, Austria',
    architect: 'Gogl Architekten',
    code: 'FS R22/03 CE EU',
    pages: '032 — 039',
    quote: {
      text: 'Stone and water, silence and warmth.',
      author: 'Lukas Gogl',
    },
    products: [
      { number: 1, name: 'Cartesio', type: 'Bathtub' },
      { number: 2, name: 'Sen', type: 'Taps' },
      { number: 3, name: '815', type: 'Washbasin' },
      { number: 4, name: 'Memory', type: 'Accessories' },
    ],
    images: {
      hero: 'assets/images/alpine-residence/hero.jpg',
      gallery: [
        'assets/images/alpine-residence/01.jpg',
        'assets/images/alpine-residence/02.jpg',
        'assets/images/alpine-residence/03.jpg',
        'assets/images/alpine-residence/04.jpg',
      ],
      thumbnail: 'assets/images/alpine-residence/thumb.jpg',
    },
    plan: 'assets/plans/alpine-residence.svg',
  },
  {
    id: 'urban-loft',
    title: 'Urban Loft',
    location: 'Milano, Italia',
    architect: 'Studio Wok',
    code: 'FS R24/04 SO EU',
    pages: '040 — 047',
    quote: {
      text: 'A dialogue between industrial memory and domestic intimacy.',
      author: 'Studio Wok',
    },
    products: [
      { number: 1, name: 'Immersion', type: 'Bathtub' },
      { number: 2, name: 'Radical', type: 'Washbasin' },
      { number: 3, name: 'Memory', type: 'Taps' },
    ],
    images: {
      hero: 'assets/images/urban-loft/hero.jpg',
      gallery: [
        'assets/images/urban-loft/01.jpg',
        'assets/images/urban-loft/02.jpg',
        'assets/images/urban-loft/03.jpg',
      ],
      thumbnail: 'assets/images/urban-loft/thumb.jpg',
    },
    plan: 'assets/plans/urban-loft.svg',
  },
  {
    id: 'garden-house',
    title: 'Garden House',
    location: 'Copenhagen, Denmark',
    architect: 'Norm Architects',
    code: 'FS R23/05 NO EU',
    pages: '048 — 055',
    quote: {
      text: 'The bathroom as a clearing in the forest.',
      author: 'Jonas Bjerre-Poulsen',
    },
    products: [
      { number: 1, name: 'Spoon XL', type: 'Bathtub' },
      { number: 2, name: 'Ottocento', type: 'Washbasin' },
      { number: 3, name: 'Square', type: 'Mirror' },
      { number: 4, name: 'Sen', type: 'Taps' },
      { number: 5, name: 'In-Out', type: 'Shower tray' },
    ],
    images: {
      hero: 'assets/images/garden-house/hero.jpg',
      gallery: [
        'assets/images/garden-house/01.jpg',
        'assets/images/garden-house/02.jpg',
        'assets/images/garden-house/03.jpg',
        'assets/images/garden-house/04.jpg',
        'assets/images/garden-house/05.jpg',
      ],
      thumbnail: 'assets/images/garden-house/thumb.jpg',
    },
    plan: 'assets/plans/garden-house.svg',
  },
];
