$(() => {
	$('#btnnn').click(() => {
		
		$.get('http://192.168.11.221:1111/GDDC/human/educationInfo',r => {
			$('#RawJson').val(JSON.stringify(r));
			Process();
		});

	});

	$('#TabSize').change(() => {
		TabSizeChanged();
	});
	$('#QuoteKeys').click(() => {
		QuoteKeysClicked();
	});
	$('#chooise_all').click(() => {
		SelectAllClicked();
	});
	$('#CollapsibleView').click(() => {
		CollapsibleViewClicked();
	});
	$('#expand').click(() => {
		ExpandAllClicked();
	});
	$('#collapse').click(() => {
		CollapseAllClicked();
	});
	$('.collapse-level').click((evt) => {
		CollapseLevel($(evt.target).data('level'));
	});
	$(document).on('click', '.exp-img', (evt) => {
		ExpImgClicked(evt.target);
	});

	$('.params').click(() => {
		let $$ = $('.params-body'),
			hd = $$.data('hide');
		!hd ? $$.show() : $$.hide();
		$$.data('hide', !hd);
	});
	$('.plus-header').click(evt => {
		$('#header').append(`<div class="form-group api-params">
						<div class="col-md-5">
							<input type="text" class="form-control">
						</div>
						<div class="col-md-5">
							<input type="text" class="form-control">
						</div>
						<div class="col-md-2">
							<button type="button" class="btn btn-warning minus"><span class="glyphicon glyphicon-minus"></span></button>
						</div>
					</div>`);
	});
	$('.plus').click((evt) => {
		$('.params-body').append(`<div class="form-group api-params">
						<div class="col-md-5">
							<input type="text" class="form-control">
						</div>
						<div class="col-md-5">
							<input type="text" class="form-control">
						</div>
						<div class="col-md-2">
							<button type="button" class="btn btn-warning minus"><span class="glyphicon glyphicon-minus"></span></button>
						</div>
					</div>`);
	});
	$(document).on('click', '.minus', (evt) => {
		$(evt.target).closest('.api-params').remove();
	});
	$('.api-method').change(evt => {
		if ($(evt.target).val() == 'GET') {
			$('.tab-body').addClass('disabled');
			$('.tab-header').tab('show');
		} else {
			$('.tab-body').removeClass('disabled');
		}
	});
});