require("dotenv").config({
  path: `.env`,
})

module.exports = {
  siteMetadata: {
    title: 'Bloemstraat Garden',
    author: 'Laura Vlasma',
    description: 'Graag neem ik jullie mee in onze voortgang van de tuin. Dit zal voornamelijk om de moestuin gaan, maar ook de tuin renovatie.',
    keywords: ['moestuin', 'bloemstraat', 'groentes', 'biodiversiteit']
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-source-contentful',
      options: {
        spaceId: "28kprnge4h5y",
        accessToken: "DaHiFY3tITkSFHH0ZWkOEBloynmoxEkLor_zjlqbpbA"
      }
    },
    `gatsby-plugin-sass`,
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'src',
        path: `${__dirname}/src/`
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