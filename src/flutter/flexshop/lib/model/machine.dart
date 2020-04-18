class Machine {

  int id;
  String title;
  int category;
  String brand;
  String image;
  String reference;

  Machine({this.id, this.title, this.category, this.brand, this.image, this.reference});

  Machine.fromMapObject(Map<String, dynamic> map){
    this.id = int.parse(map["machine_id"].toString());
    this.title = map["machine_title"];
    this.category = int.parse(map["machine_category"].toString());
    this.brand = map["machine_brand"];
    this.image = map["machine_image"];
    this.reference = map["machine_reference"];
  }
}

final millingMachine = [
  Machine(
    id: 0,
    category: 0,
    title: "5 axes",
    brand: "Lemoine",
    reference: "Reference",
    image: "assets/images/lemoine_illustration.jpg"
  ),

  Machine(
    id: 1,
    category: 0,
    title: "VF-1",
    brand: "Haas",
    reference: "Reference",
    image: "assets/images/haas_illustration.jpg"
  ),

  Machine(
    id: 2,
    category: 0,
    title: "VR-8",
    brand: "Haas",
    reference: "Reference",
    image: "assets/images/haas_illustration.jpg"
  ),
];

final turningMachine = [
  Machine(
    id: 3,
    category: 1,
    title: "Tour",
    brand: "Ernault Somua",
    reference: "Reference",
    image: "assets/images/ernault_somua_illustration.jpg"
  ),

  Machine(
    id: 4,
    category: 1,
    title: "Tour",
    brand: "Cazeneuve",
    reference: "Reference",
    image: "assets/images/cazeneuve_illustration.jpg"
  ),
];

final boringMachine = [
  Machine(
    id: 5,
    category: 2,
    title: "Perceuse à colonne",
    brand: "Inconnue",
    reference: "Reference",
    image: "assets/images/perceuse_colonne_illustration.jpg"
  ),

  Machine(
    id: 6,
    category: 2,
    title: "Perceuse à colonne",
    brand: "Inconnue",
    reference: "Reference",
    image: "assets/images/perceuse_2_illustration.jpg"
  )
];

final machines = millingMachine + turningMachine + boringMachine;