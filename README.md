# is442-project
OOP Project

## Requirements

- Docker
- docker-compose
- npm / node 21

## Set-up

1. Create a `.env` file in `/project/frontend` with the following values:

|key|value|
| --- | --- |
| NEXT_PUBLIC_BACKEND | `http://localhost:8080` |
| NEXT_PUBLIC_FRONTEND | `http://localhost:3000` |
| GMAIL_FROM | Refer to [this](https://medium.com/@y.mehnati_49486/how-to-send-an-email-from-your-gmail-account-with-nodemailer-837bf09a7628) |
| GMAIL_APP_PASSWORD | Refer to [this](https://medium.com/@y.mehnati_49486/how-to-send-an-email-from-your-gmail-account-with-nodemailer-837bf09a7628) |
| NEXTAUTH_SECRET | any string value |
2. In `/project`, run the backend: `docker-compose up -d --build`
3. In `/project/frontend`, run the frontend: `npm i`, `npm run dev`
4. Access at `http://localhost:3000`