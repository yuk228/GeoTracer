import { validateTurnstileToken } from 'next-turnstile'

export async function validateToken(token: string) {
  try {
    const result = await validateTurnstileToken({
      token,
      secretKey: process.env.TURNSTILE_SECRET_KEY || '',
    })

    if (result.success) {
      return true
    }
  } catch (error) {
    console.error('Validation failed:', error)
  }
  return false
}
