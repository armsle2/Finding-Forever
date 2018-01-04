$(document).ready(function(){

var bounceIn = 'bounceInDown';
	var bounce = 'bounce';
	var pulse = 'pulse';
	var animateInfinite = '-webkit-animation-iteration-count';
	var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	$(document).one(animationEnd, function(){
		$('#heart-text').css('display', 'block').addClass('fadeIn');
		animation();
	})
function animation(){
	var bounceStart = 
		setInterval(function(){
			$('.heart-sect').addClass(bounce);}, 2000);
	var bounceEnd = 
		setInterval(function(){
			$('.heart-sect').removeClass(bounce);}, 4000);
	function pulseOn(){
		$(this).removeClass(bounceIn);
		clearInterval(bounceStart);
		clearInterval(bounceEnd);
		$('.heart-sect').addClass(pulse);
		$('.heart-sect').css(animateInfinite, 'infinite');
	}
	function pulseOff(){
		$('.heart-sect').removeClass(pulse);
		$('.heart-sect').css(animateInfinite, '');
		bounceStart = setInterval(function(){
			$('.heart-sect').addClass(bounce);}, 2000);
		bounceEnd = 
		setInterval(function(){
			$('.heart-sect').removeClass(bounce);}, 4000);
	}
	$('#heart').hover(pulseOn, pulseOff);
	$('#heart-text').hover(pulseOn, pulseOff);
	$('#saveForm').on('click', function(){
		alert('you clicked me?!')
	})
}


$('#submit').on('click', function(event){
		event.preventDefault();
		var q1 = parseFloat($('#question-1').val());
		var q2 = parseFloat($('#question-2').val());
		var q3 = parseFloat($('#question-3').val());
		var q4 = parseFloat($('#question-4').val());
		var q5 = parseFloat($('#question-5').val());
		var q6 = parseFloat($('#question-6').val());
		var userName = $('#userName').val();
		var userInterest = $('#userInterest').val();
		var userScore = {
			name: userName,
			interest: userInterest,
			scores: [q1, q2, q3, q4, q5, q6]
		};
		function checkSubmission(score){
			return score > 0;
		}
		console.log(userName);
		console.log(userInterest);
		console.log(userScore.scores.every(checkSubmission))
		if (userName === ''|| userInterest === 'Choose Interest'){
			console.log('you missed something');
		}else if (!userScore.scores.every(checkSubmission)){
			console.log('you missed one');
		}else{
			console.log(userScore);

			$.post('/api/friends', userScore, function(data){
					if(data){
						alert('Please wait while we find your match! :)')
					}
				
				}).then(function(data){
					console.log(data);
					var matchPic = `<img class="modal-img" src='${data.photo}'>`;
					var matchName = data.name;
					$('.modal-body').html(matchPic);
					$('#modal-subtitle').html(`Meet ${matchName}`);
					$('#myModal').modal('toggle');

				});
		}

	});

})
