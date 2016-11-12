function posts () {
  class Post {
    constructor (title, content) {
      if(new.target === Post) {
        throw new Error("Cannot instantiate directly.")
      }

      this.title = title
      this.content = content
    }

    toString () {
      return `Post: ${this.title}\nContent: ${this.content}`
    }
  }

  class SocialMediaPost extends Post {
    constructor (title, content, likes, dislikes) {
      super(title, content)
      this.likes = likes
      this.dislikes = dislikes
      this.comments = []
    }

    addComment (str) {
      this.comments.push(str)
      return this
    }

    toString () {
      let returnStr = `Post: ${this.title}\nContent: ${this.content}\nRating: ${this.likes - this.dislikes}`

      if(this.comments.length){
          let comments = this.comments.join('\n* ')
          returnStr+= '\nComments:\n* ' + comments
      }

      return returnStr
    }
  }

  class BlogPost extends Post {
    constructor (title, content, views) {
      super(title, content)
      this.views = views
    }

    view () {
      this.views++
      return this
    }

    toString () {
      return `Post: ${this.title}\nContent: ${this.content}\nViews: ${this.views}`
    }
  }

  return {Post, SocialMediaPost, BlogPost}
}

let obj = posts()
// let post = new obj.Post()
// let socialPost = new obj.SocialMediaPost()
// let blog = new obj.BlogPost()
// console.log(post + socialPost + blog)
let SocialMediaPost = obj.SocialMediaPost
let socialPost = new SocialMediaPost('Post', 'Content', 33, 26)

console.log(socialPost.toString())

socialPost.addComment('poo')

console.log(socialPost.toString())
