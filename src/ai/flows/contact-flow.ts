'use server';
/**
 * @fileOverview A flow to handle a contact form submission.
 *
 * - handleContactForm - A function that simulates sending an email from the contact form.
 * - ContactFormInput - The input type for the handleContactForm function.
 * - ContactFormOutput - The return type for the handleContactForm function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const ContactFormInputSchema = z.object({
  name: z.string().describe('The name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person.'),
  subject: z.string().describe('The subject of the message.'),
  message: z.string().describe('The message content.'),
});
export type ContactFormInput = z.infer<typeof ContactFormInputSchema>;

export const ContactFormOutputSchema = z.object({
  emailContent: z.string().describe('The simulated email body that would be sent.'),
});
export type ContactFormOutput = z.infer<typeof ContactFormOutputSchema>;

export async function handleContactForm(input: ContactFormInput): Promise<ContactFormOutput> {
  return contactFlow(input);
}

const prompt = ai.definePrompt({
  name: 'contactFormPrompt',
  input: { schema: ContactFormInputSchema },
  output: { schema: ContactFormOutputSchema },
  prompt: `You are a helpful assistant. A user has submitted the contact form on the KrishiConnect website.
Generate the plain text email body that would be sent to the support team.

The user's details are:
Name: {{{name}}}
Email: {{{email}}}
Subject: {{{subject}}}

Message:
{{{message}}}

Create the email content now.
`,
});

const contactFlow = ai.defineFlow(
  {
    name: 'contactFlow',
    inputSchema: ContactFormInputSchema,
    outputSchema: ContactFormOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
