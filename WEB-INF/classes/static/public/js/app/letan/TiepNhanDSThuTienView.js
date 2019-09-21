var TiepNhanDSThuTienView = function(){
	
	var that = this;
	this.AppTitle = 'Danh sách thu tiền';
	this.oTable = null;
	this.oDialog = null;
	
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		that.clearForm();
		that.filterAction('INIT');
	}
	
	this.filterAction = function(sState){
		switch (sState) {
			case 'INIT':
				ControlHelper.Input.disable(['#btnEdit','#btnSave','#btnDelete','#btnAccountApp','#btnAccountRoles','#btnCancel']);
				ControlHelper.Input.disable(['#selGroup','#username','#password','#fullname','#selSex','#email','#phone','#address','#birthday','#selUnit','#status']);
				ControlHelper.Input.enable(['#btnAddNew']);
				break;
			case 'ADD':
				ControlHelper.Input.disable(['#btnEdit','#btnDelete','#btnAddNew','#btnAccountApp','#btnAccountRoles']);
				ControlHelper.Input.enable(['#selGroup','#username','#password','#fullname','#selSex','#email','#phone','#address','#birthday','#selUnit','#status']);
				ControlHelper.Input.enable(['#btnSave','#btnCancel']);
				break;
			case 'SELECT':
				ControlHelper.Input.disable(['#btnAddNew']);
				ControlHelper.Input.enable(['#btnEdit','#btnCancel','#btnDelete','#btnAccountApp','#btnAccountRoles']);
				break;
			case 'EDIT':
				ControlHelper.Input.disable(['#btnEdit','#btnAddNew']);
				ControlHelper.Input.enable(['#selGroup','#fullname','#selSex','#email','#phone','#address','#birthday','#selUnit','#status']);
				ControlHelper.Input.enable(['#btnSave','#btnCancel','#btnDelete','#btnAccountApp','#btnAccountRoles']);
				break;
			default:
				break;
		}
	}
	
	
	this.bindForm = function(){
	
	}
	
	this.clearForm = function(){
	
	}

	

	$(function() {


		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		// that.oDialog = new PopupDialog(reload);
		that.initPage();

		function reload(){
			that.initPage();
		}
	});
}