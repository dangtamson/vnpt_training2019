var DmChucVuView = function(){
	
	var that = this;
	this.AppTitle = 'Danh mục chức vụ';
	this.oTable = null;
	this.oDialog = null;

	this.oDmChucVu = new DmChucVu();
	
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		that.search();
		that.clearForm();
		that.filterAction('INIT');
	}

	this.search = function(){
		that.oDmChucVu.search('');
		that.oTable.clear().draw();
        var aRows = [];
		for (var i = 0; i < that.oDmChucVu.LIST.length; i++) {
			var item = that.oDmChucVu.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + item.chucvuid + '" />';
			var trangthai = item.trangthai == 1?'<span class="label label-success">Bật</span>':'<span class="label label-danger">Tắt</span>';
			aRows.push([
				(i + 1) + _hidden,
				item.ma,
				item.ten,
				item.ghichu,
				trangthai
            ]);
        }
        that.oTable.rows.add(aRows).draw();
	}

	this.bindForm = function(){
		$('#ma').val(that.oDmChucVu.ma);
		$('#ten').val(that.oDmChucVu.ten);
		$('#ghichu').val(that.oDmChucVu.ghichu);
		$('#trangthai').val(that.oDmChucVu.trangthai);
	}

	this.clearForm = function(){
		that.oDmChucVu.chucvuid = 0;
		$('#ma').val('');
		$('#ten').val('');
		$('#ghichu').val('');
		$('#trangthai').val(1);
	}

	this.filterAction = function(sState){
		switch (sState) {
			case 'INIT':
				ControlHelper.Input.enable(['#btnAddNew','#btnSave','#btnDelete','#btnCancel']);
				break;
			default:
				break;
		}
	}

	this.save = function(){
		var oAlert = new AlertDialog('Thông báo');
		that.oDmChucVu.ma = $('#ma').val();
		that.oDmChucVu.ten = $('#ten').val();
		that.oDmChucVu.ghichu = $('#ghichu').val();
		that.oDmChucVu.trangthai = $('#trangthai').val();

		var strAlert = that.oDmChucVu.validSave();
		if (!strAlert == '') {
			oAlert.show(strAlert, '40%', '50px');
			return false;
		}

		var rs = that.oDmChucVu.save();
		if (rs.CODE == 0) {
			oAlert.DialogTitle = 'Thông báo';
			that.search();
			that.clearForm();
		} else {
			oAlert.DialogTitle = 'Cảnh báo';
		}

		oAlert.show(rs.MESSAGE, '30%', '50px');
	}


	$(document).ready(function () {
		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oDialog = new PopupDialog(reload);
		that.initPage();

		function reload() {
			that.initPage();
		}


		$('.ACTIONS').on('click', '#btnAddNew', function () {
			that.initPage();
		});

		$('.ACTIONS').on('click', '#btnCancel', function () {
			that.initPage();
		});

		$('.ACTIONS').on('click', '#btnSave', function () {
			that.save();
		});

		
		 $('#Grid01 tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
				$(this).removeClass('selected');
				that.clearForm();
            }
            else {
                that.oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
				var id = $(this).find('.rowID').val();
				that.oDmChucVu.chucvuid = id;
				that.oDmChucVu.getById();
				that.bindForm();
		   }
		   return true;
		 });
		 
		 
		 $('.ACTIONS').on('click', '#btnDelete', function () {
			var oConfirm = new ConfirmDialog('Xác nhận xóa thông tin',ok,cancel);
			var oAlert = new AlertDialog('Thông báo');
			if (that.oDmChucVu.chucvuid == 0) {
				oAlert.show('Bạn chưa chọn mục cần xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = that.oDmChucVu.del();
				oAlert.show(rs.MESSAGE, '40%', '50px');
				that.search();
				that.clearForm();
            }

            function cancel() {}

            oConfirm.OkTitle = 'Xóa';
            oConfirm.CancelTitle = 'Giữ lại';
            oConfirm.show('Bạn có chắc chắn muốn xóa mục này không?');
			return false;
	     });

	});
}