const path = require('path');

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
      },
    },
  });
};

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `Schedule`) {
    const name = node.name;
    const year = node.year;
    const date = node.date;

    createNodeField({
      node,
      name: `slug`,
      value: `/${name}/${year}/${date}/`,
    });
  }
};

exports.createPages = async function({ actions, graphql }) {
  const { data } = await graphql(`
    query {
      allSchedule {
        nodes {
          name
          year
          date
          fields {
            slug
          }
        }
      }
    }
  `);

  data.allSchedule.nodes.forEach(node => {
    const name = node.name;
    const year = node.year;
    const date = node.date;

    const slug = node.fields.slug;

    actions.createPage({
      path: slug,
      component: require.resolve(`./src/templates/day-schedule.js`),
      context: { name, year, date },
    });
  });
};
