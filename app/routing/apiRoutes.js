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
        friends.forEach((results, index, arr) => {
        	if(userInterest === results.gender){

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
            results.totalDiff = totalDiff.reduce(getSum)
        	genderChoice.push(results)

        	}

        })
        genderChoice.sort(function(a, b) {
            return a.totalDiff - b.totalDiff;
        });
        var match = genderChoice[0];
        console.log(genderChoice);
        console.log('Your match is below!');
        console.log(match);
    	res.json(match);

    });
};