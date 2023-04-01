const ads = require('../models/ad.model');
const getImageFileType = require('../utils/getImageFileType');

exports.getAll = async (req, res) => {
    try {
        res.json(await ads.find());
    } catch(err) {
        console.log(err);
        res.status(500).json({message: "wszystko co miało działać, nie działa!"})
    }
};

exports.getById = async (req, res) => { 
    try {
        const { id } = req.params;
        const found = await ads.findById(id);
        if(found) {
            console.log(found);
            res.json(found.toObject());
        }else {
            res.status(404).json({message: 'not found'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Błąd krytyczny.'});
    }

}

exports.search = async (req, res) => {

}

exports.post = async (req, res) => {
    try {
        const { title, content, date, price, location } = req.body; 
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        console.log(req.body);
        console.log('fileType', fileType);
        const image = req.file.fileName;
        if(title && content && date && req.file && ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].includes(fileType) && price && location) {
            const ad = new ads({title, content, date, image, price, location});
            await ad.save();
            res.json(ad);
        } else {
            res.status(400).json({message: 'Nie podałeś wszystkich wymaganych pól.'});
        } 
    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Błąd krytyczny.'});
    }
}

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const found = await ads.findById(id);
        if(found) {
            await ads.deleteOne({ _id: id }); //  await Test.deleteOne({ _id: entry._id });
            res.json({message: 'ok'});
        } else {
            res.status(404).json({message: 'not found'});
        }

    } catch(err) {
        console.log(err);
        res.status(500).json({message: 'Błąd krytyczny.'});
    }
}

exports.put = async (req, res) => {
    try {
        const { id } = req.params;
        const found = await ads.findById(id);
        if(found) {
            await ads.updateOne({_id: id}, req.body);
            res.json({message: 'ok'})
        }else {
            res.status(404).json({message: 'not found'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({message: 'Błąd krytyczny.'});
    }
}




