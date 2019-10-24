function getAuthnum(obj){
	const crypto = require("crypto");
	const hash = crypto.createHash("sha1");
	var value="";
	value+=obj.fn;
	value+=obj.hwid;
	value+="260251708@qq.com->liuwenjun";
	hash.update(value);
	var authnum=hash.digest("base64");
	return authnum;
}
var obj={};
obj.fn=__passoa_auth_getfn();
obj.hwid=__passoa_auth_gethwid();
//obj.fn="57b5a6cb-e663-4116-b69e-1ffd5aa1a2f8"
//obj.hwid="d1c40592-6091-4527-8a34-c27e1a7c230d"
//require("fs").writeFileSync("tset.sn",getAuthnum(obj))
__passoa_auth_setsn(getAuthnum(obj));
console.log(__passoa_auth_getstatus());
