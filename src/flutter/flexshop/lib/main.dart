import 'package:flexshop/api/workshop_api.dart';
import 'package:flexshop/ui/splashscreen.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future main() async {
  await DotEnv().load('.env');
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
      home: SplashScreen(),
    );
  }
}