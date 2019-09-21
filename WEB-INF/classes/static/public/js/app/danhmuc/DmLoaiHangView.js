var DmLoaiHangView = function(){
	
	var that = this;
	this.AppTitle = 'Danh mục chủng loại';
	this.oTable = null;
	this.oDialog = null;

	this.oDmLoaiHang = new DmLoaiHang();
	
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		that.search();
		that.clearForm();
		that.filterAction('INIT');
	}

	this.search = function(){
		that.oDmLoaiHang.search('');
		that.oTable.clear().draw();
        var aRows = [];
		for (var i = 0; i < that.oDmLoaiHang.LIST.length; i++) {
			var item = that.oDmLoaiHang.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + item.loaihangid + '" />';
			var trangthai = item.trangthai == 1?'<span class="label label-success">Hoạt động</span>':'<span class="label label-danger">Khóa</span>';
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
		$('#ma').val(that.oDmLoaiHang.ma);
		$('#ten').val(that.oDmLoaiHang.ten);
		$('#ghichu').val(that.oDmLoaiHang.ghichu);
		$('#trangthai').val(that.oDmLoaiHang.trangthai);
	}

	this.clearForm = function(){
		that.oDmLoaiHang.loaihangid = 0;
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
		that.oDmLoaiHang.ma = $('#ma').val();
		that.oDmLoaiHang.ten = $('#ten').val();
		that.oDmLoaiHang.ghichu = $('#ghichu').val();
		that.oDmLoaiHang.trangthai = $('#trangthai').val();

		var strAlert = that.oDmLoaiHang.validSave();
		if (!strAlert == '') {
			oAlert.show(strAlert, '40%', '50px');
			return false;
		}

		var rs = that.oDmLoaiHang.save();
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
				that.oDmLoaiHang.loaihangid = id;
				that.oDmLoaiHang.getById();
				that.bindForm();
		   }
		   return true;
		 });
		 
		 
		 $('.ACTIONS').on('click', '#btnDelete', function () {
			var oConfirm = new ConfirmDialog('Xác nhận xóa thông tin',ok,cancel);
			var oAlert = new AlertDialog('Thông báo');
			if (that.oDmLoaiHang.loaihangid == 0) {
				oAlert.show('Bạn chưa chọn mục cần xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = that.oDmLoaiHang.del();
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