# Kunal Gulati Portfolio
I wanted to practice building a quick API which performs concurrent data **fetching** and **caching** to reduce the data retrieval time. So, I built an API for retrieving data from a self-build API server which is hosted on heroku. 

Learn More about project structure, dataflow, & etc @ [https://medium.com/@kunalgulati98/concurrent-api-fetching-f1131c0a916b](https://medium.com/@kunalgulati98/concurrent-api-fetching-f1131c0a916b)
See How Concurrent Fetching App works @ [https://api-seven-gray.vercel.app/](https://api-seven-gray.vercel.app/)

## Getting Started
After cloning the Porject run the following commands 

### Client-Side

```bash
cd client
yarn add 
npm run dev
# or
yarn dev
```

First, run the development server:

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

### Server-Side

```bash
cd server
npm install
npm start
```

Open [http://localhost:4000](http://localhost:4000) with your browser to see the result.

### Prerequisites

Following libraries are requirement
1. yarn
2. npm
3. next 

## Deployment

### Client-Side
Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/import?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

### Server-Side:
I leverage the subtree command of git to only deploy the files in server folder (server-side code) to heroku. You can do that by using the following command:

```bash
git subtree push --prefix server heroku master
```

## Built With

* [NextJs](https://nextjs.org) - The React framework used
* [Material-UI](https://material-ui.com/) - Responsive Design 
* [yarn](https://yarnpkg.com/) - Package Manager for Client-side
* [mongodb](mongodb.com) - Database
* [Heroku](https://dashboard.heroku.com/) - Deployment

## Authors

* **Kunal Gulati** - [kunalGulati](https://github.com/kunalgulati)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
