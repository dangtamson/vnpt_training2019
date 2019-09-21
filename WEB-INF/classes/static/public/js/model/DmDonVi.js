var DmDonVi = function(){
	var that = this;
	this.LIST = [];
	const URL = {
		GETALL:'dm_donvi/getall',
		SEARCH:'dm_donvi/search',
		GETBYID:'dm_donvi/getbyid',
		SAVE:'dm_donvi/save',
		DEL:'dm_donvi/del',
	}
	
	const LABEL={
		INVALID_MA:'Mã không hợp lệ',
		INVALID_TEN:'Tên không hợp lệ',
	}
	// Properties
	this.donviid = 0;
	this.ten = '';
	this.dienthoai = '';
	this.fax = '';
	this.diachi = '';
	this.ghichu = '';
	this.donvichaid = 0;
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
	
	this.getAll = function(){

	}

	this.getById = function(){
		var rs = DATA.get(URL.GETBYID,{donviid:that.donviid});
		var item = rs.RESULT[0];
		//console.log('getById',rs);
		this.donviid=item.donviid;
		this.ten=item.ten;
		this.dienthoai = item.dienthoai;
		this.fax = item.fax;
		this.diachi = item.diachi;
		this.ghichu=item.ghichu;
		this.createddate=item.createddate;
		this.updateddate=item.updateddate;
		this.createdby=item.createdby;
		this.updatedby=item.updatedby;
		this.status=item.status;
		this.donvichaid = item.donvichaid;
	}

	this.validSave = function(){
		var alert = '';

		if(that.donviid.length <1 ){
			alert += '(*) ' + LABEL.INVALID_MA + '<br/> ';
		}

		if(that.ten.length < 2){
			alert += '(*) ' +LABEL.INVALID_TEN + '<br/> ';
		}

		return alert;
	}

	this.save = function(){
		var data= {
			donviid: that.donviid,
			ten:that.ten,
			dienthoai:that.dienthoai,
			fax:that.fax,
			diachi:that.diachi,
			ghichu:that.ghichu,
			donvichaid:that.donvichaid,
			createddate:that.createddate,
			createdby:that.createdby,
			updateddate:that.updateddate,
			updatedby:that.updatedby,
			status:that.status
		}
		console.log(data);
		return  DATA.set(URL.SAVE,data);
	}

	this.del = function(){
		var data= {
			donviid: that.donviid
		}
		//console.log(data);
		return  DATA.set(URL.DEL,data);
	}

	this.bindSelect = function(sId){
		var html = '<option value="0">Không có</option>';
		that.search('');
		for (var i = 0; i < that.LIST.length; i++) {
			var item = that.LIST[i];
			html += "<option value='"+item.donviid+"''>"+item.ten+"</option>";
		}
		$(sId).html(html);
	}
}	