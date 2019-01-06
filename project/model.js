const M = module.exports = {}

const posts = []

M.add = function (post) {
  const id = posts.push(post) - 1
  post.created_at = new Date()
  post.id = id
}
M.remove = function (id) {
  let post = posts[id]
  posts[id]=null
  return post
}
M.modify=function(post){
let oldPost = posts[post.id]
post.created_at = oldPost.created_at
posts[post.id] = post
}


M.get = function (id) {
  return posts[id]
}

M.list = function () {
  return posts
}
M.check =function(){
 return posts
}
