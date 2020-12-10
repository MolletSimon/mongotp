const main = require('../models/Main');

exports.getByDate = (req,res,next) => {
    main.find({date: req.params.date})
        .then((result) => res.status(200).json({result}))
        .catch(err => res.status(400).json(err))
}

exports.getByPaginate = (req, res, next) => {
    if (req.params.page) {
        if (req.params.page == 1) {
            if (req.params.sort == "asc") {
                main.find()
                .select('name date size analyse')
                .limit(10)
                .sort({name: 'asc'})
                .then(result => res.status(200).json({result}))
                .catch(err => res.status(400).json(err))
            } else if (req.params.sort == "desc") {
                console.log("desc")
                main.find()
                .select('name date size analyse')
                .limit(10)
                .sort({name: -1})
                .then(result => res.status(200).json({result}))
                .catch(err => res.status(400).json(err))
            }
            
        } else {
            if (req.params.sort == "asc") {
                let page = req.params.page - 1;
                main.find()
                .select('name date size analyse')
                .limit(10)
                .skip(page * 10)
                .sort({name: 'asc'})
                .then(result => res.status(200).json({result}))
                .catch(err => res.status(400).json(err))
            } else if (req.params.sort == "desc") {
                let page = req.params.page - 1;
                main.find()
                .select('name date size analyse')
                .limit(10)
                .skip(page * 10)
                .sort({name: -1})
                .then(result => res.status(200).json({result}))
                .catch(err => res.status(400).json(err))
            }
            
        }
    } else {
        res.status(400).json({message: 'No hay pajas'})
    }
}

exports.getOne = (req, res, next) => {
    main.findOne({_id: req.params.id})
        .then(result => res.status(200).json({result}))
        .catch(err => res.status(400).json(err));
}

exports.modify = (req, res, next) => {
    main.updateOne({_id: req.params.id}, {...req.body})
        .then(() => res.status(200).json({message: 'Composant Modifié !'}))
        .catch(error => res.status(400).json(error));
}

exports.delete = (req, res, next) => {
    main.deleteOne({_id: req.params.id})
        .then(() => res.status(200).json({ message: 'Composant supprimé' }))
        .catch(error => res.status(400).json(error));
}

exports.insert = (req, res, next) => {
    const component = new main({
        ...req.body
    });
    component.save()
        .then(() => res.status(201).json({component})
        .catch(error => res.status(400).json(error)));
}