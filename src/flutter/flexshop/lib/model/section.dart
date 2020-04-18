class Section{

  int id;
  int machine;
  String type;
  String title;
  String description;
  List<String> pictosLinkList;
  String imageLink;
  List<String> videoLinkList;
  List<String> videoTitleList;

  // Default constructor of a section : empty
  Section({this.machine, this.type});

  // An expansion tile with a description in the tile expanded
  Section.description({this.id, this.machine, this.type, this.title, this.description});

  // Pictograms of security : gloves, helmet, danger, ....
  // Take a list's link of picto image
  Section.pictograms({this.id, this.machine, this.type, this.pictosLinkList});

  Section.carouselTutoVideo({this.id, this.machine, this.type, this.title, this.videoLinkList, this.videoTitleList});

  Section.imageWithTitle({this.id, this.machine, this.type, this.title, this.imageLink});

  Section.interractivTuto({this.id, this.machine, this.type, this.title});

}

final sections = [
  Section.interractivTuto(
    id: 0,
    machine: 1,
    type: 'interractivTuto',
    title: 'Démarrer le tuto interractif',
  ),

  Section.pictograms(
    id: 1,
    machine: 1,
    type: 'pictograms',
    pictosLinkList: [
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png',
      'assets/images/picto_gloves.png']
  ),

  Section.description(
    id: 2,
    machine: 1,
    type: 'description',
    title: 'Risques',
    description: """
    -	Coupure des membres supérieurs avec les pièces non ébavurées ou les outils coupants 
    -	Chute d’objet sur membres inférieurs
    -	Projection de liquide de coupe dans les yeux lors du nettoyage
    -	Ejection de la pièce si dispositif de bridage inapproprié
    -	Collisions à grande vitesse entre les parties mobiles"""
  ),

  Section.carouselTutoVideo(
    id: 3,
    machine: 1,
    type: 'carouselTutoVideo',
    title: 'Tuto Vidéo',
    videoLinkList: [],
    videoTitleList: [
      "Démarrer la machine",
      "Changer vitesse de coupe"]
  ),

  Section.imageWithTitle(
    id: 4,
    machine: 1,
    type: 'imageWithTitle',
    title: 'Vitesse de coupe',
    imageLink: 'assets/images/tab_speed.jpg'
  )
];