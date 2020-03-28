class Machine {

  final int id;
  final String title;
  final int category;
  final String brand;
  final String image;
  final String reference;

  Machine({this.id, this.title, this.category, this.brand, this.image, this.reference});

}

final milling_machine = [
  Machine(
    id: 0,
    category: 0,
    title: "5 axes",
    brand: "Lemoine",
    reference: "Reference",
    image: "images/lemoine_illustration.jpg"
  ),

  Machine(
    id: 1,
    category: 0,
    title: "3 axes",
    brand: "Huron",
    reference: "Reference",
    image: "images/lemoine_illustration.jpg"
  ),

  Machine(
    id: 2,
    category: 0,
    title: "5 axes Huron",
    brand: "Huron",
    reference: "Reference",
    image: "images/lemoine_illustration.jpg"
  ),
];

final turning_machine = [
  Machine(
    id: 0,
    category: 1,
    title: "Tour",
    brand: "Ernault Somua",
    reference: "Reference",
    image: "images/lemoine_illustration.jpg"
  ),

  Machine(
    id: 1,
    category: 1,
    title: "Tour",
    brand: "Cazeneuve",
    reference: "Reference",
    image: "images/lemoine_illustration.jpg"
  ),
];

final boring_machine = [
  Machine(
    id: 0,
    category: 2,
    title: "Perceuse à colonne",
    brand: "Ernault Somua",
    reference: "Reference",
    image: "images/lemoine_illustration.jpg"
  )
];

final machines = milling_machine + turning_machine + boring_machine;