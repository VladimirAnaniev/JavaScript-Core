class MailBox {
  constructor(){
    this.messages = []
  }

  addMessage(subject, text) {
    this.messages.push({
      subject: subject,
      text: text
    })
    return this
  }

  get messageCount () {
    return this.messages.length
  }

  deleteAllMessages () {
    this.messages = []
    return this
  }

  findBySubject(substr) {
    let returnArr = []

    let regex = new RegExp(substr)

    for(let message of this.messages) {
      if(regex.test(message.subject)) {
        returnArr.push(message)
      }
    }

    return returnArr
  }

  toString() {
    if(this.messages.length==0) return '* (empty mailbox)'
    else {
      let returnStr = ''
      for(let i = 0;i<this.messages.length;i++) {
        if(i==0)returnStr+=` * [${this.messages[i].subject}] ${this.messages[i].text}`
        else returnStr+=`\n * [${this.messages[i].subject}] ${this.messages[i].text}`
      }
      return returnStr
    }
  }
}

let mb = new MailBox();
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);
mb.addMessage("meeting", "Let's meet at 17/11");
mb.addMessage("beer", "Wanna drink beer tomorrow?");
mb.addMessage("question", "How to solve this problem?");
mb.addMessage("Sofia next week", "I am in Sofia next week.");
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);
console.log("Messages holding 'rakiya': " +
  JSON.stringify(mb.findBySubject('rakiya')));
console.log("Messages holding 'ee': " +
  JSON.stringify(mb.findBySubject('ee')));

mb.deleteAllMessages();
console.log("Msg count: " + mb.messageCount);
console.log('Messages:\n' + mb);

console.log("New mailbox:\n" +
  new MailBox()
    .addMessage("Subj 1", "Msg 1")
    .addMessage("Subj 2", "Msg 2")
    .addMessage("Subj 3", "Msg 3")
    .toString());
