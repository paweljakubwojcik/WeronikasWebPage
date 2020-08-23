const fs = require('fs')
const path = require('path')

class Picture {
    /**
     * 
     * @param {string} name 
     */
    constructor(name) {
        {
            this.name = `${name.replace('.jpg', '')}`;
            this.alt = `to jest ${name}`;
            this.src = `Pictures/lazienka1/${name}`;
            this.preview = `Pictures/lazienka1/previews/${name}`;
        }
    }
}

class Folder {
    constructor(name, parentPath) {

        this.path = parentPath ? path.join(parentPath, name) : path.join(picturesDir, name);
        this.name = `${name}`;

        let childrens = fs.readdirSync(this.path)

        childrens.forEach(name => {
            let extension = path.extname(name);
            if (extension === '.jpg')
                this.pictures.push(new Picture(name))
            else if (name.toLowerCase() === 'previews')
                ;
            else if (extension === '')
                this.folders.push(new Folder(name, this.path))
        })
    }
    pictures = [];
    folders = []; //just in case ktoś stwierdzi że należy pogrupować te zdjęcia bardziej xd
}


let parentDir = path.dirname(__dirname)
let picturesDir = path.join(parentDir, 'pictures')
let folderNames = fs.readdirSync(picturesDir);

let folders = folderNames.map((folder) => new Folder(folder))
exports.pictures = folders;





