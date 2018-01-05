var friends = require('../data/friends');
var user = {
    name: 'John',
    age: 25,
    scores: [5, 5, 3, 2, 5, 4]
}

module.exports = function(app) {

    app.get('/api/friends', function(req, res) {
        res.json(friends)
    });

    app.post('/api/friends', function(req, res) {
        var userInterest = req.body.interest;
        var genderChoice = [];
        if (userInterest === 'both') {
            friends.forEach((results, index, arr) => {
                calculateTotalDiff(results, req);
            })
            findMatch(friends, res);
        } else {
            friends.forEach((results, index, arr) => {
                if (userInterest === results.gender) {

                    calculateTotalDiff(results, req);
                    genderChoice.push(results);

                }

            })
            findMatch(genderChoice, res)

        }

    });
};

function findMatch(arr, res) {
    arr.sort(function(a, b) {
        return a.totalDiff - b.totalDiff;
    });
    var match = arr[0];
    res.json(match);
}

function calculateTotalDiff(results, req) {
    var totalDiff = [];
    var search = results.scores
    var name = results.name

    search.forEach((results, index, arr) => {
        var userScores = parseFloat(req.body['scores[]'][index]);
        var diff = Math.abs(results - userScores);
        totalDiff.push(diff)
    })

    function getSum(total, num) {
        return total + num
    }
    results.totalDiff = totalDiff.reduce(getSum);
}