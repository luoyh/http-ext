$(() => {
    $('.send').click(evt => {
        layer.load();
        $('.CodeContainer').empty();
        if ('GET' == $('.api-method').val()) { // get
            doGet();
        } else { // post
            doPost();
        }
    });
    var doGet = () => {
        doSend('GET', '');
    };
    var doPost = () => {
        if ($('input[name="bodyOptions"]:checked').val()) { // raw
            doSend('POST', $('.body-raw-value').val());
        } else {
            let form = new FormData();
            $('.body-form-data .api-params').each((i, e) => {
                form.append($(e).find('.key').val(), $(e).find('.value').val());
            });
            doSend('POST', form);
        }
    };
    var doSend = (method, data) => {
        let headers = {};
        $('#header .api-params').each((i, e) => {
            if (/^[\w-]+$/.test($(e).find('.key').val())) {
                headers[$(e).find('.key').val()] = $(e).find('.value').val();
            }
        });
        if ($('input[name="bodyOptions"]:checked').val() && 'POST' == method && !headers['Content-Type']) {
            headers['Content-Type'] = $('.body-raw-content-type').val();
        }
        let params = '',
            url = $('#api_url').val();
        $('.params-body .api-params').each((i, e) => {
            if (/^[\w-]+$/.test($(e).find('.key').val())) {
                params = (i ? '&' : '') + $(e).find('.key').val() + '=' + encodeURI($(e).find('.value').val());
            }
        });
        url = /\?/.test(url) ? (url + '&' + params) : (url + '?' + params);
        let settings = {
            'url': url, // http://192.168.11.221:1111/GDDC/human/educationInfo
            'method': method,
            'headers': headers,
            'data': data,
            'timeout': 10000
        };
        $.ajax(settings).done(r => {
            fs(JSON.stringify(r));
        }).fail((xhr, status, err) => {
        	fs(xhr.responseText);
        	$('.CodeContainer').css('color', 'red');
        }).always(() => {
            layer.closeAll();
        });
    };
    var fs = r => {
        $('#RawJson').val(r);
        Process();
    };
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
        CollapseLevel($(evt.currentTarget).data('level'));
    });
    $(document).on('click', '.exp-img', (evt) => {
        ExpImgClicked(evt.currentTarget);
    });
    $('.params').click(() => {
        let $$ = $('.params-body'),
            hd = $$.data('hide');
        !hd ? $$.show() : $$.hide();
        $$.data('hide', !hd);
    });
    $('.plus').click((evt) => {
        $(['.params-body', '#header', '.body-form-data'][$(evt.currentTarget).data('plus')]).append(`<div class="form-group api-params">
						<div class="col-md-5">
							<input type="text" class="form-control key">
						</div>
						<div class="col-md-5">
							<input type="text" class="form-control value">
						</div>
						<div class="col-md-2">
							<button type="button" class="btn btn-warning minus"><span class="glyphicon glyphicon-minus"></span></button>
						</div>
					</div>`);
    });
    $(document).on('click', '.minus', (evt) => {
        $(evt.currentTarget).closest('.api-params').remove();
    });
    $('.api-method').change(evt => {
        if ($(evt.currentTarget).val() == 'GET') {
            $('.tab-body').addClass('disabled');
            $('.tab-header').tab('show');
        } else {
            $('.tab-body').removeClass('disabled');
        }
    });
    $('input[name="bodyOptions"]').change(evt => {
        if ($(evt.currentTarget).val() == 0) {
            $('.body-raw').hide();
            $('.body-form-data').show();
        } else {
            $('.body-raw').show();
            $('.body-form-data').hide();
        }
    });
});