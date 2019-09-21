var DmQuocGiaView = function(){
	
	var that = this;
	this.AppTitle = 'Danh mục chủng loại';
	this.oTable = null;
	this.oDialog = null;

	this.oDmQuocGia = new DmQuocGia();
	
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		that.search();
		that.clearForm();
		that.filterAction('INIT');
	}

	this.search = function(){
		that.oDmQuocGia.search('');
		that.oTable.clear().draw();
        var aRows = [];
		for (var i = 0; i < that.oDmQuocGia.LIST.length; i++) {
			var item = that.oDmQuocGia.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + item.quocgiaid + '" />';
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
		$('#ma').val(that.oDmQuocGia.ma);
		$('#ten').val(that.oDmQuocGia.ten);
		$('#ghichu').val(that.oDmQuocGia.ghichu);
		$('#trangthai').val(that.oDmQuocGia.trangthai);
	}

	this.clearForm = function(){
		that.oDmQuocGia.quocgiaid = 0;
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
		that.oDmQuocGia.ma = $('#ma').val();
		that.oDmQuocGia.ten = $('#ten').val();
		that.oDmQuocGia.ghichu = $('#ghichu').val();
		that.oDmQuocGia.trangthai = $('#trangthai').val();

		var strAlert = that.oDmQuocGia.validSave();
		if (!strAlert == '') {
			oAlert.show(strAlert, '40%', '50px');
			return false;
		}

		var rs = that.oDmQuocGia.save();
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
				that.oDmQuocGia.quocgiaid = id;
				that.oDmQuocGia.getById();
				that.bindForm();
		   }
		   return true;
		 });
		 
		 
		 $('.ACTIONS').on('click', '#btnDelete', function () {
			var oConfirm = new ConfirmDialog('Xác nhận xóa thông tin',ok,cancel);
			var oAlert = new AlertDialog('Thông báo');
			if (that.oDmQuocGia.quocgiaid == 0) {
				oAlert.show('Bạn chưa chọn mục cần xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = that.oDmQuocGia.del();
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