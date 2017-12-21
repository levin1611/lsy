var ajaxURL=live_site+'/ajax.php';
//地图搜索函数
function mapShow(id) {
	$.getJSON(ajaxURL+"?act=mapcode&id="+id+"&callback=?",			
			function(data){
				 if(data){
					 location.href=live_site+"/index.php?com=com_store&area="+data[0];
				 }
			}
		);
}