import 'package:flutter/material.dart';
import 'package:flutter_screenutil/screenutil.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'FlexShop',
      theme: ThemeData(
        accentColor: Color.fromRGBO(0, 133, 4, 1.0),
      ),
      home: Home(),
    );
  }
}

class Home extends StatefulWidget {
  @override
  _HomeState createState() => _HomeState();
}

class _HomeState extends State<Home> {

  @override
  Widget build(BuildContext context) {
    double width = MediaQuery.of(context).size.width;
    double height = MediaQuery.of(context).size.height;

    return Scaffold(
      bottomNavigationBar: BottomAppBar(
        color: Color.fromRGBO(33, 33, 33, 1.0),
        shape: CircularNotchedRectangle(),
        notchMargin: 7.0,
        child: SizedBox(
          height: 45,
        )
      ),
      floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
      floatingActionButton: FloatingActionButton(
        onPressed: () => {},      // TODO: Add QR code scan
        child: FaIcon(FontAwesomeIcons.qrcode),
      ),
      body: Stack(
        children: <Widget>[
          Container()
        ],
      )
    );
  }

}

class BottomNavBarClipper extends CustomClipper<Path> {

  double gapSize = 70;

  @override
  Path getClip(Size size) {
    double gapHeight = gapSize / 2;
    Path path = Path();

    Offset startPoint = Offset(size.width / 2 + gapSize / 2, 0);
    Offset midPoint = Offset(size.width / 2, gapHeight);
    Offset endPoint = Offset(size.width / 2 - gapSize / 2, 0);

    path.moveTo(0, 0);
    path.lineTo(0, size.height);
    path.lineTo(size.width, size.height);
    path.lineTo(size.width, 0);
    path.lineTo(startPoint.dx, startPoint.dy);
    path.arcToPoint(midPoint, radius: Radius.circular(gapSize / 2));
    path.arcToPoint(endPoint, radius: Radius.circular(gapSize / 2));
    path.lineTo(0, 0);

    return path;
  }

  @override
  bool shouldReclip(CustomClipper oldClipper) {
    return true;
  }

}