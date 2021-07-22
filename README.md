# Unicursos

This is a server-side rendering application, developed to be a similar clone of the popular Udemy website. Developed with fully responsive design in order to look good in all devices.

## Live Demo

[Link](https://unicursos-nextjs.netlify.app/)

## Technologies Used

This app was bootstrapped using the create-next-app and uses the following technologies.

- Next JS
- React hooks
- Context API
- CSS3
- Emotion CSS
- Firebase services.

## How to install

### Cloning the project from github

Open a terminal and type:

```sh
$ git clone https://github.com/neduardoaguirre/unicursos-nextjs.git
```

### Install npm dependencies

```sh
$ cd unicursos-nextjs
$ npm install
```

### Setting up environments

1.  You will find a file named `.env.example` on root directory of project.
2.  Create a new file by copying and pasting the file and then renaming it to just `.env`
    ```sh
    $ cp .env.example .env
    ```
3.  The file `.env` is already ignored, so you never commit your Firebase services credentials.
4.  Change the values of the file to your environment.

    ```sh
    NEXT_PUBLIC_FIREBASE_API_KEY=
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
    NEXT_PUBLIC_FIREBASE_PROJECT_ID=
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
    NEXT_PUBLIC_FIREBASE_APP_ID=
    ```

## How to run

### Runs the app in the development mode.

First, run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
