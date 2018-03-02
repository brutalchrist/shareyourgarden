/**
 * PersonController
 *
 * @description :: Server-side logic for managing people
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
    find: function(req, res) {
        var poligon = req.param('poligon');

        if (typeof poligon === 'undefined') {
            Persons.find().exec(function (error, result) {
                return res.json(result);
            });
        } else {
            try {
                var coordinates = JSON.parse(poligon);
            } catch(e) {
                res.status(409);
                return res.json({error: 'poligon: an array was expected'});
            }

            if (!Array.isArray(coordinates)) {
                res.status(409);
                return res.json({error: 'poligon: an array was expected'});
            }

            if (coordinates.length < 4) {
                res.status(409);
                return res.json({error: 'poligon: a minimum of 4 points was expected'});
            }

            var query = {
                'gardens.location': {
                    $geoWithin: {
                        $geometry: {
                            type: 'Polygon',
                            coordinates: [ coordinates ]
                        }
                    }
                }
            };

            Persons.find(query).exec(function (error, result) {
                console.log('result: ', result);
                console.log('error: ', error);
                if (error) {
                    res.status(error.status);
                    return res.json(error);
                }
                return res.json(result);
            });
        }
    }
};

