function requestValidator(obj) {
  //method
  if(obj.method == null || (obj.method!='GET' && obj.method!='POST' && obj.method!='DELETE' && obj.method!='CONNECT')) {
    throw new Error('Invalid request header: Invalid Method')
  }

  //uri
  let UriRegex = /^[a-zA-z.]+/
  if(obj.uri == null || (!UriRegex.test(obj.uri) && obj.uri!='*')) {
    throw new Error('Invalid request header: Invalid URI')
  }

  //version
  if(obj.version == null || (obj.version!='HTTP/0.9' && obj.version!='HTTP/1.0' && obj.version!='HTTP/1.1' && obj.version!='HTTP/2.0')) {
    throw new Error('Invalid request header: Invalid Version')
  }

  //message
  let messageRegex =/[<>\\&'"]/
  if(obj.message == null || (messageRegex.test(obj.message) && obj.message!='')) {
    throw new Error('Invalid request header: Invalid Message')
  }

  return obj
}