/**
* XUI SQL
* ---
* 
*   RESTFUL (like) SQL Lite Wrapper for Storing Data - Key Value Pair
*/

var sql = function() {
	var dbName = 'xuiDB';
	var version = '1.0';
	var dbTable = 'xuiDBTbl';
	var displayName = 'XUI-SQL';
	var maxSize = 65536;
	var db = null;

	var defaultErrorHandle = function(tx,error){ console.log(error.message); }
	var defaultDataHandle = function(result){ console.log(result); }
		
	var now = function() { return new Date().getTime(); }
				
	return {
		setup: function(){ 
			var setupTable = function(tx,error) {
				tx.executeSql("CREATE TABLE "+ dbTable + " (key NVARCHAR(32) UNIQUE, value TEXT, timestamp REAL)", [], function(result) {}, defaultErrorHandle);
			}
			 
			if (window.openDatabase) {
				db = openDatabase(dbName, version, displayName, maxSize);
				db.transaction(function(tx) {
					tx.executeSql("SELECT COUNT(*) FROM " + dbTable , [], function(){}, setupTable
				)});

			} else {
				console.log("Error Could not create DB either the DB has exceeded its size limit or you are using the wrong browser.");
			}			

			x$.sql = this;
		},

		// alias for SELECT
		get: function(key,fnc) {
			if (typeof fnc != 'function') return;
			db.transaction(function(tx) {
				tx.executeSql("SELECT value FROM " + dbTable + " WHERE key = ?",[key],function(tx,results) { 
					if (results.rows.length == 1) {
						fnc(results.rows.item(0).value);
					} else {
						fnc(null);
					}
			 }, defaultErrorHandle);
			});	
		},
		
		// alias for INSERT
		post: function(key, value){
			db.transaction(function(tx) {
				tx.executeSql("INSERT INTO " + dbTable + " (key,value,timestamp) VALUES (?,?,?)",[key,value,now()],defaultDataHandle,defaultErrorHandle);
			});
		},
		
		// alias for DELETE JavaScript 'delete' is a reserved word
		del: function(key){
			db.transaction(function(tx) {
				tx.executeSql("DELETE FROM " + dbTable + " WHERE key = ? ",[key], defaultDataHandle,defaultErrorHandle);
			});
		},
		
		// alias for UPDATE
	    put: function(key, value){
			db.transaction(function(tx) {
				tx.executeSql("UPDATE " + dbTable + " SET value=?,timestamp=? WHERE key=? ",[value,now(),key],defaultDataHandle,defaultErrorHandle);
			});
		},
	    
	    exists: function(key,fnc){
			this.get(key,function(d){
				fnc((d == null) ? false : true);
			});
		},
		
	    clear: function(){
			db.transaction(function(tx) {
				tx.executeSql("DELETE FROM " + dbTable ,[],defaultDataHandle,defaultErrorHandle);
			});			
		}
	}
}().setup();