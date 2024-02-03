require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

module.exports = {
  siteMetadata: {
    title: 'Bloemstraat Garden',
    author: 'Laura Vlasma',
    description: 'Graag neem ik jullie mee in onze voortgang van onze tuin. Dit zal voornamelijk om de moestuin gaan, maar ook de tuin renovatie.',
    keywords: ['moestuin', 'bloemstraat', 'groentes', 'biodiversiteit']
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: process.env.GATSBY_CONTENTFUL_SPACE_ID,
        accessToken: process.env.GATSBY_CONTENTFUL_ACCESS_TOKEN
      }
    },
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`,
      }
    },
    'gatsby-plugin-sharp',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          'gatsby-remark-relative-images',
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 600,
              linkImagesToOriginal: false
            }
          }
        ]
      }
    },
    `gatsby-plugin-image`,
  ]
}