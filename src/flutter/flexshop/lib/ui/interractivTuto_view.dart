import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:flexshop/model/slide.dart';

class InterractivTuto extends StatelessWidget {
  final int machine;
  final int slideNumber;

  InterractivTuto({Key key, @required this.machine, this.slideNumber})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return InterractiTutoStateful(
      machine: this.machine,
      slideNumber: this.slideNumber,
    );
  }
}

class InterractiTutoStateful extends StatefulWidget {
  final int machine;
  final int slideNumber;

  InterractiTutoStateful({Key key, @required this.machine, this.slideNumber})
      : super(key: key);

  @override
  State<StatefulWidget> createState() {
    return InterractiTutoState();
  }
}

class InterractiTutoState extends State<InterractiTutoStateful> {
  //int numberOfDots = 4;
  int numberOfSlides;
  int slideIndex;
  int machine;
  Slide slide;

  @override
  void initState() {
    super.initState();
    this.machine = widget.machine;
    this.slideIndex = widget.slideNumber;
    //TODO : implement a request
    this.slide = Slides[this.slideIndex];
    this.numberOfSlides = Slides.length;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        body: GestureDetector(
      onPanUpdate: (details) {
        if (details.delta.dx > 50)
          //print("Dragging in +X direction");
          setState(() {
            this.slideIndex += 1;
            this.slide = Slides[this.slideIndex];
          });
        else
          print("Dragging in -X direction");

        if (details.delta.dy > 0)
          print("Dragging in +Y direction");
        else
          print("Dragging in -Y direction");
      },
      child: Stack(children: <Widget>[
        Padding(
          padding: const EdgeInsets.only(top: 40),
          child: SingleChildScrollView(
            child: Column(
              children: <Widget>[
                Text(
                  this.slide.title,
                  style: GoogleFonts.pacifico(
                      textStyle: TextStyle(
                          color: Color.fromRGBO(147, 49, 97, 1.0),
                          fontSize: 30)),
                ),
                Container(
                  height: MediaQuery.of(context).size.height / 3,
                  child: Image.asset(
                    this.slide.image,
                    fit: BoxFit.cover,
                  ),
                ),
                Text(
                  this.slide.description,
                  style: TextStyle(fontSize: 20),
                ),
              ],
            ),
          ),
        ),
        Positioned(
            bottom: 20,
            left: MediaQuery.of(context).size.width/2 - ((this.numberOfSlides-1)*24 - 36),
            child: Center(
              child: Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: _generateDots(),
              ),
            )),
        Align(
            alignment: Alignment.centerLeft,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                  decoration: BoxDecoration(
                      color: Colors.grey.withOpacity(0.7),
                      borderRadius: BorderRadius.circular(50.0)),
                  child: IconButton(
                    onPressed: () {
                      _switchToSlide(this.slideIndex - 1);
                    },
                    icon: Icon(Icons.chevron_left),
                    iconSize: 40,
                  )),
            )),
        Align(
            alignment: Alignment.centerRight,
            child: Padding(
              padding: const EdgeInsets.all(8.0),
              child: Container(
                  decoration: BoxDecoration(
                      color: Colors.grey.withOpacity(0.7),
                      borderRadius: BorderRadius.circular(50.0)),
                  child: IconButton(
                    onPressed: () {
                      _switchToSlide(this.slideIndex + 1);
                    },
                    icon: Icon(Icons.chevron_right),
                    iconSize: 40,
                  )),
            )),
      ]),
    ));
  }

  List<Widget> _generateDots() {
    List<Widget> dots = [];
    for (int i = 0; i < numberOfSlides; i++) {
      dots.add(i == slideIndex ? _activeSlide(i) : _inactiveSlide(i));
    }

    return dots;
  }

  Widget _activeSlide(int index) {
    return GestureDetector(
      onTap: () {
        print('Tapped');
      },
      child: new Container(
        child: Padding(
          padding: EdgeInsets.only(left: 8.0, right: 8.0),
          child: Container(
            width: 20.0,
            height: 20.0,
            decoration: BoxDecoration(
              color: Colors.orangeAccent.withOpacity(.3),
              borderRadius: BorderRadius.circular(50.0),
            ),
          ),
        ),
      ),
    );
  }

  void _switchToSlide(int slideNumber) {
    if (0 <= slideNumber && slideNumber < this.numberOfSlides) {
      setState(() {
        this.slideIndex = slideNumber;
        this.slide = Slides[slideNumber];
      });
    }
  }

  Widget _inactiveSlide(int index) {
    return GestureDetector(
      onTap: () {
        print(index);
        _switchToSlide(index);
      },
      child: new Container(
        child: Padding(
          padding: EdgeInsets.only(left: 5.0, right: 5.0),
          child: Container(
            width: 14.0,
            height: 14.0,
            decoration: BoxDecoration(
                color: Colors.grey.withOpacity(0.7),
                borderRadius: BorderRadius.circular(50.0)),
          ),
        ),
      ),
    );
  }
}
