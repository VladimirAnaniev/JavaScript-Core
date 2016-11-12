function* extractTags (html) {
  let regex = /<[a-zA-Z/='" ]*>/g

  for(let tag of html.match(regex)){
    yield tag
  }
}