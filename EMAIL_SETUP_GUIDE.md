# Azure Function Email Setup Guide

This guide explains how the contact form sends emails using your Azure Function endpoint.

## How It Works

The contact form now uses your Azure Function to send emails instead of EmailJS. When a user submits the contact form, it makes a POST request to your Azure Function endpoint with the form data.

## Azure Function Endpoint

**URL:** `https://emailsenderv220240615132805.azurewebsites.net/api/SendEmail`

**Method:** POST

**Query Parameter:** `code=K6WVYGUJ7zidlyrEx3UgubLqDzO4JfwQaYtaB3fjMMxXAzFuEa23uA==`

## Payload Format

The contact form sends the following JSON payload to your Azure Function:

```json
{
    "to": "your-email@example.com",
    "subject": "Contact Form: [Subject] from [Name]",
    "message": "New contact form submission from your website:\n\nName: [Name]\nEmail: [Email]\nSubject: [Subject]\n\nMessage:\n[Message]\n\n---\nSent from ZenByte Apps website contact form."
}
```

## Setup Instructions

### Step 1: Update Email Configuration

1. Open `js/email-config.js` in your project
2. Replace the placeholder email address with your actual email:

```javascript
const EMAIL_CONFIG = {
    TO_EMAIL: "your-actual-email@example.com"  // Replace with your email address
};
```

### Step 2: Test the Contact Form

1. Open your website in a browser
2. Go to the Contact page
3. Fill out the contact form and submit
4. Check your email for the message
5. Check the browser console for any error messages

## Troubleshooting

### Common Issues:

1. **"Failed to fetch" error**
   - Check if your Azure Function is running and accessible
   - Verify the function URL and code are correct
   - Check for CORS issues if testing locally

2. **"HTTP error! status: 400/500"**
   - Check your Azure Function logs for errors
   - Verify the payload format matches what your function expects
   - Ensure your function can handle the request

3. **Emails not being sent**
   - Check your Azure Function configuration
   - Verify email service settings in your Azure Function
   - Check the browser console for error messages

## Email Format

The emails you receive will look like this:

```
Subject: Contact Form: [Subject] from [Name]

New contact form submission from your website:

Name: [User's Name]
Email: [User's Email]
Subject: [Subject]

Message:
[User's Message]

---
Sent from ZenByte Apps website contact form.
```

## Security Notes

- The Azure Function code is exposed in the client-side code
- Consider implementing rate limiting in your Azure Function
- Ensure your Azure Function has proper authentication if needed

## Benefits of Azure Function Approach

- ✅ **No third-party dependencies** - Uses your own Azure infrastructure
- ✅ **Full control** - You control the email sending logic
- ✅ **Scalable** - Azure Functions can handle high traffic
- ✅ **Cost-effective** - Pay only for what you use
- ✅ **Secure** - Your email credentials stay on your Azure infrastructure

## Support

If you need help with your Azure Function, check the Azure Function logs in the Azure portal or refer to the Azure Functions documentation.
