const config = require('config.json');
const db = require('_helpers/db');
const Page = db.pages;

module.exports = {
    getAll,
    getById,
    aboutus,
    howToPlay,
    create,
    update,
    delete: _delete
};



async function getAll() {
	var obj = {};
    var pages = await Page.find();
	obj['error']=false;
	obj['pages']= pages;
	return obj;
}

async function getById(id) {
    return await Page.findById(id);
}
async function aboutus() {
	var id ='5f8476d03079c72d28dd9625'
    var page = await Page.findById(id);
	var obj = {};
	obj['error']=false;
	obj['pageDetail']= page;
	return obj;
}
async function howToPlay() {
	var id ='5f847b92ba90cb35b0611423'
    var page = await Page.findById(id);
	var obj = {};
	obj['error']=false;
	obj['pageDetail']= page;
	return obj;
}

async function create(userParam) {
	  	var obj = {};  

    // validate
   		if(await Page.findOne({ page_name: userParam.page_name })) {
			obj['message']='Page already created';
			obj['error']=true;
		}else{
				const page = new Page(userParam);
			    await page.save();

			obj['message']='Page created';
			obj['error']=false;
			obj['userdetails']= page;
		}

    // save company
   return obj;
}

async function update(id, userParam) {
    const page = await Page.findById(id);

    // validate
    if (!page) throw 'page not found';
  
    // copy userParam properties to otp_history
    Object.assign(page, userParam);

    await page.save();
}

async function _delete(id) {
    await Page.findByIdAndRemove(id);
}