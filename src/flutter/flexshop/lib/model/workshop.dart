import 'package:flutter/material.dart';

class Workshop {

  double id;
  String title;
  String image;

  Workshop({this.id, this.title, this.image});

}

final workshops = [
  Workshop(
    id: 0,
    title: "usinage",
    image: "assets/images/ateliers.jpg"
  ),

  Workshop(
    id: 1,
    title: "forge",
    image: "assets/images/ateliers.jpg"
  ),

  Workshop(
    id: 2,
    title: "fonderie",
    image: "assets/images/ateliers.jpg"
  )
];