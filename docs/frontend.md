# GymMate — interface frontend

## Direction visuelle

GymMate rapproche les membres d’une même salle. Le dashboard met donc en avant les partenaires et les rendez-vous sportifs.

Références consultées : [Hevy](https://www.hevyapp.com/) et [Fitbod](https://apps.apple.com/us/app/fitbod-gym-fitness-planner/id1041517543). Elles servent d’inspiration pour la hiérarchie des informations et les cartes, sans reprendre leurs assets.

Palette dans `src/constants/palette.ts` : fond clair `#F6F8F2`, cartes blanches `#FFFFFF`, citron vert `#D4F86B`, texte sombre `#1B251D`, texte secondaire `#5D695E` et accents textuels vert foncé `#48601F`. L’accent attire l’attention sur la séance et les actions principales ; le texte sombre sur les boutons citron conserve un bon contraste.

## Organisation

- `src/app/_layout.tsx` : session, routes publiques/privées, header et footer partagés.
- `src/components/app-header.tsx` et `app-footer.tsx` : navigation commune.
- `src/components/ui/gym-ui.tsx` : écran défilant, boutons, champs, cartes, textes et erreurs.
- `src/components/member-card.tsx` : carte partenaire alimentée par ses props.
- `src/data/dashboard.ts` : salle et membres fictifs.
- `src/contexts/demo-session.tsx` : identité locale partagée entre profil et dashboard.
- `src/utils/validation.ts` : validation commune des formulaires.

## Parcours actuel

Inscription validée → connexion → dashboard. Expo Router `Stack.Protected` sélectionne le dashboard, premier écran privé, lorsque la session est créée. La déconnexion supprime la session et revient à l’accueil. Les routes privées ne sont plus accessibles en navigation sans session.

Pour tester : e-mail fictif valide et mot de passe quelconque de 8 caractères minimum. Il ne s’agit pas d’une authentification sécurisée. Aucun appel Firebase, aucune création réelle de compte, aucune persistance après rechargement. Le mot de passe n’est ni enregistré ni journalisé.

Les filtres et fiches des partenaires, le détail de séance et la modification locale du prénom fonctionnent. Les invitations et le chat ne sont pas encore implémentés. Les statistiques et la séance affichées sont fictives.

## Vérifications effectuées

- `npx tsc --noEmit` : réussi.
- `npx expo export --platform web` : réussi, sept routes exportées.
- Navigateur : formulaire vide refusé ; connexion vers `/profil/dashboard` ; filtre Fitness affichant Lina seule ; ouverture et fermeture des fiches partenaire et séance.
- Navigation du footer, modification du prénom propagée au dashboard, déconnexion vers l’accueil, accès direct déconnecté au dashboard renvoyé vers l’accueil.
- Inscription valide redirigée vers la connexion.
- Inspection visuelle du dashboard en 390 × 844 : contenu lisible et défilant, header et footer visibles.

Les builds Android/iOS et le comportement du clavier sur appareil restent à vérifier.

