const { Blog, User } = require('../../schema')
const trash = require('../../service/trash')

module.exports = {
    Blog: {
        creator(blog) {
            return User.findOne({ _id: blog.createdBy })
        },
        updator(blog) {
            return User.findOne({ _id: blog.updatedBy })
        }
    },
    Query: {
        myBlogs(root, args, ctx, info) {
            let { _id } = ctx.state.user
            return Blog.find({ createdBy: _id })
        },
        blogs: (root, args, ctx, info) => {
            let { _id } = ctx.state.user
            return Blog.find({})
        },
        blog: (root, args) => {
            return Blog.findOne(args)
        }
    },
    Mutation: {
        async addBlog(root, args, ctx, info) {
            let { _id } = ctx.state.user
            let data = {
                ...args,
                createdBy: _id,
                updatedBy: _id,
                createdAt: Date.now(),
                updatedAt: Date.now()
            }
            return Blog.create(data)
        },
        async updateBlog(root, args, ctx, info) {
            const userId = ctx.state.user._id
            let data = {
                title: args.content,
                content: args.content,
                updatedBy: userId,
                updatedAt: new Date()
            }
            return Blog.updateOne({ _id: args._id }, data)
        },
        async deleteBlog(root, args, ctx, info) {
            const userId = ctx.state.user._id
            let result = await Blog.findOneAndDelete({ _id: args._id })
            await trash('blog', result, userId)
            return result
            // return Blog.deleteOne({ _id: args._id })
        }
    }
}
