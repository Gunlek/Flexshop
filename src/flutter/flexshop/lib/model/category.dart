class Category {

  int id;
  String title;
  int workshop;

  Category({this.id, this.title, this.workshop});

  Category.fromMapObject(Map<String, dynamic> map){
    this.id = int.parse(map["category_id"].toString());
    this.title = map["category_title"];
    this.workshop = int.parse(map["category_workshop"].toString());
  }

}

final categories = [

  Category(
    id: 0,
    title: "Fraisage",
    workshop: 1
  ),

  Category(
    id: 1,
    title: "Tournage",
    workshop: 1
  ),

  Category(
    id: 2,
    title: "Perçage",
    workshop: 1
  )

];