
/**
 * Security utility functions for input validation and sanitization
 */

// Input sanitization
export const sanitizeInput = (input: string, maxLength: number = 1000): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential XSS characters
    .replace(/javascript:/gi, '') // Remove javascript: protocols
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .slice(0, maxLength);
};

// Email validation
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

// Rate limiting helper
export class RateLimiter {
  private lastAction: number = 0;
  private delay: number;

  constructor(delayMs: number) {
    this.delay = delayMs;
  }

  canProceed(): boolean {
    const now = Date.now();
    if (now - this.lastAction < this.delay) {
      return false;
    }
    this.lastAction = now;
    return true;
  }

  getRemainingTime(): number {
    const now = Date.now();
    const remaining = this.delay - (now - this.lastAction);
    return Math.max(0, Math.ceil(remaining / 1000));
  }
}

// Content validation
export const validateContent = (content: string, minLength: number = 1, maxLength: number = 1000): { isValid: boolean; error?: string } => {
  if (!content || content.trim().length < minLength) {
    return { isValid: false, error: `Content must be at least ${minLength} characters long` };
  }
  
  if (content.length > maxLength) {
    return { isValid: false, error: `Content must not exceed ${maxLength} characters` };
  }
  
  // Check for potential malicious content
  const suspiciousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+=/i,
    /<iframe/i,
    /<object/i,
    /<embed/i
  ];
  
  for (const pattern of suspiciousPatterns) {
    if (pattern.test(content)) {
      return { isValid: false, error: 'Content contains potentially unsafe elements' };
    }
  }
  
  return { isValid: true };
};

// Safe URL validation
export const isValidURL = (url: string): boolean => {
  try {
    const urlObj = new URL(url);
    return ['http:', 'https:'].includes(urlObj.protocol);
  } catch {
    return false;
  }
};
