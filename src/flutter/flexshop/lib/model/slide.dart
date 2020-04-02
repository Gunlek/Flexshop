class Slide {

  double id;
  int slideNumber;
  int machine;
  String title;
  String image;
  String description;

  Slide({this.id, this.slideNumber, this.machine, this.title, this.image, this.description});

}

//Slide Number starts at 0!!!!

final List<Slide> Slides = [
  Slide(
    id: 0,
    slideNumber: 0,
    machine: 0,
    title: "Démarrer la machine",
    image: "assets/tuto/slide_1.png",
    description: "Il faut enlever l'arrêt d'urgence et appuyer sur démarrer",
  ),
  Slide(
    id: 1,
    slideNumber: 1,
    machine: 0,
    title: "Changer l'outil",
    image: "assets/tuto/slide_2.png",
    description: "Bon bah d'abord il faut aller chercher un outil dans le magasin, que ce soit le bon (genre vérifies la référence et le diamètre",
  ),
  Slide(
    id: 2,
    slideNumber: 2,
    machine: 0,
    title: "Désarmer le frein",
    image: "assets/tuto/slide_3.png",
    description: '',
  ),
  Slide(
    id: 3,
    slideNumber: 3,
    machine: 0,
    title: "Enclencher l'embrayage",
    image: "assets/tuto/slide_4.png",
    description: '',
  )
];