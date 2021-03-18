function myFunction() {
  //カラム番号
  const COL_TITLE  = 1;
  const COL_LATEST = 2;
  const COL_PV     = 3;
  const COL_LIKE   = 4;
  const COL_STOCK  = 5;
  const COL_UPDATE = 7;
  //定義
  const QIITA_ACCESS_TOKEN  = 'dc7daa76a175434b4cf1ff56f450dfdb2dc6efe3';
  const API_ENDPOINT = 'https://qiita.com/api/v2';
  const API_MY_ITEMS = '/authenticated_user/items';
  const API_ITEM_DTL = '/items';
  
  //var sheet = SpreadsheetApp.getSheetByName('Main');
  var sheet = SpreadsheetApp.getActiveSheet();
  
  // 現在日時取得
  //var now = new Date();
  var now = Utilities.formatDate(new Date(), "JST", "yyyy/MM/dd HH:mm");

  //APIヘッダ
  var headers = {'Authorization' : 'Bearer ' + QIITA_ACCESS_TOKEN};
  var params = {'headers' : headers};

  //シート初期化
  /*
  sheet.clear();
  sheet.getRange(1, COL_TITLE).setValue("タイトル");
  sheet.getRange(1, COL_LATEST).setValue("最終更新"); // 機能させない
  sheet.getRange(1, COL_PV).setValue("ビュー");
  sheet.getRange(1, COL_LIKE).setValue("いいね");
  sheet.getRange(1, COL_STOCK).setValue("ストック");
  // var now = Moment.moment();
  
  //sheet.getRange(1, COL_UPDATE).setValue("【確認日時】" + now.format('YYYY/MM/DD HH:mm:ss')); 
  sheet.getRange(1, COL_UPDATE).setValue(now);
  */


  //投稿一覧取得API
  var paramstr = "?per_page=100&page=1"; //★投稿が100件を超えたらページネーションしないといけない
  var res = UrlFetchApp.fetch(API_ENDPOINT + API_MY_ITEMS + paramstr, params);
  var json = JSON.parse(res.getContentText());
  json.forEach(function(item, i){
    //sheet.getRange(i + 2, COL_TITLE).setValue(item["title"]);
    //var latest = 0;
    //sheet.getRange(i + 2, COL_LATEST).setValue(now.diff(latest, 'd') + "日前").setHorizontalAlignment("right");


    //投稿ごと詳細取得API
    var resdtl = UrlFetchApp.fetch(API_ENDPOINT + API_ITEM_DTL + "/" + item["id"], params);
    var jsondtl = JSON.parse(resdtl.getContentText());

    //sheet.getRange(i + 2, COL_PV).setValue(jsondtl["page_views_count"]);
    //sheet.getRange(i + 2, COL_LIKE).setValue(jsondtl["likes_count"]);

    var gotitem = item["title"];
    var views = jsondtl["page_views_count"];
    var likes = jsondtl["likes_count"];

    sheet.appendRow([gotitem, "", views, likes, "", now, i]);



  });


}
