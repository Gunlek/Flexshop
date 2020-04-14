class Workshop {

  int id;
  String title;
  String image;

  Workshop({this.id, this.title, this.image});

  Workshop.fromMapObject(Map<String, dynamic> map){
    this.id = int.parse(map["workshop_id"].toString());
    this.title = map["workshop_title"];
    this.image = map["workshop_image"];
  }

  Map<String, dynamic> toMap() {

    var map = Map<String, dynamic>();
    if (this.id != null) {
      map["workshop_id"] = this.id;
    }
    map["workshop_title"] = this.title;
    map["workshop_image"] = this.image;
    return map;
  }

  Map<String, dynamic> toJson() =>
      {
        'workshop_id': this.id.toString(),
        'workshop_title': this.title,
        'workshop_image': this.image,
      };
}

final workshops = [
  Workshop(
    id: 0,
    title: "usinage",
    image: "assets/images/ateliers.jpg"
  ),

  Workshop(
    id: 1,
    title: "forge",
    image: "assets/images/ateliers.jpg"
  ),

  Workshop(
    id: 2,
    title: "fonderie",
    image: "assets/images/ateliers.jpg"
  )
];