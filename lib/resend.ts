import { Resend } from "resend";

// Resend is optional - only initialize if API key is provided
const resendApiKey = process.env.RESEND_API_KEY;

export const resend = resendApiKey ? new Resend(resendApiKey) : null;
