class Message {
  constructor(id, sender, receiver, content, timestamp) {
    this.id = id;
    this.sender = sender;
    this.receiver = receiver;
    this.content = content;
    this.timestamp = timestamp;
  }
}

module.exports = Message;
