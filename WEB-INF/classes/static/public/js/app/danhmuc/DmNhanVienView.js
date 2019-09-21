var DmNhanVienView = function(){
	
	var that = this;
	this.AppTitle = 'Danh mục nhân viên';
	this.oTable = null;
	this.oDialog = null;

	this.oDmNhanVien = new DmNhanVien();
	this.oDmDonVi = new DmDonVi();
	this.oDmChucVu = new DmChucVu();
	
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		that.search();
		that.bindSelect();
		that.clearForm();
		that.filterAction('INIT');
	}

	this.search = function(){
		that.oDmNhanVien.getAll();
		that.oTable.clear().draw();
        var aRows = [];
		for (var i = 0; i < that.oDmNhanVien.LIST.length; i++) {
			var item = that.oDmNhanVien.LIST[i];
			var _hidden = '<input type="hidden" class="rowID" value="' + item.nhanvienid + '" />';
			var trangthai = item.trangthai == 1?'<span class="label label-success">Hoạt động</span>':'<span class="label label-danger">Khóa</span>';
			var gioitinh = item.gioitinh ==1?'Nam':'Nữ';
			var ngaysinh = new Date(item.ngaysinh);
			aRows.push([
				(i + 1) + _hidden,
				item.ma,
				item.ten,
				ngaysinh.getDate()+"/"+(ngaysinh.getMonth()+1)+"/"+ngaysinh.getFullYear(),
				item.donvi_ten,
				item.chucvu_ten,
				gioitinh,
				item.ghichu,
				trangthai
            ]);
        }
        that.oTable.rows.add(aRows).draw();
	}

	this.bindForm = function(){
		var ngaysinh = new Date(that.oDmNhanVien.ngaysinh);
		$('#ma').val(that.oDmNhanVien.ma);
		$('#ten').val(that.oDmNhanVien.ten);
		$('#donvi').val(that.oDmNhanVien.donviid);
		$('#chucvu').val(that.oDmNhanVien.chucvuid);
		$('#ngaysinh').val(that.oDmNhanVien.ngaysinh);
		$('#gioitinh').val(that.oDmNhanVien.gioitinh);
		$('#ghichu').val(that.oDmNhanVien.ghichu);
		$('#trangthai').val(that.oDmNhanVien.trangthai);

	}

	this.bindSelect = function(){
		that.oDmDonVi.bindSelect('#donvi');
		that.oDmChucVu.bindSelect('#chucvu');
	}

	this.clearForm = function(){
		that.oDmNhanVien.nhanvienid = 0;
		$('#ma').val('');
		$('#ten').val('');
		$('#donvi').val('0');
		$('#chucvu').val('0');
		$('#ngaysinh').val('');
		$('#gioitinh').val('1');
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
		that.oDmNhanVien.ma = $('#ma').val();
		that.oDmNhanVien.ten = $('#ten').val();
		that.oDmNhanVien.donviid = $('#donvi').val();
		that.oDmNhanVien.chucvuid = $('#chucvu').val();
		that.oDmNhanVien.ngaysinh = $('#ngaysinh').val();
		that.oDmNhanVien.ghichu = $('#ghichu').val();
		that.oDmNhanVien.trangthai = $('#trangthai').val();

		var strAlert = that.oDmNhanVien.validSave();
		if (!strAlert == '') {
			oAlert.show(strAlert, '40%', '50px');
			return false;
		}

		var rs = that.oDmNhanVien.save();
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
				that.oDmNhanVien.nhanvienid = id;
				that.oDmNhanVien.getById();
				that.bindForm();
		   }
		   return true;
		 });
		 
		 
		 $('.ACTIONS').on('click', '#btnDelete', function () {
			var oConfirm = new ConfirmDialog('Xác nhận xóa thông tin',ok,cancel);
			var oAlert = new AlertDialog('Thông báo');
			if (that.oDmNhanVien.nhanvienid == 0) {
				oAlert.show('Bạn chưa chọn mục cần xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = that.oDmNhanVien.del();
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