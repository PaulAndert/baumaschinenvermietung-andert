module.exports = [
  {
    slug: 'minidumper-baumax-rmd650',
    name: 'Minidumper BAUMAX RMD650',
    beschreibung: 'Minidumper mit Mitfahrplattform für den Materialtransport.',
    merkmale: ['Mitfahrplattform', 'Abholung oder Lieferung nach Absprache'],
    bilder: [
      '/images/01.avif',
      '/images/02.avif',
      '/images/03.avif',
      '/images/04.avif',
    ],
    preistabellen: [
      {
        titel: 'Mietpreise',
        spalten: ['Dauer', 'Preis pro Tag'],
        zeilen: [
          ['1 Tag', '60 € inkl. MwSt.'],
          ['ab 3 Tagen', '55 € inkl. MwSt.'],
          ['ab 5 Tagen', '50 € inkl. MwSt.'],
          ['Langzeitmiete', 'auf Anfrage'],
        ],
      },
      {
        titel: 'Liefergebühren',
        spalten: ['Radius', 'Lieferpreis'],
        zeilen: [
          ['bis 15 Kilometer', '40 € inkl. MwSt.'],
          ['bis 30 Kilometer', '80 € inkl. MwSt.'],
        ],
      },
    ],
    hinweise: [
      'Kaution: 200 € inkl. MwSt.',
      'Abholung mit eigenem Anhänger oder Lieferung nach Absprache.',
      'Lieferung inklusive Auf- und Abladen. Weitere Lieferkreise auf Anfrage.',
    ],
  },
];