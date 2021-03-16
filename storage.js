const fs = require("fs");

class Storage {
    constructor() {
        const data = fs.readFileSync("./storage.json");
        this.storage = JSON.parse(data);
    }

    get = () => this.storage;
    addNew = (obj) => {

        let newEntry = {
            id: this.getNextId(),
            name: obj.name,
            phone: obj.phone
        };

        this.storage = Object.values({...this.storage, newEntry});
        fs.writeFileSync('./storage.json', JSON.stringify(this.get()));
    }
    delete = (id) =>{
        let item = this.getItem(id);
        const index = this.storage.indexOf(item);
        this.storage.splice(index, 1);

        fs.writeFileSync('./storage.json', JSON.stringify(this.get()));
    }
    update = (newItem) =>{
        let item = this.getItem(newItem.id);
        item.name = newItem.name;
        item.phone = newItem.phone;
        fs.writeFileSync('./storage.json', JSON.stringify(this.get()));
    }
    getItem = (id) => this.storage.find(x => x.id === parseInt(id));
    getNextId = () => this.storage
        .reduce(
            (a, b) => a.id > b.id ? a : b
        ).id + 1;
}

module
    .exports = Storage;