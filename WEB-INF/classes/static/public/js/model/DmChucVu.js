var DmChucVu = function(){
	var that = this;
	this.LIST = [];
	const URL = {
		GETALL:'dm_chucvu/getall',
		SEARCH:'dm_chucvu/search',
		GETBYID:'dm_chucvu/getbyid',
		SAVE:'dm_chucvu/save',
		DEL:'dm_chucvu/del',
	}
	
	const LABEL={
		INVALID_MA:'Mã không hợp lệ',
		INVALID_TEN:'Tên không hợp lệ',
	}
	// Properties
	this.chucvuid = 0;
	this.ma = '';
	this.ten = '';
	this.ghichu = '';
	this.trangthai = 1;
	this.createddate = null;
	this.updateddate = null;
	this.createdby = null;
	this.updatedby = null;
	this.status = 1;

	// Thuộc tính mở rộng

	// Methods
	this.search = function(sKey){
		var rs = DATA.get(URL.SEARCH,{key:sKey});
		console.log('rs',rs);
		that.LIST = rs.RESULT;
	}
	
	this.getAll = function(){}

	this.getById = function(){
		var rs = DATA.get(URL.GETBYID,{chucvuid:that.chucvuid});
		var item = rs.RESULT[0];
		//console.log('getById',rs);
		this.chucvuid=item.chucvuid;
		this.ma=item.ma;
		this.ten=item.ten;
		this.ghichu=item.ghichu;
		this.trangthai=item.trangthai;
		this.createddate=item.createddate;
		this.updateddate=item.updateddate;
		this.createdby=item.createdby;
		this.updatedby=item.updatedby;
		this.status=item.status;
	}

	this.validSave = function(){
		var alert = '';

		if(that.ma.length <1 ){
			alert += '(*) ' + LABEL.INVALID_MA + '<br/> ';
		}

		if(that.ten.length < 2){
			alert += '(*) ' +LABEL.INVALID_TEN + '<br/> ';
		}

		return alert;
	}

	this.save = function(){
		var data= {
			chucvuid: that.chucvuid,
			ma:that.ma,
			ten:that.ten,
			ghichu:that.ghichu,
			trangthai:that.trangthai,
			createddate:that.createddate,
			createdby:that.createdby,
			updateddate:that.updateddate,
			updatedby:that.updatedby,
			status:that.status
		}
		//console.log(data);
		return  DATA.set(URL.SAVE,data);
	}

	this.del = function(){
		var data= {
			chucvuid: that.chucvuid
		}
		//console.log(data);
		return  DATA.set(URL.DEL,data);
	}

	this.bindSelect = function(sId){
		var html = '<option value="0">Không có</option>';
		that.search('');
		for (var i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html += "<option value='"+item.chucvuid+"''>"+item.ten+"</option>";
		}
		$(sId).html(html);
	}
}	