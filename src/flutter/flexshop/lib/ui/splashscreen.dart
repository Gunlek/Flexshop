import 'package:flexshop/ui/home.dart';
import 'package:flutter/material.dart';
import 'package:flare_splash_screen/flare_splash_screen.dart' as spls;

class SplashScreen extends StatefulWidget {
  @override
  _SplashScreenState createState() => _SplashScreenState();
}

class _SplashScreenState extends State<SplashScreen> with SingleTickerProviderStateMixin {

  AnimationController controller;
  Animation animation;

  @override
  void initState(){
    this.controller = AnimationController(
      duration: Duration(milliseconds: 250),
      vsync: this,
    );
    this.animation = Tween(
      begin: 1.0,
      end: 0.0,
    ).animate(controller);

    this.controller.addStatusListener((status) {
      if(status == AnimationStatus.completed){
        Navigator.pushReplacement(context, PageRouteBuilder(
          pageBuilder: (_, __, ___) => Home()
          )
        );
      }
    });

    super.initState();
  }

  @override
  void dispose() {
    this.controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {

    return Container(
      color: Color.fromRGBO(238, 238, 238, 1.0),
      child: FadeTransition(
        opacity: animation,
        child: Center(
          child: spls.SplashScreen.callback(
            until: () => Future.delayed(Duration(seconds: 1)),
            startAnimation: 'Show',
            name: 'assets/animations/loading.flr',
            onSuccess: (_){
              this.controller.forward();
            },
            onError: (_, __) => {}
          ),
        /* child: spls.SplashScreen.navigate(
          name: 'assets/animations/loading.flr',
          next: (_) {
            this.controller.forward();
            return Home();
          },
          until: () => Future.delayed(Duration(seconds: 3)),
          startAnimation: 'Show',
          transitionsBuilder: (context, animation, secondaryAnimatio, child) => FadeTransition(
            opacity: Tween(
              begin: 0.0,
              end: 1.0
            ).animate(animation),
            child: child,
          )
        ), */
        ),
      ),
    );
  }
}