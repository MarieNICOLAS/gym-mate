export function validateCredentials(email: string, password: string): string {
  if (!email.trim() || !password)
    return 'Remplis ton adresse e-mail et ton mot de passe.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()))
    return 'Saisis une adresse e-mail valide.';
  if (password.length < 8)
    return 'Le mot de passe doit contenir au moins 8 caractères.';
  return '';
}
