import 'package:flutter/material.dart';
import 'package:flexshop/model/workshop.dart';
import 'package:flexshop/widget/workshop_widget.dart';

class WorkshopList extends StatefulWidget {
  @override
  _WorkshopListState createState() => _WorkshopListState();
}

class _WorkshopListState extends State<WorkshopList> {
  @override
  Widget build(BuildContext context) {
    return Stack(
        children: <Widget>[
          ClipPath(
              clipper: AClipper(),
              child: Container(
              color: Color.fromRGBO(255, 168, 14, 1.0)
            ),
          ),
          ClipPath(
            clipper: MClipper(),
            child: Container(
              color: Color.fromRGBO(147, 49, 97, 1.0)
            ),
          ),
          SingleChildScrollView(
              child: Column(
                children: <Widget>[
                  Container(
                    margin: EdgeInsets.only(left: 40),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Padding(padding: EdgeInsets.symmetric(vertical: 30)),
                        Text(
                          "DECOUVREZ",
                          style: TextStyle(
                            color: Color.fromRGBO(238, 238, 238, 1.0),
                            fontWeight: FontWeight.bold,
                            fontSize: MediaQuery.of(context).textScaleFactor * 40,
                            
                          ),
                          textAlign: TextAlign.left,
                        ),
                        Text(
                          "Le guide pratique des machines",
                          softWrap: true,
                          style: TextStyle(
                            color: Color.fromRGBO(238, 238, 238, 1.0),
                            fontSize: MediaQuery.of(context).textScaleFactor * 40,
                            height: 1.5,
                          ),
                          textAlign: TextAlign.left,
                        ),
                      ],
                    ),
                  ),

                  SizedBox(height: 50),

                  for(final workshop in workshops) WorkshopWidget(workshop: workshop),

                  SizedBox(height: 80),
                ],
              ),
          ),
        ],
      );
  }
}

class MClipper extends CustomClipper<Path> {
  

  @override
  Path getClip(Size size) {
    double bgHeight = 3 * size.height / 5;
    Path path = Path();

    path.moveTo(0, 0);
    path.lineTo(0, bgHeight);
    path.quadraticBezierTo(size.width / 4 - 40, 1.5 * bgHeight / 3, size.width / 2 - 40, bgHeight  - 50);
    path.quadraticBezierTo(size.width / 2, bgHeight, size.width / 2 + 40, bgHeight - 50);
    path.quadraticBezierTo(3 * size.width / 4 + 40, 1.5 * bgHeight / 3, size.width, bgHeight);
    path.lineTo(size.width, bgHeight);
    path.lineTo(size.width, 0);
    path.lineTo(0, 0);

    return path;
  }

  @override
  bool shouldReclip(CustomClipper oldClipper) {
    return true;
  }

}

class AClipper extends CustomClipper<Path> {

  @override
  Path getClip(Size size) {
    double bgHeight = 3 * size.height / 5;
    Path path = Path();

    path.moveTo(0, 0);
    path.lineTo(0, bgHeight);
    path.relativeQuadraticBezierTo(size.width / 8, -bgHeight / 100, size.width / 4, -bgHeight / 6);
    path.quadraticBezierTo(3 * size.width / 8, 2 * bgHeight / 3, size.width / 2, 2*bgHeight / 3);
    path.quadraticBezierTo(5 * size.width / 8, 2 * bgHeight / 3, size.width - size.width / 4, bgHeight - bgHeight / 6);
    path.quadraticBezierTo(size.width - size.width / 8, bgHeight - bgHeight / 100, size.width, bgHeight);
    path.lineTo(size.width, bgHeight);
    path.lineTo(size.width, 0);
    path.lineTo(0, 0);

    return path;
  }

  @override
  bool shouldReclip(CustomClipper oldClipper) {
    return true;
  }

}