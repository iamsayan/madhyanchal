export interface TwilioMessageResult {
  sid?: string;
  status?: string;
  error_code?: number | null;
  error_message?: string | null;
}

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  fromPhone: string;
  messagingServiceSid: string;
}

export function getTwilioConfig(): TwilioConfig {
  return {
    accountSid: process.env.TWILIO_ACCOUNT_SID!,
    authToken: process.env.TWILIO_AUTH_TOKEN!,
    fromPhone: process.env.TWILIO_PHONE_NUMBER!,
    messagingServiceSid: process.env.TWILIO_MESSAGING_SERVICE_SID!,
  };
}

/**
 * Sends a WhatsApp template message using Twilio Messages REST API.
 */
export async function sendWhatsAppMessage(
  phone: string,
  contentSid: string,
  contentVariables: Record<string, string> = {}
): Promise<TwilioMessageResult> {
  const config = getTwilioConfig();

  const to = phone.startsWith('whatsapp:')
    ? phone
    : `whatsapp:+91${phone.replace(/^\+?91/, '')}`;

  const bodyParams = new URLSearchParams();
  bodyParams.append('From', config.fromPhone);
  bodyParams.append('To', to);
  bodyParams.append('ContentSid', contentSid);

  if (config.messagingServiceSid) {
    bodyParams.append('MessagingServiceSid', config.messagingServiceSid);
  }

  if (Object.keys(contentVariables).length > 0) {
    bodyParams.append('ContentVariables', JSON.stringify(contentVariables));
  }

  const credentials = `${config.accountSid}:${config.authToken}`;
  const authHeader = `Basic ${Buffer.from(credentials).toString('base64')}`;

  const url = `https://api.twilio.com/2010-04-01/Accounts/${config.accountSid}/Messages.json`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Authorization: authHeader,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: bodyParams.toString(),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(
      `Twilio API error [${json.code || res.status}]: ${
        json.message || res.statusText
      }`
    );
  }

  return {
    sid: json.sid,
    status: json.status,
    error_code: json.error_code,
    error_message: json.error_message,
  };
}
