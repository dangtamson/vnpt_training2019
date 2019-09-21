var TraCuuView = function(){
	
	var that = this;
	this.AppTitle = 'Chi tiết tài sản';
	this.oTable = null;
	this.oDialog = null;
	
	this.initPage = function(){
		$('#AppTitle').html(that.AppTitle);
		that.clearForm();
		that.bindGrid01();
		that.filterAction('INIT');
	}
	
	this.filterAction = function(sState){
		switch (sState) {
			case 'INIT':
				ControlHelper.Input.enable(['#btnLamMoi','#btnThemMoi','#btnTienIch']);
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
	}	
	
	this.clearForm = function(){
		
	}

	
	this.bindGrid01 = function(){
        that.oTable.clear().draw();
        var aRows = [];
        
        // for (var i = 0; i < oAccount.LIST.length; i++) {
        //     var _item = oAccount.LIST[i];
		// 	var _hidden = '<input type="hidden" class="rowID" value="' + _item.id + '" />';
        //     aRows.push([]);
        // }
        that.oTable.rows.add(aRows).draw();
	}
	

	$(document).ready(function () {


		that.oTable = ControlHelper.Datatable.Init('Grid01', 10, true);
		that.oDialog = new PopupDialog(reload);
		that.initPage();

		function reload(){
			that.initPage();
		}

		$('.ACTIONS').on('click', '#btnThemMoi', function () {
			that.oDialog.show('Thêm tài sản mới', CONFIG_APP.URL.CONTEXT + '/app/taisan/taisanct', '80%', '650');
		});

		
		 
		 $('.ACTIONS').on('click', '#btnSave', function () {
			 
	     });
		 
		 $('.ACTIONS').on('click', '#btnDelete', function () {
			 
	     });

		 $('#Grid01 tbody').on('click', 'tr', function () {
            if ($(this).hasClass('selected')) {
                $(this).removeClass('selected');
				that.clearForm();
				
				that.filterAction('INIT');
            }
            else {
                that.oTable.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                var id = $(this).find('.rowID').val();
				that.bindForm();
				that.filterAction('SELECT');
	       }
	     });

	});
}