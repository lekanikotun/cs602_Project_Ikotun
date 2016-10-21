var express = require('express');
var router = express.Router();
// var restrict = require('../auth/restrict');

router.get('/instructors', function(req, res) {
  var data = req.app.get('appData');
  var pagePhotos = [];
  var instructors = data.instructors;

  data.instructors.forEach(function(item) {
    pagePhotos = pagePhotos.concat(item.artwork);
  });

  res.render('instructors', {
    pageTitle: 'Instructors',
    artwork: pagePhotos,
    instructors: instructors,
    pageID: 'speakerList'
  });
});

router.get('/instructors/:instructorid', function(req, res) {
  var data = req.app.get('appData');
  var pagePhotos = [];
  var instructors = [];

  data.instructors.forEach(function(item) {
    if (item.shortname == req.params.speakerid) {
      instructors.push(item);
      pagePhotos = pagePhotos.concat(item.artwork);
    }
  });

  res.render('speakers', {
    pageTitle: 'Instructor Info',
    artwork: pagePhotos,
    instructors: instructors,
    pageID: 'speakerDetail'
  });
});

module.exports = router;
