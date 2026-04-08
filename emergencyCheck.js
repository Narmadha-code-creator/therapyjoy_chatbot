export function checkEmergency(message) {
  const emergencyKeywords = [
    "suicide",
    "kill myself",
    "self harm",
    "overdose",
    "chest pain",
    "can't breathe",
    "unconscious"
  ];

  const lower = message.toLowerCase();

  const found = emergencyKeywords.some(word =>
    lower.includes(word)
  );

  if (found) {
    return "⚠️ This may be a medical emergency. Please contact local emergency services immediately.";
  }

  return null;
}