class Item {
  constructor(id, name, description) {
    this.id = id;
    this.name = name;
    this.description = description;
  }

  validate() {
    if (!this.name) {
      throw new Error('Name is required');
    }
    return true;
  }
}

module.exports = Item;
