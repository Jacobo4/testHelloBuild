# Hello Build test

Hello build test project. This project is a React.js web app that displays a list of GitHub repositories for a given GitHub user. The technologies used in this project include:

- Technologies: React.js, tailwindcss + css.modules, TypeScript
- Builder: Vite
- Deployment: Vercel
- Services: Firebase (Oauth using GitHub as a provider), GitHub GraphQL API

> **_NOTE:_** The use of Tailwindcss + Css.modules is a personal preference. I use Tailwindcss for theming and styling, and Css.modules for pure structure, layout, and space purposes.
## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Deployment](#deployment)
- [Services](#services)
- [Contributing](#contributing)
- [License](#license)

## Installation

Follow these steps to install and set up the React.js web app:

1. Clone the repository to your local machine:

   ```shell
   git clone https://github.com/Jacobo4/testHelloBuild.git
   ```

2. Navigate to the project directory:

   ```shell
   cd testHelloBuild
   ```

3. Install the dependencies using a package manager like npm or Yarn:

   ```shell
   npm install
   ```

   or

   ```shell
   yarn install
   ```

## Usage

To start the development server and run the React.js web app, use the following command:

```shell
npm run dev
```

or

```shell
yarn dev
```

This will start the development server at `http://localhost:5173`. Open your browser and navigate to this address to view the app.

## Deployment

To deploy the React.js web app using Vercel, follow these steps:

1. Create an account on [Vercel](https://vercel.com/) if you don't have one already.

2. Install the Vercel CLI globally by running the following command:

   ```shell
   npm install -g vercel
   ```

   or

   ```shell
   yarn global add vercel
   ```

3. Build the app for production:

   ```shell
   npm run build
   ```

   or

   ```shell
   yarn build
   ```

4. Deploy the app using the Vercel CLI:

   ```shell
   vercel
   ```

   Follow the on-screen prompts to connect your Vercel account and deploy the app.

5. Once the deployment is complete, you will receive a URL for your deployed app.

## Services

### Firebase (Oauth using GitHub as a provider)

This React.js web app integrates with Firebase for authentication using GitHub as the provider. To set up Firebase authentication:

1. Go to the [Firebase console](https://console.firebase.google.com/) and create a new project.

2. Enable the "Authentication" service in your Firebase project.

3. Under the "Sign-in method" tab, enable the "GitHub" sign-in provider.

4. Set up your GitHub application:
   - Go to your GitHub account settings.
   - Select "Developer settings" from the sidebar, then click on "OAuth Apps."
   - Create a new OAuth App, providing the necessary information.
   - Set the "Authorization callback URL" to the Firebase authentication callback URL, which should be something like: `https://<your-project-id>.firebaseapp.com/__/auth/handler`.

5. In your React.js app code, configure the Firebase SDK with your Firebase project credentials and initialize the authentication with the GitHub provider. Refer to the Firebase documentation for more details on setting up Firebase authentication.

## Contributing

Contributions are welcome! If you want to contribute to this project, please follow these steps:

1. Fork the repository.

2. Create a new branch for your feature or bug fix:

   ```shell
   git checkout -b <branch-name>
   ```

3. Make your changes and commit them:

   ```shell
   git commit -m "Your commit message"
   ```

4. Push your branch to your forked repository:

   ```shell
   git push origin <branch-name>
   ```

5. Open a pull request on the original repository.

## License

This project is licensed under the [MIT License](LICENSE).
