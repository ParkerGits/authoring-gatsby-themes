const fs = require('fs');

exports.onPreBootstrap = ({ reporter }) => {
  const contentPath = 'data';

  if (!fs.existsSync(contentPath)) {
    reporter.info(`creating the ${contentPath} directory`);
    fs.mkdirSync(contentPath);
  }
};

exports.sourceNodes = ({ actions }) => {
  actions.createTypes(`
    type Event implements Node @dontInfer {
      id: ID!
      name: String!
      location: String!
      startDate: Date! @dateformat @proxy(from: "start_date")
      endDate: Date! @dateformat @proxy(from: "end_date")
      url: String!
      slug: String!
    }
  `)
}

exports.createResolvers = ({ createResolvers }) => {
  const basePath = '/'

  const slugify = str => {
    const slug = str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    return `/${basePath}/${slug}`.replace(/\/\/+/g, '/');
  }

  createResolvers({
    Event: {
      slug: {
        resolve: source => slugify(source.name)
      }
    }
  })
}
