# 🎉 My Boilerplate Next.js avec NextAuth.js 🔐

Ce projet est un boilerplate pour construire des applications web avec Next.js et NextAuth.js. Il fournit une base solide pour développer rapidement des applications web modernes avec des fonctionnalités d'authentification sécurisées.

## Technologies utilisées

- **Next.js**
- **Typescript**
- **NextAuth.js**
- **Prisma**
- **Shadcn**
- **Resend**

## Configuration

1.  **Installation des dépendances** :

    `npm install`

2.  **Configuration des variables d'environnement** :

    - Assurez-vous de créer un fichier `.env` à la racine du projet avec les variables suivantes :

            `DATABASE_URL=Votre_URL_de_base_de_données
            NEXTAUTH_URL=URL_de_votre_application_Next.js
            NEXTAUTH_SECRET=Votre_secret_de_session_NextAuth
            RESEND_API_KEY=Resend_API_Key
            NEXT_PUBLIC_APP_URL=URL_de_votre_application_Next.js`

3.  **Configuration de Prisma** :

    - Exécutez les commandes suivantes pour générer les fichiers Prisma nécessaires et migrer votre base de données :

            `npx prisma generate`
            `npx prisma db push`

4.  **Démarrez l'application** :

    `npm run dev`

5.  **A modifier dans le code** :

@/lib/mail.ts : modifier "from" par votre adresse mail

Par @AlexandrePDA ✅
