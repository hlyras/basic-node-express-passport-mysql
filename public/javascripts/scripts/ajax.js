$(function(){
	// Simple Ajax model
	$("#object-function-btn").on("click", function(event){
		$.ajax({
			url: '/object/function',
			method: 'post',
			data: {},
			success: function(response){
				
			}
		})
	});

	$("#object-function-btn").on("submit", function(event){
		$.ajax({
			url: '/object/function',
			method: 'post',
			data: {},
			success: function(response){
				
			}
		})
	});

	$("#object-function-btn").on("change", function(event){
		$.ajax({
			url: '/object/function',
			method: 'post',
			data: {},
			success: function(response){
				
			}
		})
	});
});