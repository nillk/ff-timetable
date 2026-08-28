/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  pathPrefix: `/ff-timetable`,
  plugins: [
    {
      resolve: `gatsby-transformer-json`,
      options: {
        typeName: `Schedule`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `schedule`,
        path: `${__dirname}/data/`,
        ignore: [`**/__pycache__`, `**/*.md`, `**/*.txt`, `**/*.py`],
      },
    },
    `gatsby-plugin-postcss`,
  ],
};
