var DmLoaiHang = function(){
	var that = this;
	this.LIST = [];
	const URL = {
		GETALL:'dm_loaihang/getall',
		SEARCH:'dm_loaihang/search',
		GETBYID:'dm_loaihang/getbyid',
		SAVE:'dm_loaihang/save',
		DEL:'dm_loaihang/del',
	}
	
	const LABEL={
		INVALID_MA:'Mã không hợp lệ',
		INVALID_TEN:'Tên không hợp lệ',
	}
	// Properties
	this.loaihangid = 0;
	this.ma = '';
	this.ten = '';
	this.trangthai = 1;
	this.createddate = null;
	this.updateddate = null;
	this.createdby = null;
	this.updatedby = null;

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
		var rs = DATA.get(URL.GETBYID,{loaihangid:that.loaihangid});
		var item = rs.RESULT[0];
		//console.log('getById',rs);
		this.loaihangid=item.loaihangid;
		this.ten=item.ten;
		this.ma = item.ma;
		this.ghichu=item.ghichu;
		this.trangthai = item.trangthai;
		this.createddate=item.createddate;
		this.updateddate=item.updateddate;
		this.createdby=item.createdby;
		this.updatedby=item.updatedby;
	}

	this.validSave = function(){
		var alert = '';

		if(that.loaihangid.length <1 ){
			alert += '(*) ' + LABEL.INVALID_MA + '<br/> ';
		}

		if(that.ten.length < 2){
			alert += '(*) ' +LABEL.INVALID_TEN + '<br/> ';
		}

		return alert;
	}

	this.save = function(){
		var data= {
			loaihangid: that.loaihangid,
			ma:that.ma,
			ten:that.ten,
			ghichu:that.ghichu,
			trangthai:that.trangthai,
			status:that.trangthai,
			createddate:that.createddate,
			createdby:that.createdby,
			updateddate:that.updateddate,
			updatedby:that.updatedby,
		}
		console.log(data);
		return  DATA.set(URL.SAVE,data);
	}

	this.del = function(){
		var data= {
			loaihangid: that.loaihangid
		}
		//console.log(data);
		return  DATA.set(URL.DEL,data);
	}

	this.bindSelect = function(sId){

	}
}	