var TiepNhanView = function(){
	
	var that = this;
	this.AppTitle = 'Tiếp nhận';
	this.oTable = null;
	this.oDialog = null;
	
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		that.clearForm();
	//	that.bindGrid01();
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
		that.clearForm();
		$('#selGroup').val(oAccount.groupid);
		$('#selUnit').val(oAccount.unitid);
		$('#selSex').val(oAccount.sex);
		$('#username').val(oAccount.username);
		$('#password').val(oAccount.password);
		$('#fullname').val(oAccount.fullname);
		$('#email').val(oAccount.email);
		$('#phone').val(oAccount.phone);
		$('#address').val(oAccount.address);
		$('#birthday').val(oAccount.birthday);
		$('#status').val(oAccount.status);
	}
	
	this.clearForm = function(){
		$('#selGroup').val(0);
		$('#selUnit').val(0);
		$('#selSex').val(0);
		$('#username').val('');
		$('#password').val('');
		$('#fullname').val('');
		$('#email').val('');
		$('#phone').val('');
		$('#address').val('');
		$('#birthday').val('');
		$('#status').val(1);
	}

	
	this.bindGrid01 = function(){
        that.oTable.clear().draw();
        var aRows = [];
        
        for (var i = 0; i < oAccount.LIST.length; i++) {
            var _item = oAccount.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + _item.id + '" />';
			var gioitinh = _item.sex == 0 ? 'Nữ' : 'Nam';
			var trangthai = _item.status==1?'<span class="label label-success">Kích hoạt</span>':'<span class="label label-danger">Khóa</span>';
			
            aRows.push([
				(i + 1) + _hidden,
				_item.group_name,
				_item.username,
				_item.fullname,
				gioitinh,
				_item.email,
				_item.phone,
				_item.address,
				_item.birthday,
				_item.registeddate,
				_item.activeddate,
				_item.lastlogin,
				_item.lastchangepass,
				_item.unit_name,
				trangthai
            ]);
        }
        that.oTable.rows.add(aRows).draw();
	}
	

	$(document).ready(function () {


		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oDialog = new PopupDialog(reload);
		that.initPage();

		function reload(){
			that.initPage();
		}

		$('.ACTIONS').on('click', '#btnThemBenhNhan', function () {
			that.oDialog.show('Thêm bệnh nhân', CONFIG_APP.URL.CONTEXT + '/app/letan/tiepnhan_benhnhan', '60%', '520');
		});

		$('.ACTIONS').on('click', '#btnDSThuTien', function () {
			that.oDialog.show('Danh sách thu tiền', CONFIG_APP.URL.CONTEXT + '/app/letan/tiepnhan_dsthutien', '60%', '400px');
		});

		$('.ACTIONS').on('click', '#btnTaoPhienKham', function () {
			that.oDialog.show('Tạo phiên khám',  CONFIG_APP.URL.CONTEXT +'/app/letan/tiepnhan_phienkham', '40%', '800px');
		});

		$('.ACTIONS').on('click', '#btnTTBenhNhan', function () {
			that.oDialog.show('Thông tin bệnh nhân',  CONFIG_APP.URL.CONTEXT +'/app/letan/tiepnhan_ttbenhnhan', '50%', '800px');
		});

		$('.ACTIONS').on('click', '#btnXemLsKham', function () {
			that.oDialog.show('Xem lịch sử khám',  CONFIG_APP.URL.CONTEXT +'/app/letan/tiepnhan_lichsukham', '70%', '500px');
		});

		$('.ACTIONS').on('click', '#btnDatLichHen', function () {
			that.oDialog.show('Đặt lịch hẹn khám lại',  CONFIG_APP.URL.CONTEXT +'/app/letan/tiepnhan_lichhen', '60%', '600px');
		});

		$('.ACTIONS').on('click', '#btnAccountRoles', function () {
			that.oDialog.show('Cấu hình Vai trò - Ứng dụng', '/patient/app/danhmuc/account_roles?id=' + oAccount.id, '60%', '800px');
		});
		 
		 $('.ACTIONS').on('click', '#btnCancel', function () {
			 that.initPage();
	     });
		 
		 $('.ACTIONS').on('click', '#btnSave', function () {
			 oAccount.code = $('#code').val();
			 oAccount.username = $('#username').val();
			 oAccount.password = $('#password').val();
			 oAccount.fullname = $('#fullname').val();
			 oAccount.email = $('#email').val();
			 oAccount.phone = $('#phone').val();
			 oAccount.address = $('#address').val();
			 oAccount.birthday = $('#birthday').val();
			 oAccount.code8 = $('#code8').val();
			 oAccount.code9 = $('#code9').val();
			 oAccount.code = $('#code').val();
			 oAccount.status = $('#status').val();
			 var rs = oAccount.save();
			 if(!rs.CODE){
				 that.initPage();
			 }
			 console.log(rs);
			 alert(rs.MESSAGE);
	     });
		 
		 $('.ACTIONS').on('click', '#btnDelete', function () {
			 if(!confirm(LABEL.VI.INFO_DELETE_CONFIRM)){return false;}
			 var rs = oAccount.del();
			 if(!rs.CODE){
				 that.initPage();
			 }
			 console.log(rs);
			 alert(rs.MESSAGE);
	     });
		 
		 $('.ACTIONS').on('click', '#btnAddNew', function () {
			that.clearForm();
			that.filterAction('ADD');
	     });
		 
		 $('.ACTIONS').on('click', '#btnEdit', function () {
			that.filterAction('EDIT');
		 });
		
		 $('#Grid01 tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
				that.clearForm();
				oAccount.id=0;
				that.filterAction('INIT');
            }
            else {
                that.oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var id = $(this).find('.rowID').val();
                oAccount.getById(id);
				that.bindForm();
				that.filterAction('SELECT');
	       }
	     });

	});
}