'use server';
/**
 * @fileOverview A flow to handle a password reset request.
 *
 * - requestPasswordReset - A function that simulates sending a password reset email.
 * - ResetPasswordInput - The input type for the requestPasswordReset function.
 * - ResetPasswordOutput - The return type for the requestPasswordReset function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ResetPasswordInputSchema = z.object({
  email: z.string().email().describe('The email address to send the reset link to.'),
});
export type ResetPasswordInput = z.infer<typeof ResetPasswordInputSchema>;

const ResetPasswordOutputSchema = z.object({
  emailContent: z.string().describe('The simulated email body that would be sent.'),
});
export type ResetPasswordOutput = z.infer<typeof ResetPasswordOutputSchema>;

export async function requestPasswordReset(input: ResetPasswordInput): Promise<ResetPasswordOutput> {
  const resetPasswordFlow = ai.defineFlow(
    {
      name: 'resetPasswordFlow',
      inputSchema: ResetPasswordInputSchema,
      outputSchema: ResetPasswordOutputSchema,
    },
    async (input) => {
      const prompt = ai.definePrompt({
        name: 'resetPasswordPrompt',
        input: { schema: ResetPasswordInputSchema },
        output: { schema: ResetPasswordOutputSchema },
        prompt: `You are a security assistant. A user with the email '{{{email}}}' has requested a password reset for their KrishiConnect account.
Generate the plain text email body for the password reset email. Include a fictional, non-functional reset link.`,
      });

      const { output } = await prompt(input);
      return output!;
    }
  );

  return resetPasswordFlow(input);
}
