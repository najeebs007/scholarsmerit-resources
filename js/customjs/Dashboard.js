/**
 * 
 */

function loadProfileData() {
	var l_map = {};
	l_map.login = true;
	ajaxWithJSON("/tutor-personal", l_map, 'POST', function(response) {
		var l_data = response.object;
		// alert(JSON.stringify(response));
		if (response.status == 'SUCCESS') {
			debugger;
			if (!(l_data == null || l_data == undefined)) {
				if ('profile_image' in l_data) {
					var img = l_data.profile_image;
					if (!(img == null || img == undefined)) {
						$('img#profileImg').attr('src', img);
					}
				}
				if ('profile_cover' in l_data) {
					var img = l_data.profile_cover;
					if (!(img == null || img == undefined)) {
						$("#coverImg").css("background-image", "img")
						// $('img#coverImg').attr('src', img);
					}
				}
				if ('userName' in l_data) {
					var userName = l_data.userName;
					if (!(userName == null || userName == undefined)) {
						$('.c_user__name').text(userName);
					}
				}
				// alert(JSON.stringify(l_data.user));
				if ('user' in l_data) {
					var user_data = l_data.user;
					// alert(user_data);
					$('.c_display_name').text(user_data[0]);
					$('.c_phone').text(user_data[1]);

				}
			}
		}
		if (response.status == 'ERROR') {
			console.log(response.message);
		}
	});
}
function loadTutorGeneral() {
	var l_map = {};
	l_map.login = true;
	ajaxWithJSON("/tutor-general-info", l_map, 'POST', function(response) {
		var l_data = response.object;
		var l_general = l_data.tutorGeneral;
		// alert(JSON.stringify(l_general));
		if (response.status == 'SUCCESS') {
			if(!(l_general.specialities == null || l_general.specialities== undefined ))
			$('.c_specialty').text(l_general.specialities);
		}
		if (response.status == 'ERROR') {
			console.log(response.message);
		}
	});
}
function loadSocialData() {
	var l_map = {};
	l_map.login = true;
	ajaxWithJSON(
			"/tutor-social",
			l_map,
			'POST',
			function(response) {
				var l_data = response.object;
				// alert(JSON.stringify(response));
				if (response.status == 'SUCCESS') {
					$('#i_social').html('');
					var b_list = l_data.data;
					for (var i = 0; i < b_list.length; i++) {
						var b_map = b_list[i];
						var b_html = "";
						b_html += '<a href="' + b_map.link
								+ '" target="_blank">';
						b_html += '<div class="social-icon">';
						if (b_map.socialName == 'facebook') {
							b_html += '<i class="fa fa-facebook-f" style="color: #4867aa;"></i>';
						}
						if (b_map.socialName == 'twitter') {
							b_html += '<i class="fa fa-twitter" style="color: #4867aa;"></i>';
						}
						b_html += '</div>';
						b_html += '</a>';
						$('#i_social').append(b_html);
					}
				}
				if (response.status == 'ERROR') {
					console.log(response.message);
				}
			});
}

function loadTutorStatistics() {

	var l_map = {};
	l_map.login = true;
	ajaxWithJSON("/tutor-statistics", l_map, 'POST', function(response) {
		var l_data = response.object;
		if (response.status == 'SUCCESS') {
			$('.c_visitor').text(l_data.visitor + " Visitors Today");
			$('.c_batches_count').text(l_data.batches);
			$('.c_registration').text(l_data.registrations);
		}
		if (response.status == 'ERROR') {
			console.log(response.message);
		}
	});
}

function loadBatchData() {

	var l_map = {};
	l_map.login = true;
	l_map.top = true;
	ajaxWithJSON(
			"/tutor-batches",
			l_map,
			'POST',
			function(response) {
				var l_data = response.object;
				if (response.status == 'SUCCESS') {
					var b_html = "";
					$('.c_batches').html("");
					for (var i = 0; i < l_data.length; i++) {
						var b_map = l_data[i];

						b_html += '<div class="col-lg-12">';
						b_html += '<div class="row">';
						b_html += '<div class="col-xl-1 col-lg-1 col-md-1 col-sm-1 col-xs-1">';
						b_html += '<img src="resources/img/ico/icon-d.png" alt="batches-icon" width="24px">';
						b_html += '</div>';
						b_html += '<div class="col-xl-11 col-lg-11 col-md-11 col-sm-11 col-xs-11 m-t-2">';
						b_html += '<div class="row">';
						b_html += '<div class="col-lg-12 m-t-minus-5"> <span class="pro-text">'
								+ b_map.batchName + '</span></div>';
						b_html += '<div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12 m-t-minus-5">';
						b_html += '<span class="pro-heading m-10" style="margin-left:0px;"><i class="fa fa-dot-circle-o m-r-5" aria-hidden="true"></i>batchMode : '
								+ b_map.batchMode + '</span>';
						b_html += '<span class="pro-heading m-10"><i class="fa fa-dot-circle-o m-r-5" aria-hidden="true"></i>Fees : &#x20B9;  '
								+ b_map.feeAmount + '</span>';
						b_html += '<span class="pro-heading m-10"><i class="fa fa-dot-circle-o m-r-5" aria-hidden="true"></i>Status : '
								+ b_map.status + '</span>';
						b_html += '<span class="pro-heading m-10"><i class="fa fa-dot-circle-o m-r-5" aria-hidden="true"></i>Timing : '
								+ b_map.batchStartTime
								+ b_map.batchStartTimeAMPM
								+ '-'
								+ b_map.batchEndTime
								+ b_map.batchEndTimeAMPM
								+ '</span>';
						b_html += '</div>';
						b_html += '</div>';
						b_html += '</div>';
						b_html += '<div class="col-lg-12"><hr class="hr-dashboard"></div>';
						b_html += '</div>';
						b_html += '</div>';

					}
					$('.c_batches').html(b_html);
				}
				if (response.status == 'ERROR') {
					console.log(response.message);
				}
			});
}

function loadGraphData() {
	debugger;

	var l_map = {};
	l_map.login = true;

	ajaxWithJSON("/tutor-dashboard-graph", l_map, 'POST', function(response) {

		var categories = [];
		var nonPaidData = [];
		var paidData = [];
		var l_data = response.object;
		if (response.status == 'SUCCESS') {
			for (var i = 0; i < l_data.length; i++) {
				var b_map = l_data[i];

				categories.push(b_map.batchName);
				paidData.push(b_map.paid);
				nonPaidData.push((b_map.totalSeats) - (b_map.paid));
			}
			prepareGraph(categories, paidData, nonPaidData);

			// alert(JSON.stringify(l_data));
		}
		if (response.status == 'ERROR') {
			console.log(response.message);
		}
	});
	function prepareGraph(p_categories, paidData, nonPaidData) {

		Highcharts.chart('container', {
			chart : {
				type : 'column',
				width : 500
			},
			title : {
				text : ''
			},
			subtitle : {
				text : ''
			},
			xAxis : {
				categories : p_categories,
				title : {
					text : 'Batches'
				},

			},
			plotOptions : {
				series : {
					colorByPoint : true
				}
			},
			yAxis : {
				lineColor : '#66666661',
				lineWidth : 1,
				tickColor : '#66666661',
				tickWidth : 1,
				tickLength : 3,
				gridLineColor : '#66666661',
				min : 0,
				max : 450,
				tickInterval : 50,
				title : {
					text : 'Students',
					align : 'high'
				},
				labels : {
					overflow : 'justify'
				}
			},
			tooltip : {
				valueSuffix : ' '
			},
			plotOptions : {
				bar : {
					dataLabels : {
						enabled : true
					}
				}
			},
			legend : {
				enabled : false,
			},
			credits : {
				enabled : false
			},
			series : [ {
				name : 'Non Paid',
				color : '#1190e8',
				data : nonPaidData
			}, {
				name : 'Paid',
				color : '#ec7d31',
				data : paidData
			} ]

		});

	}

}
// for full calendar js
function loadCalendar() {
	
	$(".fc-week").hide();
	$('#calendar').fullCalendar({
		nowIndicator : true,
		header : {
			title : 'H',
			left : 'title',
			right : 'agendaDay,agendaWeek,month'
		},
		defaultView : 'agendaDay',
		navLinks : true, // can click day/week names to navigate views
		editable : true,
		eventLimit : true, // allow "more" link when too many events

	});

	$(".fc-corner-right").click(function() {
		$(".fc-week").show();
	});

	$(".fc-corner-left").click(function() {
		$(".fc-week").hide();
	});

}

function loadRequestsData() {debugger;

	var l_map = {};
	l_map.login = true;
	ajaxWithJSON(
			"/tutor-dashboard-requests",
			l_map,
			'POST',
			function(response) {
				var l_data = response.object;
                var l_other = response.other;
				//alert(JSON.stringify(response));
				if (response.status == 'SUCCESS') {
					$('.c_count_request').text("Tuition Request("+l_other+")");
					
					for (var i = 0; i < l_data.length; i++) {
						var b_map = l_data[i];
						alert(b_map);
						var b_request = b_map.request;
						alert(b_request);
						alert(b_map.displayName);
						var l_html = "";
						l_html += '<tr>';
						l_html += '<td><img src="resources/img/profile-img/pro.jpg" alt="nature" class="proImg-tbl"></td>';
						l_html += '<td class="td-dashboard">'
								+ b_map.displayName + '</td>';
						l_html += '<td class="td-dashboard">Request for : '
								+ b_map.batch + '</td>';
						
							    if(b_request.remarks == null){
							    	l_html += '<td class="td-dashboard">No Information</td>';
							    }else
							    	l_html += '<td class="td-dashboard">'+ b_request.remarks + '</td>';
						l_html += '<td class="td-dashboard">'
								+ b_map.date + '</td>';
						l_html += '<td>';
						l_html += '<button type="button" class="btn btn-green" onclick="acceptRequest()">Accept</button>';
						l_html += '<button type="button" class="btn btn-red" onclick="rejectRequest()">Reject</button>';
						l_html += '<button type="button" class="btn btn-yellow" onclick="suggestRequest()">Suggest</button>';
						l_html += '</td>';
						l_html += '</tr>';
						$('.c_requests').append(l_html);
					}

				}
				if (response.status == 'ERROR') {
					console.log(response.message);
				}
			});
}
