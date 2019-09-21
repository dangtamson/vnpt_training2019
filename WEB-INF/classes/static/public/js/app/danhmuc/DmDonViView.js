var DmDonViView = function(){
	
	var that = this;
	this.AppTitle = 'Danh mục đơn vị';
	this.oTable = null;
	this.oDialog = null;

	this.oDmDonVi = new DmDonVi();
	
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		that.search();
		that.bindSelect();
		that.clearForm();
		that.filterAction('INIT');
	}

	this.search = function(){
		that.oDmDonVi.search('');
		that.oTable.clear().draw();
        var aRows = [];
		for (var i = 0; i < that.oDmDonVi.LIST.length; i++) {
			var item = that.oDmDonVi.LIST[i];
			oDonViCha = new DmDonVi();
			oDonViCha.donviid = item.donvichaid;
			oDonViCha.getById();
			var _hidden = '<input type="hidden" class="rowID" value="' + item.donviid + '" />';
			var trangthai = item.status == 1?'<span class="label label-success">Hoạt động</span>':'<span class="label label-danger">Khóa</span>';
			aRows.push([
				(i + 1) + _hidden,
				item.donviid,
				item.ten,
				item.dienthoai,
				item.fax,
				item.diachi,
				oDonViCha.ten,
				item.ghichu,
				trangthai
            ]);
        }
        that.oTable.rows.add(aRows).draw();
	}

	this.bindForm = function(){
		$('#ma').val(that.oDmDonVi.donviid);
		$('#ten').val(that.oDmDonVi.ten);
		$('#ghichu').val(that.oDmDonVi.ghichu);
		$('#dienthoai').val(that.oDmDonVi.dienthoai);
		$('#fax').val(that.oDmDonVi.fax);
		$('#diachi').val(that.oDmDonVi.diachi);
		$('#donvichuquan').val(that.oDmDonVi.donvichaid);
		$('#trangthai').val(that.oDmDonVi.status);
	}

	this.bindSelect = function(){
		var html = "<option value = '0'>Không có</option>";
		that.oDmDonVi.search('');
		for (var i = 0; i < that.oDmDonVi.LIST.length; i++) {
			var item = that.oDmDonVi.LIST[i];
			html += "<option value='"+item.donviid+"''>"+item.ten+"</option>";
		}
		$('#donvichuquan').html(html);
	}

	this.clearForm = function(){
		that.oDmDonVi.donviid = 0;
		$('#ma').val('');
		$('#ten').val('');
		$('#ghichu').val('');
		$('#dienthoai').val('');
		$('#fax').val('');
		$('#diachi').val('');
		$('#donvichuquan').val('0');
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
		that.oDmDonVi.donviid = $('#ma').val();
		that.oDmDonVi.ten = $('#ten').val();
		that.oDmDonVi.ghichu = $('#ghichu').val();
		that.oDmDonVi.status = $('#trangthai').val();

		var strAlert = that.oDmDonVi.validSave();
		if (!strAlert == '') {
			oAlert.show(strAlert, '40%', '50px');
			return false;
		}

		var rs = that.oDmDonVi.save();
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
				that.oDmDonVi.donviid = id;
				that.oDmDonVi.getById();
				that.bindForm();
		   }
		   return true;
		 });
		 
		 
		 $('.ACTIONS').on('click', '#btnDelete', function () {
			var oConfirm = new ConfirmDialog('Xác nhận xóa thông tin',ok,cancel);
			var oAlert = new AlertDialog('Thông báo');
			if (that.oDmDonVi.DonViid == 0) {
				oAlert.show('Bạn chưa chọn mục cần xóa', '40%', '50px');
				return false;
			}

			function ok() {
				var rs = that.oDmDonVi.del();
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