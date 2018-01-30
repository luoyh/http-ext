var isNumber = function(v) {
	return /^-?\d+(\.\d*)?$/.test(v);
};

var isInteger = function(v) {
	return /^-?\d+$/.test(v);
};

var isEmpty = function(v) {
	return v == null || v == undefined || v == '';
};

var isLetterOrInt = function(v) {
	return /^\w+$/.test(v);
};

var isEmptyObj = function(v) {
	if (isEmpty(v))
		return true;
	for ( var k in v)
		return false;
	return true;
};
// 判断是否为电话号码(座机或者手机)
var isMobile = function(v) {
	var reg = /^((([0-9]{3,4}-)?[0-9]{7,8})|(0|86|17951)?(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8})$/;
	return reg.test(v);
};
// 判断是否为手机号码
var isMobilePhone = function(v) {
	var reg = /^(13[0-9]|15[012356789]|17[013678]|18[0-9]|14[57])[0-9]{8}$/;
	return reg.test(v);
};

var isEMail = function(mail) {
	 var reg  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	 return reg.test(mail);
}

var isCardNo = function(cardNo) {
	var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
	return reg.test(cardNo);
}

// 只能是正整数
var isPositiveNumber = function(obj) {
	var inpVal = $(obj).val();
	var reg = /^[1-9]\d{0,7}$/;
	if(!reg.test(inpVal)){
		if(inpVal.length < 9){
			inpVal = inpVal.substring(0,inpVal.length-1);
		}else{
			inpVal = inpVal.substring(0,8);
		}
		$(obj).val(inpVal);
	}
};
var parseAvalon = function(obj) {
	return JSON.parse(JSON.stringify(obj));
};
var cache = [
             '',
             ' ',
             '  ',
             '   ',
             '    ',
             '     ',
             '      ',
             '       ',
             '        ',
             '         '
           ];
var leftPad = function(str, len, ch) {
	  // convert `str` to `string`
	  str = str + '';
	  // `len` is the `pad`'s length now
	  len = len - str.length;
	  // doesn't need to pad
	  if (len <= 0) return str;
	  // `ch` defaults to `' '`
	  if (!ch && ch !== 0) ch = ' ';
	  // convert `ch` to `string`
	  ch = ch + '';
	  // cache common use cases
	  if (ch === ' ' && len < 10) return cache[len] + str;
	  // `pad` starts with an empty string
	  var pad = '';
	  // loop
	  while (true) {
	    // add `ch` to `pad` if `len` is odd
	    if (len & 1) pad += ch;
	    // devide `len` by 2, ditch the fraction
	    len >>= 1;
	    // "double" the `ch` so this operation count grows logarithmically on
		// `len`
	    // each time `ch` is "doubled", the `len` would need to be "doubled" too
	    // similar to finding a value in binary search tree, hence O(log(n))
	    if (len) ch += ch;
	    // `len` is 0, exit the loop
	    else break;
	  }
	  // pad `str`!
	  return pad + str;
	};
// 500106 19930602 2126
function generatorIdentityCard() {
	var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];
	var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
	var year = Math.floor(Math.random()*200)+1900,
	    month = leftPad(Math.floor(Math.random()*12)+1, 2, 0),
	    day = leftPad(Math.floor(Math.random()*28)+1, 2, 0);
	var pre = Math.floor(Math.random()*800000)+100000;
	var card = pre + '' + year + '' + month + '' + day + '' + (Math.floor(Math.random()*800)+100);
	var arr = card.split('');
	var v = 0;
	for(var i = 0; i < 17; i ++) {
		v +=  Wi[i] * arr[i];
	}
	var v18 = ValideCode[v % 11];
	if(v18 == 10) {
		v18 = 'X';
	}
	return card + '' + v18;
}
function isTrueValidateCodeBy18IdCard(a_idCard) {
	var sum = 0;
	var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];
	var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];
	if (a_idCard[17].toLowerCase() == 'x') {
		a_idCard[17] = 10;
	}
	for (var i = 0; i < 17; i++) {
		sum += Wi[i] * a_idCard[i];
	}
	return a_idCard[17] == ValideCode[sum % 11];
}
function isValidityBrithBy18IdCard(idCard18) {
	var year = idCard18.substring(6, 10);
	var month = idCard18.substring(10, 12);
	var day = idCard18.substring(12, 14);
	var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
	if (temp_date.getFullYear() != parseFloat(year)
			|| temp_date.getMonth() != parseFloat(month) - 1
			|| temp_date.getDate() != parseFloat(day)) {
		return false;
	}
	return true;
}
function isValidityBrithBy15IdCard(idCard15) {
	var year = idCard15.substring(6, 8);
	var month = idCard15.substring(8, 10);
	var day = idCard15.substring(10, 12);
	var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
	if (temp_date.getYear() != parseFloat(year)
			|| temp_date.getMonth() != parseFloat(month) - 1
			|| temp_date.getDate() != parseFloat(day)) {
		return false;
	}
	return true;
}

var isChinaID = function(val) {
	if (isEmpty(val)) return false;
	return (function(idCard) {
		var len = idCard.length;
		return len != 15 && len != 18 ? false
				: (len == 15 ? isValidityBrithBy15IdCard(idCard)
				: (isValidityBrithBy18IdCard(idCard) && isTrueValidateCodeBy18IdCard(idCard.split(''))));
	})(trim(val));
};

var numAdd = function(num1, num2) {
	var baseNum, baseNum1, baseNum2;
	try {
		baseNum1 = num1.toString().split(".")[1].length;
	} catch (e) {
		baseNum1 = 0;
	}
	try {
		baseNum2 = num2.toString().split(".")[1].length;
	} catch (e) {
		baseNum2 = 0;
	}
	baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
	return (num1 * baseNum + num2 * baseNum) / baseNum;
};

var numSub = function(num1, num2) {
	var baseNum, baseNum1, baseNum2;
	var precision;// 精度
	try {
		baseNum1 = num1.toString().split(".")[1].length;
	} catch (e) {
		baseNum1 = 0;
	}
	try {
		baseNum2 = num2.toString().split(".")[1].length;
	} catch (e) {
		baseNum2 = 0;
	}
	baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
	precision = (baseNum1 >= baseNum2) ? baseNum1 : baseNum2;
	return ((num1 * baseNum - num2 * baseNum) / baseNum).toFixed(precision);
};

var numMulti = function(num1, num2) {
	var baseNum = 0;
	try {
		baseNum += num1.toString().split(".")[1].length;
	} catch (e) {
	}
	try {
		baseNum += num2.toString().split(".")[1].length;
	} catch (e) {
	}
	return Number(num1.toString().replace(".", "")) * Number(num2.toString().replace(".", "")) / Math.pow(10, baseNum);
};

var numDiv = function(num1, num2) {
	var baseNum1 = 0, baseNum2 = 0;
	var baseNum3, baseNum4;
	try {
		baseNum1 = num1.toString().split(".")[1].length;
	} catch (e) {
		baseNum1 = 0;
	}
	try {
		baseNum2 = num2.toString().split(".")[1].length;
	} catch (e) {
		baseNum2 = 0;
	}
	with (Math) {
		baseNum3 = Number(num1.toString().replace(".", ""));
		baseNum4 = Number(num2.toString().replace(".", ""));
		return (baseNum3 / baseNum4) * pow(10, baseNum2 - baseNum1);
	}
};

var getUrlParam = function(name) {
     var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if(r != null) {
    	 return decodeURI(r[2]); 
     }
     return null;
};