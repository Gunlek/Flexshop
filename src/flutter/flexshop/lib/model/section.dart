class Section{

  int id;
  int machine;
  String type;
  List pictosLinkList;
  String description;
  String title;
  List videoLinkList;
  List videoTitleList;
  String imageLink;

  // Default constructor of a section : empty
  Section({this.id, this.machine, this.type});

  Section.tutoSection({this.id, this.machine, this.type, this.title});
  Section.pictograms({this.id, this.machine, this.type, this.pictosLinkList});
  Section.description({this.id, this.machine, this.type, this.title, this.description});
  Section.carouselTutoVideo({this.id, this.machine, this.type, this.title, this.videoLinkList, this.videoTitleList});
  Section.imageWithTitle({this.id, this.machine, this.type, this.title, this.imageLink});

  Section.fromMapObject(Map<String, dynamic> map){
    this.id = int.parse(map["section_id"].toString());
    this.machine = int.parse(map["section_machine"].toString());
    this.type = map["section_type"].toString();
    switch(this.type.toLowerCase()){
      case 'interactivtuto':
        this.title = map['section_title'];
      break;

      case 'pictograms':
        this.pictosLinkList = map['section_pictosLinkList'];
      break;

      case 'description':
        this.title = map['section_title'];
        this.description = map['section_description'];
      break;

      case 'carouseltutovideo':
        this.title = map['section_title'];
        this.videoLinkList = map['section_videoLinkList'];
        this.videoTitleList = map['section_videoTitleList'];
      break;

      case 'imagewithtitle':
        this.title = map['section_title'];
        this.imageLink = map['section_imageLink'];
      break;
    }
  }

}

/* final sections = [
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
]; */