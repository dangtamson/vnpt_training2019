var DmNhanVien = function(){
	var that = this;
	this.LIST = [];
	const URL = {
		GETALL:'dm_nhanvien/getby_chucvuid',
		SEARCH:'dm_nhanvien/search',
		GETBYID:'dm_nhanvien/getbyid',
		SAVE:'dm_nhanvien/save',
		DEL:'dm_nhanvien/del',
	}
	
	const LABEL={
		INVALID_MA:'Mã không hợp lệ',
		INVALID_TEN:'Tên không hợp lệ',
	}
	// Properties
	this.nhanvienid = 0;
	this.ma='';
	this.ten = '';
	this.ngaysinh = '';
	this.gioitinh = 0;
	this.ghichu = '';
	this.donviid = 0;
	this.chucvuid = 0;
	this.createddate = null;
	this.updateddate = null;
	this.createdby = null;
	this.updatedby = null;
	this.trangthai = 1;
	this.status = 1;

	// Thuộc tính mở rộng

	// Methods
	this.search = function(sKey){
		var rs = DATA.get(URL.SEARCH,{key:sKey});
		console.log('rs',rs);
		that.LIST = rs.RESULT;
	}
	
	this.getAll = function(){
		var rs = DATA.get(URL.GETALL);
		that.LIST = rs.RESULT;
	}

	this.getById = function(){
		var rs = DATA.get(URL.GETBYID,{nhanvienid:that.nhanvienid});
		var item = rs.RESULT[0];
		//console.log('getById',rs);
		this.nhanvienid=item.nhanvienid;
		this.ma = item.ma;
		this.ten=item.ten;
		this.donviid = item.donviid;
		this.chucvuid = item.chucvuid;
		this.ngaysinh = item.ngaysinh;
		this.gioitinh = item.gioitinh;
		this.ghichu=item.ghichu;
		this.createddate=item.createddate;
		this.updateddate=item.updateddate;
		this.createdby=item.createdby;
		this.updatedby=item.updatedby;
		this.trangthai = item.trangthai;
		this.status = item.status;
	}

	this.validSave = function(){
		var alert = '';

		if(that.nhanvienid.length <1 ){
			alert += '(*) ' + LABEL.INVALID_MA + '<br/> ';
		}

		if(that.ten.length < 2){
			alert += '(*) ' +LABEL.INVALID_TEN + '<br/> ';
		}

		return alert;
	}

	this.save = function(){
		var ns = new Date(that.ngaysinh);
		console.log(ns.getMonth());
		var data= {
			nhanvienid: that.nhanvienid,
			ma:that.ma,
			ten:that.ten,
			donviid:that.donviid,
			chucvuid:that.chucvuid,
			ngaysinh:ns.toString("YYYY/MM/DD"),
			gioitinh:that.gioitinh,
			ghichu:that.ghichu,
			trangthai:that.trangthai,
			createddate:that.createddate,
			createdby:that.createdby,
			updateddate:that.updateddate,
			updatedby:that.updatedby,
			status:that.trangthai
		}
		console.log(data);
		return  DATA.set(URL.SAVE,data);
	}

	this.del = function(){
		var data= {
			nhanvienid: that.nhanvienid
		}
		//console.log(data);
		return  DATA.set(URL.DEL,data);
	}

	this.bindSelect = function(sId){
		
	}
}	