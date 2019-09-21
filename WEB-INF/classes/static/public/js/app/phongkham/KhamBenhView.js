var TiepNhanView  = function(){
    this.oGrid01 = null;
    this.oDialog = null;
    var that = this;
     
	this.initPage = function(){
        that.initData();
    }
    
    this.initData = function(){
        that.bindGrid01();
    }

    this.bindGrid01 = function(){}

	$(function() {
        that.oGrid01 = ControlHelper.Datatable.Init('Grid01', 10, true);
        that.oDialog = new PopupDialog();
        that.initPage();
        $('.ACTIONS').on('click', '#btnThemBenhNhanMoi', function () {
			that.oDialog.show('Thêm bệnh nhân mới', '/medicclinic/app/phongkham/pop_benhnhan', '70%', '550px');
        });
	});
}