// Données fictives de présentation, indépendantes des composants.
export const demoGym = 'Campus Gym SQY';
export const demoMembers = [
  { id: 'sami', name: 'Sami', initials: 'SA', sport: 'Musculation', level: 'Intermédiaire', availability: 'En soirée', goal: 'Progresser ensemble et garder un rythme régulier.' },
  { id: 'lina', name: 'Lina', initials: 'LI', sport: 'Fitness', level: 'Débutante', availability: 'Le week-end', goal: 'Trouver de la motivation et reprendre le sport à deux.' },
  { id: 'amine', name: 'Amine', initials: 'AM', sport: 'Cardio', level: 'Intermédiaire', availability: 'Le matin', goal: 'Améliorer mon endurance avec un partenaire régulier.' },
];
export type Member = typeof demoMembers[number];
