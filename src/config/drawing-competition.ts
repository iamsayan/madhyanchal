export interface DrawingCompetitionConfig {
  year: number;
  edition: number;
  competitionDateISO: string;
  competitionDateDisplay: string;
  reportingTimeDisplay: string;
  prizeCeremonyDisplay: string;
  venueName: string;
  venueLocation: string;
  registrationFee: number;
  maxParticipantsPerGuardian: number;
  topic: string;
}

// Base year when competition started (1st Edition = 2024)
export const COMPETITION_START_YEAR = 2024;

// Central configuration for the current active competition season
export const DRAWING_COMPETITION_CONFIG: DrawingCompetitionConfig = {
  year: 2026,
  edition: 2026 - COMPETITION_START_YEAR + 1, // 3rd Edition
  competitionDateISO: '2026-10-11T10:00:00+05:30', // Event date & time
  competitionDateDisplay: 'Sunday, 11th Oct 2026',
  reportingTimeDisplay: '10:00 AM (Report 9:30 AM)',
  prizeCeremonyDisplay: 'Saturday, 17th October 2026 at 5:00 PM',
  venueName: 'Madhyanchal Durga Puja Mandap',
  venueLocation: 'Chandannagar, Hooghly, West Bengal',
  registrationFee: 50,
  maxParticipantsPerGuardian: 5,
  topic: 'Draw As You Like',
};

/**
 * Checks if the competition date has passed and registrations are closed.
 */
export function isRegistrationClosed(
  competitionDateISO: string = DRAWING_COMPETITION_CONFIG.competitionDateISO
): boolean {
  const eventDate = new Date(competitionDateISO);
  const now = new Date();
  return now > eventDate;
}

/**
 * Converts numbers into ordinal strings (e.g., 1 -> 1st, 2 -> 2nd, 3 -> 3rd, 4 -> 4th)
 */
export function getOrdinalSuffix(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

/**
 * Dynamically computes DOB eligibility cutoffs for Group A, B, and C based on the competition year.
 */
export function getAgeCategoryLimits(
  competitionYear: number = DRAWING_COMPETITION_CONFIG.year
) {
  const y6 = competitionYear - 6;
  const y10 = competitionYear - 10;
  const y15 = competitionYear - 15;

  return [
    {
      group: 'Group A',
      title: 'Budding Stars',
      age: 'Up to 6 Years',
      dob: `Born on or after 12.10.${y6}`,
      topic: DRAWING_COMPETITION_CONFIG.topic,
      badgeColor:
        'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
      prizes: '3 Trophies (1st, 2nd, 3rd) + 2 Medals (4th, 5th)',
      description:
        'Nurturing early imagination, color discovery, and joyful creative expression.',
    },
    {
      group: 'Group B',
      title: 'Rising Creators',
      age: '7 to 10 Years',
      dob: `Born between 12.10.${y10} & 11.10.${y6}`,
      topic: DRAWING_COMPETITION_CONFIG.topic,
      badgeColor:
        'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
      prizes: '3 Trophies (1st, 2nd, 3rd) + 2 Medals (4th, 5th)',
      description:
        'Fostering technical skills, spatial awareness, and visual storytelling.',
    },
    {
      group: 'Group C',
      title: 'Master Artists',
      age: '11 to 15 Years',
      dob: `Born between 12.10.${y15} & 11.10.${y10}`,
      topic: DRAWING_COMPETITION_CONFIG.topic,
      badgeColor:
        'border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300',
      prizes: '3 Trophies (1st, 2nd, 3rd) + 2 Medals (4th, 5th)',
      description:
        'Showcasing advanced artistic vision, composition, and individual mastery.',
    },
  ];
}
