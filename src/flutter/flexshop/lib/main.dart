import 'package:flutter/material.dart';
import 'package:flexshop/ui/workshop_list.dart';
import 'package:font_awesome_flutter/font_awesome_flutter.dart';
import 'package:flexshop/ui/workshopView.dart';

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
        backgroundColor: Color.fromRGBO(238, 238, 238, 1.0),
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
    return Scaffold(
      extendBody: true,
      backgroundColor: Theme.of(context).backgroundColor,
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
        onPressed: () => {
        Navigator.push(context, MaterialPageRoute(builder: (context) => WorkshopView()))
        },      // TODO: Add QR code scan
        child: FaIcon(FontAwesomeIcons.qrcode),
      ),
      body: WorkshopList(),
    );
  }

}