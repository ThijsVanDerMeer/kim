

	var Mat = {
		model: {
			color: {
				focus: '#1565c0',
				blur: '#CCC'
			}
		},
		view: {
			input: {
				focus: function() {
					var input_ = $(this);
					var inputWrapper_ = input_.closest('.input-wrapper');
					var span_ = inputWrapper_.find('span.label');
					var line_ = inputWrapper_.find('.line');
					
					TweenMax.killTweensOf([line_, span_]);

					TweenMax.to(line_, 0.4, {backgroundColor: Mat.model.color.focus});
					TweenMax.to(span_, 0.15, {color: Mat.model.color.focus, top: 5, fontSize: '12px'});

				},
				blur: function() {
					var input_ = $(this);
					var inputWrapper_ = input_.closest('.input-wrapper');
					var span_ = inputWrapper_.find('span.label');
					var line_ = inputWrapper_.find('.line');										

					TweenMax.killTweensOf([line_, span_]);

					var pos = ( (input_.val().length) > 0 ? {top: 5, fontSize: '12px'} : {top: 30, fontSize: '16px'});

					TweenMax.to(line_, 0.4, {backgroundColor: Mat.model.color.blur});
					TweenMax.to(span_, 0.15, {color: Mat.model.color.blur, fontSize: pos.fontSize, top: pos.top});
				},
				updateAll: function() {

					$(".input-wrapper input").each(function(){

						$(this).trigger('blur');

					});

				}
			},
			newNotification: {
				mouseOver: function() {

					var newNotification = $("#new-notification");
					TweenMax.killTweensOf(newNotification);

					TweenMax.to(newNotification, 0.4, {scale: 1.2, backgroundColor: '#1565c0'});

				},
				mouseOut: function() {

					var newNotification = $("#new-notification");
					TweenMax.killTweensOf(newNotification);

					TweenMax.to(newNotification, 0.2, {scale: 1, backgroundColor: '#ff9c00'});

				}
			},
			oldTable: {
				mouseOver: function() {
					var this_ = $(this);
					var newAlerts = $(".current-alerts .table");

					TweenMax.killTweensOf([this_, newAlerts]);
					TweenMax.to(this_, 0.3, { opacity: 1 });
					// TweenMax.to(newAlerts, 0.3, { opacity: 0.7 });


					

				},
				mouseOut: function() {
					var this_ = $(this);
					var newAlerts = $(".current-alerts .table");

					TweenMax.killTweensOf([this_, newAlerts]);
					TweenMax.to(this_, 0.3, { opacity: 0.7 });	
					// TweenMax.to(newAlerts, 0.3, { opacity: 1 });
				}
			},
			bubble: {
				mouseOver: function() {
					var this_ = $(this);
					var longText = this_.parent().find('.long-description-text');

					TweenMax.killTweensOf(longText);
					TweenMax.set(longText, {display: 'block', scale: 0, opacity: 0});
					TweenMax.to(longText, 0.2, {opacity: 1, scale: 1});

				},
				mouseOut: function() {
					var this_ = $(this);
					var longText = this_.parent().find('.long-description-text');

					TweenMax.killTweensOf(longText);
					
					function completeHide() {
						TweenMax.set(longText, {display: 'none'});
					}

					TweenMax.to(longText, 0.2, {opacity: 0, scale: 0, onComplete:completeHide, onCompleteParams:[]});

				}
			}
		},
		controller: {
			init: function() {
				Mat.controller.events();
			},
			events: function() {
				$(document).on('focus', '.input-wrapper input', Mat.view.input.focus);
				$(document).on('blur', '.input-wrapper input', Mat.view.input.blur);								
				$(document).on('mouseover', '#new-notification', Mat.view.newNotification.mouseOver);
				$(document).on('mouseout', '#new-notification', Mat.view.newNotification.mouseOut);
				$(document).on('mouseover', '.old-alerts .table', Mat.view.oldTable.mouseOver);
				$(document).on('mouseout', '.old-alerts .table', Mat.view.oldTable.mouseOut);
				$(document).on('mouseover', '.bubble', Mat.view.bubble.mouseOver);
				$(document).on('mouseout', '.bubble', Mat.view.bubble.mouseOut);				
			}
		}
	}

	$(document).ready(Mat.controller.init);