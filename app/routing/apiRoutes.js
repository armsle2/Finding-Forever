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


        friends.forEach((results, index, arr) => {
            var totalDiff = [];
            var search = results.scores
            var name = results.name
            
            search.forEach((results, index, arr) => {
                var friendArr = results;
                var userArr = user.scores[index];
                var diff = Math.abs(friendArr - userArr);
                totalDiff.push(diff)
            })

            function getSum(total, num) {
                return total + num
            }
            results.totalDiff = totalDiff.reduce(getSum)
        })
        friends.sort(function(a, b) {
            return a.totalDiff - b.totalDiff;
        });
        var match = friends[0];
        console.log(friends)
        console.log('Your match is below!')
        console.log(match);
    });
}