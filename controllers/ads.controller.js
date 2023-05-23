const ads = require('../models/ad.model');
const getImageFileType = require('../utils/getImageFileType');

exports.getAll = async (req, res) => {
    try {
        res.json(await ads.find());
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "wszystko co miało działać, nie działa!" })
    }
};

exports.getById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log('server id____', id);
        const found = await ads.findById(id);
        console.log('server id___2', id);
        if (found) {
            console.log(found);
            res.json(found.toObject());
        } else {
            res.status(404).json({ message: 'not found' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Błąd krytyczny.' });
    }


}

exports.search = async (req, res) => {
    try {
        const { searchPhrase } = req.params;
        //title, content, location
        const found = await ads.find({
            $or: [
                { title: { $regex: searchPhrase, $options: "i" } }, // 'i' for case-insensitive search
                { content: { $regex: searchPhrase, $options: "i" } },
                { location: { $regex: searchPhrase, $options: "i" } }
            ]
        })
        res.json(found);
        console.log(found);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Błąd krytyczny.' });
    }

}

exports.post = async (req, res) => {
    try {
        const { title, content, date, price, location } = req.body;
        const fileType = req.file.mimetype;
        console.log(req.body);
        console.log('fileType', fileType);
        const image = req.file.filename;
        console.log('-----------------image-------------------', image);
        if (
            title &&
            content &&
            date &&
            req.file &&
            ['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].includes(fileType) &&
            price &&
            location) {
            const ad = new ads({ title, content, date, image, price, location }); // new ads({....}) tworzenie modelu w bazie
            await ad.save();
            res.json(ad);
        } else {
            res.status(400).json({ message: 'Nie podałeś wszystkich wymaganych pól.' });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Błąd krytyczny.' });
    }
}

exports.delete = async (req, res) => {
    try {
        console.log('whole req params___', req.params);
        const { id } = req.params;
        console.log('server_delete_id___', JSON.stringify(id));
        const found = await ads.findById(id);
        console.log('server_delete_id___2', id);
        if (found) {
            await ads.deleteOne({ _id: id }); //  await Test.deleteOne({ _id: entry._id });
            res.json({ message: 'ok' });
        } else {
            res.status(404).json({ message: 'not found' });
        }

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Błąd krytyczny.' });
    }
}

exports.put = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content, date, price, location } = req.body;
        console.log('server_put_id___', id);
        const found = await ads.findById(id);
        console.log('server_put_id___', id);
        console.log('___found', found);
        if (found) {
            console.log('___title', title);
            console.log('___content', content);
            console.log('___date', date);
            console.log('___price', price);
            console.log('___location', location);
            console.log('___req.file', req.file);

            let image;

            if (!req.file) {
                image = found.image;
            } else {
                //const fileType = await getImageFileType(req.file);
                const fileType = req.file.mimetype;
                console.log('___filetype', fileType);
                if (['image/png', 'image/jpeg', 'image/gif', 'image/jpg'].includes(fileType)) {
                    image = req.file.filename;
                } else {
                    res.status(400).json({ error: 'Please provide filetype from one of above: png, jpg, gif' });
                    return;
                }
            }

            if (title && content && date && price && location) {
                console.log('___image', image);
                console.log('req.body!!!', req.body);
                const ad = { ...req.body, image };
                await ads.updateOne({ _id: id }, ad);
                res.json({ message: 'ok' })
            } else {
                res.status(400).json({ error: 'Please fill all the blanks' });
            }
        } else {
            res.status(404).json({ error: 'not found' });
        }
    } catch (err) {
        console.log('error krytyczny', err);
        res.status(500).json({ error: 'Błąd krytyczny.' });
    }
}




