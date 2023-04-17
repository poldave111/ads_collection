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
        const image = req.file.filename;
        console.log('-----------------image-------------------', image);
        if(title && content && date && req.file && ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].includes(fileType) && price && location) {
            const ad = new ads({title, content, date, image, price, location}); // new ads({....}) tworzenie modelu w bazie
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
        const { title, content, date, price, location } = req.body; 
        const found = await ads.findById(id);
        const fileType = req.file ? await getImageFileType(req.file) : 'unknown';
        const image = req.file.filename;

        if(found && title && content && date && req.file && ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].includes(fileType) && price && location) {
            console.log('req.body!!!', req.body);
            const ad = {...req.body, image};
            await ads.updateOne({_id: id}, ad);
            res.json({message: 'ok'})
        }else {
            res.status(404).json({message: 'not found'});
        }
    } catch (err) {
        console.log('error krytyczny', err);
        res.status(500).json({message: 'Błąd krytyczny.'});
    }
}




