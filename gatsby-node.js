const path = require('path')

module.exports.createPages = async ({ graphql, actions}) => {
    const { createPage } = actions
    const blogTemplate = path.resolve('./src/templates/blog.js')
    const tipTemplate = path.resolve('./src/templates/tip.js')
    const res = await graphql(`
        query {
            allContentfulBlogPost {
                edges {
                    node {
                        slug
                    }
                }
            }
            allContentfulTips {
                edges {
                    node {
                        slug
                    }
                }
            }
        }
    `)

    res.data.allContentfulBlogPost.edges.forEach((edge) => {
        createPage({
            component: blogTemplate,
            path: `/${edge.node.slug}`,
            context: {
                slug: edge.node.slug
            }
        })
    })

    res.data.allContentfulTips.edges.forEach((edge) => {
        createPage({
            component: tipTemplate,
            path: `/${edge.node.slug}`,
            context: {
                slug: edge.node.slug
            }
        })
    })
}